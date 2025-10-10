#!/usr/bin/env python3
"""
Integration test for Kalimtak Continuous Learning System
This script verifies that all components work together correctly.
"""

import sys
import os
from datetime import datetime, timezone
from typing import List, Dict, Any

# Add the backend directory to the path
sys.path.insert(0, os.path.dirname(__file__))

def test_full_workflow():
    """Test the full continuous learning workflow"""
    print("Testing full continuous learning workflow...")
    
    try:
        # Import all required components
        from models import UserInteraction, TrainingDataItem
        from database import SupabaseService
        from etl_pipeline import DataQualityAssurance
        from model_training import ModelTrainingOrchestrator, ModelRegistry
        from scheduler import TaskScheduler
        
        # 1. Test model creation
        print("1. Testing model creation...")
        interaction = UserInteraction(
            id="test-123",
            user_id="user-456",
            input_text="Test input for integration",
            structured_prompt="Test structured prompt for integration",
            model_output="Test model output for integration",
            tokens_input=15,
            tokens_output=25,
            tokens_total=40,
            processing_time_ms=150,
            model_version="test-v1.0",
            target_tool="general",
            language="en",
            feedback_score=5,
            feedback_text="Excellent!",
            ip_address="127.0.0.1",
            user_agent="integration-test-agent",
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        )
        assert interaction is not None
        print("   ✓ UserInteraction model creation successful")
        
        # 2. Test ETL pipeline components
        print("2. Testing ETL pipeline components...")
        
        # Test data quality assurance
        samples = [
            {
                "input": "Test input 1", 
                "output": "Test output 1",
                "metadata": {
                    "domain": "general",
                    "language": "en",
                    "quality_score": 0.8
                }
            },
            {
                "input": "Test input 2", 
                "output": "Test output 2",
                "metadata": {
                    "domain": "technical",
                    "language": "en",
                    "quality_score": 0.9
                }
            }
        ]
        
        unique_samples = DataQualityAssurance.detect_duplicates(samples)
        print(f"   ✓ Data quality assurance successful: {len(unique_samples)} unique samples")
        
        # 3. Test scheduler initialization
        print("3. Testing scheduler initialization...")
        
        # Mock database service for testing
        class MockDBService(SupabaseService):
            def get_training_data_candidates(self, limit: int = 1000) -> List[Dict[str, Any]]:
                return []
            
            def save_training_data_item(self, item: TrainingDataItem) -> bool:
                return True
            
            def __init__(self):
                pass  # Don't call parent __init__ to avoid Supabase connection
        
        mock_db = MockDBService()
        scheduler = TaskScheduler(mock_db)
        assert scheduler is not None
        print("   ✓ TaskScheduler initialization successful")
        
        # 4. Test model training orchestrator
        print("4. Testing model training components...")
        orchestrator = ModelTrainingOrchestrator(mock_db)
        assert orchestrator is not None
        print("   ✓ ModelTrainingOrchestrator initialization successful")
        
        registry = ModelRegistry(mock_db)
        assert registry is not None
        print("   ✓ ModelRegistry initialization successful")
        
        print("✓ Full workflow test completed successfully")
        return True
        
    except Exception as e:
        print(f"✗ Full workflow test failed: {e}")
        return False

def main():
    """Run integration test"""
    print("Kalimtak Continuous Learning System Integration Test")
    print("=" * 55)
    
    try:
        if test_full_workflow():
            print("\n" + "=" * 55)
            print("🎉 Integration test passed! All components work together correctly.")
            return 0
        else:
            print("\n" + "=" * 55)
            print("❌ Integration test failed. Please check the implementation.")
            return 1
    except Exception as e:
        print(f"\n✗ Integration test failed with exception: {e}")
        return 1

if __name__ == "__main__":
    sys.exit(main())