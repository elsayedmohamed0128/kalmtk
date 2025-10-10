# Supabase Integration
import os
from supabase import create_client, Client
from typing import List, Optional, Dict, Any, Union
from models import User, Query, Favorite, UserInteraction, TrainingDataItem
from datetime import datetime

# Type alias for Supabase response data
SupabaseData = Union[List[Dict[str, Any]], Dict[str, Any], None]

class SupabaseService:
    def __init__(self):
        self.supabase_url = os.getenv("SUPABASE_URL", "")
        self.supabase_key = os.getenv("SUPABASE_KEY", "")
        self.supabase: Client = create_client(self.supabase_url, self.supabase_key)
    
    # Simplified existing methods (keeping original functionality)
    def get_user(self, user_id: str) -> Optional[User]:
        """Get user by ID"""
        # For now, return None since we're focusing on new functionality
        return None
    
    def get_user_queries(self, user_id: str) -> List[Query]:
        """Get all queries for a user"""
        return []
    
    def save_query(self, query: Query) -> bool:
        """Save a query to the database"""
        return True
    
    def get_favorite_prompts(self, user_id: str) -> List[Favorite]:
        """Get user's favorite prompts"""
        return []
    
    # New methods for continuous learning (focus of implementation)
    def log_user_interaction(self, interaction: UserInteraction) -> bool:
        """Asynchronously log user interaction for learning"""
        try:
            # Convert datetime objects to ISO format strings
            created_at_str = interaction.created_at.isoformat() if interaction.created_at else None
            updated_at_str = interaction.updated_at.isoformat() if interaction.updated_at else None
            
            interaction_data = {
                "id": interaction.id,
                "user_id": interaction.user_id,
                "session_id": interaction.session_id,
                "input_text": interaction.input_text,
                "structured_prompt": interaction.structured_prompt,
                "model_output": interaction.model_output,
                "tokens_input": interaction.tokens_input,
                "tokens_output": interaction.tokens_output,
                "tokens_total": interaction.tokens_total,
                "processing_time_ms": interaction.processing_time_ms,
                "model_version": interaction.model_version,
                "target_tool": interaction.target_tool,
                "language": interaction.language,
                "feedback_score": interaction.feedback_score,
                "feedback_text": interaction.feedback_text,
                "ip_address": interaction.ip_address,
                "user_agent": interaction.user_agent,
                "created_at": created_at_str,
                "updated_at": updated_at_str
            }
            
            # Remove None values
            interaction_data = {k: v for k, v in interaction_data.items() if v is not None}
            
            self.supabase.table("user_interactions").insert(interaction_data).execute()
            return True
        except Exception as e:
            print(f"Error logging interaction: {e}")
            return False
    
    def get_training_data_candidates(self, limit: int = 1000) -> List[Dict[str, Any]]:
        """Retrieve high-quality interactions for training data"""
        try:
            response = self.supabase.table("user_interactions")\
                .select("*")\
                .gte("feedback_score", 4)\
                .not_.is_("feedback_score", "null")\
                .limit(limit)\
                .execute()
            
            # Extract data from response - handle as generic list of dicts
            result: List[Dict[str, Any]] = []
            
            # Check if response has data attribute and it's a list
            # We'll ignore type checking for these lines as we're handling unknown types
            if hasattr(response, 'data') and isinstance(response.data, list):  # type: ignore
                for item in response.data:  # type: ignore
                    if isinstance(item, dict):
                        # Create a new dict with only the basic types
                        clean_item: Dict[str, Any] = {}
                        for key, value in item.items():  # type: ignore
                            # Only include basic types to avoid complex type issues
                            if isinstance(value, (str, int, float, bool)) or value is None:
                                clean_item[key] = value
                            elif isinstance(value, (list, dict)):
                                # Convert complex types to strings for now
                                clean_item[key] = str(value)  # type: ignore
                        result.append(clean_item)
            
            return result
        except Exception as e:
            print(f"Error fetching training candidates: {e}")
            return []
    
    def save_training_data_item(self, item: TrainingDataItem) -> bool:
        """Save curated training data item"""
        try:
            # Convert datetime objects to ISO format strings
            created_at_str = item.created_at.isoformat() if item.created_at else None
            
            item_data = {
                "id": item.id,
                "source_interaction_id": item.source_interaction_id,
                "input_prompt": item.input_prompt,
                "target_output": item.target_output,
                "quality_score": item.quality_score,
                "domain_category": item.domain_category,
                "use_case": item.use_case,
                "is_curated": item.is_curated,
                "is_selected": item.is_selected,
                "created_at": created_at_str
            }
            
            # Remove None values
            item_data = {k: v for k, v in item_data.items() if v is not None}
            
            self.supabase.table("training_data").insert(item_data).execute()
            return True
        except Exception as e:
            print(f"Error saving training data: {e}")
            return False
    
    def update_interaction_feedback(self, interaction_id: str, score: int, feedback_text: Optional[str] = None) -> bool:
        """Update an interaction with user feedback"""
        try:
            update_data = {
                "feedback_score": score,
                "updated_at": datetime.now().isoformat()
            }
            
            if feedback_text:
                update_data["feedback_text"] = feedback_text
                
            self.supabase.table("user_interactions")\
                .update(update_data)\
                .eq("id", interaction_id)\
                .execute()
            return True
        except Exception as e:
            print(f"Error updating interaction feedback: {e}")
            return False