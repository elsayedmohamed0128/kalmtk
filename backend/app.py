from fastapi import FastAPI, BackgroundTasks, Request
from pydantic import BaseModel
from typing import Optional, List
import uvicorn
import time
import uuid
from datetime import datetime, timezone

app: FastAPI = FastAPI(
    title="Kalimtak API",
    description="Universal Prompt Orchestrator API with Continuous Learning",
    version="2.0.0"
)

# Initialize database service
from database import SupabaseService
db_service = SupabaseService()

# Initialize and start scheduler
from scheduler import start_scheduler
start_scheduler(db_service)

class PromptRequest(BaseModel):
    text: str
    language: str = "en"
    target_tool: str = "general"
    user_id: Optional[str] = None

class PromptResponse(BaseModel):
    structured_prompt: str
    model_output: str
    tokens_used: int

class HistoryItem(BaseModel):
    id: str
    user_id: str
    input_text: str
    structured_prompt: str
    output: str
    tokens: int
    timestamp: str

# New models for continuous learning
class FeedbackRequest(BaseModel):
    interaction_id: str
    score: int  # 1-5 scale
    feedback_text: Optional[str] = None

# Mock data for demonstration
mock_history: List[HistoryItem] = []

@app.get("/")
async def root() -> dict[str, str]:
    return {"message": "Kalimtak API is running"}

@app.post("/api/generate", response_model=PromptResponse)
async def generate_prompt(
    request: PromptRequest, 
    background_tasks: BackgroundTasks,
    http_request: Request
) -> PromptResponse:
    """
    Generate a structured prompt from user input with logging for continuous learning
    """
    start_time = time.time()
    
    # Get client info
    client_ip = http_request.client.host if http_request.client else None
    user_agent = http_request.headers.get("user-agent", "")
    
    # Generate response
    from ai_service import PromptOrchestrator
    orchestrator = PromptOrchestrator()
    structured_prompt = orchestrator.generate_prompt(
        input_text=request.text,
        target_tool=request.target_tool,
        language=request.language
    )
    
    model_output = f"This is a simulated response for the prompt: {request.text[:50]}..."
    
    processing_time = int((time.time() - start_time) * 1000)
    tokens_used = len(structured_prompt.split())
    
    # Create interaction record for logging
    from models import UserInteraction
    interaction = UserInteraction(
        id=str(uuid.uuid4()),
        user_id=request.user_id,
        input_text=request.text,
        structured_prompt=structured_prompt,
        model_output=model_output,
        tokens_input=len(request.text.split()),
        tokens_output=tokens_used,
        tokens_total=len(request.text.split()) + tokens_used,
        processing_time_ms=processing_time,
        model_version="mock-v1.0",  # Would be dynamic in real implementation
        target_tool=request.target_tool,
        language=request.language,
        ip_address=client_ip,
        user_agent=user_agent,
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )
    
    # Log interaction asynchronously in background
    background_tasks.add_task(db_service.log_user_interaction, interaction)
    
    return PromptResponse(
        structured_prompt=structured_prompt,
        model_output=model_output,
        tokens_used=tokens_used
    )

@app.get("/api/history/{user_id}", response_model=List[HistoryItem])
async def get_history(user_id: str) -> List[HistoryItem]:
    """
    Get prompt history for a user
    """
    # Filter mock history by user_id
    user_history: List[HistoryItem] = [item for item in mock_history if item.user_id == user_id]
    return user_history

@app.post("/api/feedback")
async def submit_feedback(feedback: FeedbackRequest) -> dict[str, str]:
    """Submit feedback for a specific interaction"""
    try:
        success = db_service.update_interaction_feedback(
            interaction_id=feedback.interaction_id,
            score=feedback.score,
            feedback_text=feedback.feedback_text
        )
        
        if success:
            return {"status": "success", "message": "Feedback recorded"}
        else:
            return {"status": "error", "message": "Failed to record feedback"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@app.post("/api/admin/curate-training-data")
async def curate_training_data() -> dict[str, str]:
    """Admin endpoint to curate high-quality interactions for training"""
    try:
        # Get high-quality interactions
        candidates = db_service.get_training_data_candidates(limit=1000)
        
        curated_count = 0
        for interaction in candidates:
            # Safely extract values from the interaction dictionary
            interaction_id = str(interaction.get("id", ""))
            input_text = str(interaction.get("input_text", ""))
            structured_prompt = str(interaction.get("structured_prompt", ""))
            
            # Extract and convert feedback_score
            feedback_score_raw = interaction.get("feedback_score", 0)
            try:
                feedback_score = float(feedback_score_raw) if feedback_score_raw else 0.0
                quality_score = feedback_score / 5.0  # Normalize to 0-1
            except (ValueError, TypeError):
                quality_score = 0.0
            
            target_tool = str(interaction.get("target_tool", "general"))
            
            # Create training data item
            from models import TrainingDataItem
            training_data_item = TrainingDataItem(
                id=str(uuid.uuid4()),
                source_interaction_id=interaction_id,
                input_prompt=input_text,
                target_output=structured_prompt,
                quality_score=quality_score,
                domain_category="general",  # Would be classified by ML
                use_case=target_tool,
                is_curated=True,
                is_selected=False,  # Will be selected by filtering algorithm
                created_at=datetime.now(timezone.utc)
            )
            
            if db_service.save_training_data_item(training_data_item):
                curated_count += 1
        
        return {
            "status": "success", 
            "message": f"Curated {curated_count} training data items"
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}

if __name__ == "__main__":
    try:
        uvicorn.run("app:app", host="0.0.0.0", port=8001, reload=True)
    except KeyboardInterrupt:
        # Stop the scheduler when the app is shut down
        from scheduler import stop_scheduler
        stop_scheduler()