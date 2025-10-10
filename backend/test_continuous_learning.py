#!/usr/bin/env python3
"""
Test script for Kalimtak Continuous Learning System
This script verifies that all components of the continuous learning system are working correctly.
"""

import sys
import os
from datetime import datetime, timezone
from typing import Dict, Any, List

# Add the backend directory to the path
sys.path.insert(0, os.path.dirname(__file__))

def test_imports():
    """Test that all required modules can be imported"""
    print("Testing imports...")
    
    try:
        from database import SupabaseService
        _ = SupabaseService  # Use the import to avoid unused import warning
        print("✓ SupabaseService import successful")
    except Exception as e:
        print(f"✗ SupabaseService import failed: {e}")
        return False
    
    try:
        from models import UserInteraction, TrainingDataItem
        _ = UserInteraction  # Use the import to avoid unused import warning
        _ = TrainingDataItem  # Use the import to avoid unused import warning
        print("✓ Models import successful")
    except Exception as e:
        print(f"✗ Models import failed: {e}")
        return False
    
    try:
        from etl_pipeline import DataETLPipeline, DataQualityAssurance
        _ = DataETLPipeline  # Use the import to avoid unused import warning
        _ = DataQualityAssurance  # Use the import to avoid unused import warning
        print("✓ ETL Pipeline import successful")
    except Exception as e:
        print(f"✗ ETL Pipeline import failed: {e}")
        return False
    
    try:
        from model_training import ModelTrainingOrchestrator, ModelRegistry
        _ = ModelTrainingOrchestrator  # Use the import to avoid unused import warning
        _ = ModelRegistry  # Use the import to avoid unused import warning
        print("✓ Model Training import successful")
    except Exception as e:
        print(f"✗ Model Training import failed: {e}")
        return False
    
    try:
        from scheduler import TaskScheduler
        _ = TaskScheduler  # Use the import to avoid unused import warning
        print("✓ Scheduler import successful")
    except Exception as e:
        print(f"✗ Scheduler import failed: {e}")
        return False
    
    return True

def test_models():
    """Test that data models work correctly"""
    print("\nTesting data models...")
    
    try:
        from models import UserInteraction, TrainingDataItem
        
        # Test UserInteraction model
        interaction = UserInteraction(
            id="test-123",
            user_id="user-456",
            input_text="Test input",
            structured_prompt="Test structured prompt",
            model_output="Test model output",
            tokens_input=10,
            tokens_output=20,
            tokens_total=30,
            processing_time_ms=100,
            model_version="test-v1.0",
            target_tool="general",
            language="en",
            feedback_score=5,
            feedback_text="Great!",
            ip_address="127.0.0.1",
            user_agent="test-agent",
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        )
        _ = interaction  # Use the variable to avoid unused variable warning
        print("✓ UserInteraction model creation successful")
    except Exception as e:
        print(f"✗ UserInteraction model creation failed: {e}")
        return False
    
    try:
        # Test TrainingDataItem model
        training_item = TrainingDataItem(
            id="train-123",
            source_interaction_id="test-123",
            input_prompt="Test input",
            target_output="Test output",
            quality_score=0.95,
            domain_category="general",
            use_case="prompt_generation",
            is_curated=True,
            is_selected=True,
            created_at=datetime.now(timezone.utc)
        )
        _ = training_item  # Use the variable to avoid unused variable warning
        print("✓ TrainingDataItem model creation successful")
    except Exception as e:
        print(f"✗ TrainingDataItem model creation failed: {e}")
        return False
    
    return True

