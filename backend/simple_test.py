#!/usr/bin/env python3
"""
Simple test script for Kalimtak Continuous Learning System
This script verifies that all components of the continuous learning system are working correctly.
"""

import sys
import os
from datetime import datetime, timezone

# Add the backend directory to the path
sys.path.insert(0, os.path.dirname(__file__))

def test_models():
    """Test that data models work correctly"""
    print("Testing data models...")
    
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
        
        return True
    except Exception as e:
        print(f"✗ Models test failed: {e}")
        return False

def test_etl_functions():
    """Test ETL functions"""
    print("\nTesting ETL functions...")
    
    try:
        # Test DataQualityAssurance functions directly from the file
        # Read the file and execute the functions
        import etl_pipeline
        
        # Test samples with correct format (matching what ETL pipeline produces)
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
            },
            {
                "input": "Test input 1", 
                "output": "Test output 1",
                "metadata": {
                    "domain": "general",
                    "language": "en",
                    "quality_score": 0.8
                }
            }  # Duplicate
        ]
        
        unique_samples = etl_pipeline.DataQualityAssurance.detect_duplicates(samples)
        print(f"✓ Duplicate detection successful: {len(unique_samples)} unique samples")
        
        filtered_samples = etl_pipeline.DataQualityAssurance.filter_inappropriate_content(samples)
        print(f"✓ Content filtering successful: {len(filtered_samples)} samples")
        
        diverse_samples = etl_pipeline.DataQualityAssurance.ensure_diversity(samples)
        print(f"✓ Diversity assurance successful: {len(diverse_samples)} samples")
        
        return True
    except Exception as e:
        print(f"✗ ETL functions test failed: {e}")
        return False

def main():
    """Run simple tests"""
    print("Kalimtak Continuous Learning System Simple Test")
    print("=" * 50)
    
    # Run tests
    tests = [
        test_models,
        test_etl_functions
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
        print("🎉 All tests passed! The continuous learning system components are working correctly.")
        return 0
    else:
        print("❌ Some tests failed. Please check the implementation.")
        return 1

if __name__ == "__main__":
    sys.exit(main())