# Database Models for Supabase
from typing import Optional
from datetime import datetime
from pydantic import BaseModel

class User:
    def __init__(self, id: str, email: str, tier: str, created_at: str):
        self.id: str = id
        self.email: str = email
        self.tier: str = tier  # free, pro, pro_plus
        self.created_at: str = created_at

class Query:
    def __init__(self, id: str, user_id: str, input_text: str, structured_prompt: str, output: str, tokens: int, timestamp: str):
        self.id: str = id
        self.user_id: str = user_id
        self.input_text: str = input_text
        self.structured_prompt: str = structured_prompt
        self.output: str = output
        self.tokens: int = tokens
        self.timestamp: str = timestamp

class Favorite:
    def __init__(self, id: str, user_id: str, prompt_id: str):
        self.id: str = id
        self.user_id: str = user_id
        self.prompt_id: str = prompt_id

# New models for continuous learning
class UserInteraction(BaseModel):
    id: str
    user_id: Optional[str] = None
    session_id: Optional[str] = None
    input_text: str
    structured_prompt: str
    model_output: str
    tokens_input: Optional[int] = None
    tokens_output: Optional[int] = None
    tokens_total: Optional[int] = None
    processing_time_ms: Optional[int] = None
    model_version: Optional[str] = None
    target_tool: Optional[str] = None
    language: Optional[str] = None
    feedback_score: Optional[int] = None
    feedback_text: Optional[str] = None
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None
    created_at: datetime
    updated_at: datetime

class TrainingDataItem(BaseModel):
    id: str
    source_interaction_id: str
    input_prompt: str
    target_output: str
    quality_score: Optional[float] = None
    domain_category: Optional[str] = None
    use_case: Optional[str] = None
    is_curated: bool = False
    is_selected: bool = False
    created_at: datetime