def test_etl_pipeline():
    """Test ETL pipeline components"""
    print("\nTesting ETL pipeline...")
    
    try:
        from models import TrainingDataItem
        from database import SupabaseService
        from etl_pipeline import DataETLPipeline, DataQualityAssurance
        
        # Mock database service for testing
        class MockDBService(SupabaseService):
            def get_training_data_candidates(self, limit: int = 1000) -> List[Dict[str, Any]]:
                return [
                    {
                        "id": "test-123",
                        "input_text": "Test input",
                        "structured_prompt": "Test structured prompt",
                        "feedback_score": 5,
                        "target_tool": "general",
                        "language": "en"
                    }
                ]
            
            def save_training_data_item(self, item: TrainingDataItem) -> bool:
                return True
            
            def __init__(self):
                pass  # Don't call parent __init__ to avoid Supabase connection
        
        # Test DataETLPipeline
        mock_db = MockDBService()
        etl_pipeline = DataETLPipeline(mock_db)
        
        # Test extraction
        candidates = etl_pipeline.extract_candidate_interactions()
        print(f"✓ ETL extraction successful: {len(candidates)} candidates")
        
        # Test transformation
        samples = etl_pipeline.transform_for_training(candidates)
        print(f"✓ ETL transformation successful: {len(samples)} samples")
        
        # Test loading
        dataset_id = etl_pipeline.load_training_dataset(samples)
        print(f"✓ ETL loading successful: dataset {dataset_id}")
        
        # Test DataQualityAssurance
        unique_samples = DataQualityAssurance.detect_duplicates(samples)
        print(f"✓ Data quality assurance successful: {len(unique_samples)} unique samples")
        
    except Exception as e:
        print(f"✗ ETL pipeline test failed: {e}")
        return False
    
    return True

def test_model_training():
    """Test model training components"""
    print("\nTesting model training components...")
    
    try:
        from models import TrainingDataItem
        from database import SupabaseService
        from model_training import ModelTrainingOrchestrator, ModelRegistry
        
        # Mock database service for testing
        class MockDBService(SupabaseService):
            def get_training_data_candidates(self, limit: int = 1000) -> List[Dict[str, Any]]:
                return []
            
            def save_training_data_item(self, item: TrainingDataItem) -> bool:
                return True
            
            def __init__(self):
                pass  # Don't call parent __init__ to avoid Supabase connection
        
        mock_db = MockDBService()
        
        # Test ModelTrainingOrchestrator
        orchestrator = ModelTrainingOrchestrator(mock_db)
        _ = orchestrator  # Use the variable to avoid unused variable warning
        print("✓ ModelTrainingOrchestrator initialization successful")
        
        # Test ModelRegistry
        registry = ModelRegistry(mock_db)
        _ = registry  # Use the variable to avoid unused variable warning
        print("✓ ModelRegistry initialization successful")
        
    except Exception as e:
        print(f"✗ Model training test failed: {e}")
        return False
    
    return True

def test_scheduler():
    """Test scheduler components"""
    print("\nTesting scheduler components...")
    
    try:
        from models import TrainingDataItem
        from database import SupabaseService
        from scheduler import TaskScheduler
        
        # Mock database service for testing
        class MockDBService(SupabaseService):
            def get_training_data_candidates(self, limit: int = 1000) -> List[Dict[str, Any]]:
                return []
            
            def save_training_data_item(self, item: TrainingDataItem) -> bool:
                return True
            
            def __init__(self):
                pass  # Don't call parent __init__ to avoid Supabase connection
        
        mock_db = MockDBService()
        
        # Test TaskScheduler
        scheduler = TaskScheduler(mock_db)
        _ = scheduler  # Use the variable to avoid unused variable warning
        print("✓ TaskScheduler initialization successful")
        
    except Exception as e:
        print(f"✗ Scheduler test failed: {e}")
        return False
    
    return True

def main():
    """Run all tests"""
    print("Kalimtak Continuous Learning System Test Suite")
    print("=" * 50)
    
    # Run all tests
    tests = [
        test_imports,
        test_models,
        test_etl_pipeline,
        test_model_training,
        test_scheduler
    ]
    
    passed = 0
    failed = 0
    
    for test in tests:
        try:
            if test():
                passed += 1
            else:
                failed += 1
        except Exception as e:
            print(f"✗ Test {test.__name__} failed with exception: {e}")
            failed += 1
    
    print("\n" + "=" * 50)
    print(f"Test Results: {passed} passed, {failed} failed")
    
    if failed == 0:
        print("🎉 All tests passed! The continuous learning system is working correctly.")
        return 0
    else:
        print("❌ Some tests failed. Please check the implementation.")
        return 1

if __name__ == "__main__":
    sys.exit(main())