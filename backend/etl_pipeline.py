# ETL Pipeline for Kalimtak Continuous Learning
import uuid
from typing import List, Dict, Any, Tuple
from datetime import datetime, timezone
from database import SupabaseService
from models import TrainingDataItem

class DataETLPipeline:
    def __init__(self, db_service: SupabaseService):
        self.db_service = db_service
    
    def extract_candidate_interactions(self, limit: int = 5000) -> List[Dict[str, Any]]:
        """Extract high-quality interactions for training"""
        return self.db_service.get_training_data_candidates(limit=limit)
    
    def transform_for_training(self, interactions: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Transform interactions into training format"""
        training_samples: List[Dict[str, Any]] = []
        
        for interaction in interactions:
            # Filter out low-quality samples
            if interaction.get("feedback_score", 0) < 3:
                continue
                
            # Create training sample
            sample: Dict[str, Any] = {
                "input": f"Convert to professional prompt: {interaction['input_text']}",
                "output": interaction["structured_prompt"],
                "metadata": {
                    "domain": interaction.get("target_tool", "general"),
                    "language": interaction.get("language", "en"),
                    "quality_score": interaction.get("feedback_score", 0) / 5.0
                }
            }
            training_samples.append(sample)
        
        return training_samples
    
    def load_training_dataset(self, samples: List[Dict[str, Any]]) -> str:
        """Load transformed data into training dataset table"""
        dataset_id = str(uuid.uuid4())
        
        for sample in samples:
            training_item = TrainingDataItem(
                id=str(uuid.uuid4()),
                source_interaction_id="",  # Would reference original interaction
                input_prompt=sample["input"],
                target_output=sample["output"],
                quality_score=sample["metadata"]["quality_score"],
                domain_category=sample["metadata"]["domain"],
                use_case="prompt_generation",
                is_curated=True,
                is_selected=True,
                created_at=datetime.now(timezone.utc)
            )
            
            self.db_service.save_training_data_item(training_item)
        
        return dataset_id

class DataQualityAssurance:
    """Ensure data quality for training"""
    
    @staticmethod
    def detect_duplicates(samples: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Remove duplicate samples"""
        seen: set[Tuple[str, str]] = set()
        unique_samples: List[Dict[str, Any]] = []
        
        for sample in samples:
            # Create a hashable representation of the sample
            sample_key = (sample["input"], sample["output"])
            if sample_key not in seen:
                seen.add(sample_key)
                unique_samples.append(sample)
        
        return unique_samples
    
    @staticmethod
    def filter_inappropriate_content(samples: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Filter out inappropriate content"""
        # In a real implementation, this would use a content moderation model
        # For now, we'll just return the samples as-is
        return samples
    
    @staticmethod
    def ensure_diversity(samples: List[Dict[str, Any]], max_samples_per_domain: int = 100) -> List[Dict[str, Any]]:
        """Ensure diversity across domains"""
        domain_counts: Dict[str, int] = {}
        diverse_samples: List[Dict[str, Any]] = []
        
        for sample in samples:
            domain = sample["metadata"]["domain"]
            
            # Initialize count for domain if not present
            if domain not in domain_counts:
                domain_counts[domain] = 0
            
            # Add sample if we haven't exceeded the limit for this domain
            if domain_counts[domain] < max_samples_per_domain:
                diverse_samples.append(sample)
                domain_counts[domain] += 1
        
        return diverse_samples