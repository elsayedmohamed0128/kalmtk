# Kalimtak Continuous Learning System - Demo Workflow

This document demonstrates the complete workflow of the Kalimtak continuous learning system, showing how all components work together to improve the AI model over time.

## Workflow Overview

1. **User Interaction** → 2. **Feedback Collection** → 3. **Data Curation** → 4. **Model Training** → 5. **Model Deployment**

## Step 1: User Interaction

A user interacts with the Kalimtak system through the API:

```bash
curl -X POST http://localhost:8000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Write a professional email to request a meeting",
    "language": "en",
    "target_tool": "email",
    "user_id": "user-123"
  }'
```

**What happens behind the scenes:**
- The system generates a structured prompt using the Qwen 3 model
- The interaction is logged with metadata:
  - Input text and generated prompt
  - Processing time and token usage
  - User ID and session information
  - Timestamps and client information

## Step 2: Feedback Collection

The user provides feedback on the generated prompt:

```bash
curl -X POST http://localhost:8000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{
    "interaction_id": "interaction-456",
    "score": 5,
    "feedback_text": "Perfect! This email template was exactly what I needed."
  }'
```

**What happens behind the scenes:**
- The feedback score (1-5) is recorded in the database
- Text feedback is stored for qualitative analysis
- High-quality interactions (score ≥ 4) become training candidates

## Step 3: Data Curation (Daily Task)

The scheduler runs the daily data curation task:

```python
# This runs automatically every 24 hours
scheduler._run_daily_task()
```

**What happens during data curation:**
1. Extract high-quality interactions (feedback score ≥ 4)
2. Transform interactions into training format:
   ```python
   # Input for training
   "Convert to professional prompt: Write a professional email to request a meeting"
   
   # Target output (what the model should generate)
   "Subject: Request for Meeting - [Your Topic]
   
   Dear [Recipient Name],
   
   I hope this email finds you well. I would like to request a meeting to discuss [topic]. 
   Would you be available for a [duration] meeting sometime next week?
   
   Best regards,
   [Your Name]"
   ```
3. Apply data quality assurance:
   - Remove duplicates
   - Filter inappropriate content
   - Ensure domain diversity
4. Save curated data to training dataset

## Step 4: Model Training (Weekly Task)

The scheduler runs the weekly model training task:

```python
# This runs automatically every week
scheduler._run_weekly_task()
```

**What happens during model training:**
1. Prepare training dataset from curated data
2. Fine-tune the Qwen 3 model with new dataset
3. Evaluate model performance:
   ```python
   metrics = {
     "accuracy": 0.92,      # Increased from 0.87
     "diversity": 0.87,     # Maintained
     "coherence": 0.91      # Increased from 0.85
   }
   ```
4. Register new model version:
   ```python
   model_registry.register_model_version(
     version="Qwen/Qwen2-7B-ft-1700000000",
     base_model="Qwen/Qwen2-7B",
     training_dataset_id="dataset-789",
     performance_metrics=metrics
   )
   ```

## Step 5: Model Deployment (Automatic)

The new model version is deployed to production:

```python
# Automatic deployment after successful training
model_registry.deploy_model("Qwen/Qwen2-7B-ft-1700000000")
```

**What happens during deployment:**
- New model version is gradually rolled out
- Performance is monitored in real-time
- Rollback mechanism is available if issues arise

## Continuous Improvement Cycle

This workflow repeats continuously, with the system improving over time:

```
Week 1: Baseline model (accuracy: 0.85)
Week 2: Fine-tuned model (accuracy: 0.87) ← Improvement
Week 3: Further fine-tuned model (accuracy: 0.89) ← Further improvement
Week 4: Optimized model (accuracy: 0.92) ← Continued improvement
```

## Benefits of This System

### 1. Automated Learning
- No manual intervention required
- Continuous improvement 24/7
- Scalable to any number of users

### 2. Quality Assurance
- Only high-quality data used for training
- Duplicate and inappropriate content filtered
- Domain diversity maintained

### 3. Performance Tracking
- Detailed metrics for each model version
- Easy comparison between versions
- Quick rollback if performance degrades

### 4. Privacy Compliance
- User data handled according to GDPR/CCPA
- Personal identifiers separated from interaction data
- Transparent data usage policies

## Example Training Data

Here's an example of what gets stored in the training dataset:

```json
{
  "id": "train-123",
  "source_interaction_id": "interaction-456",
  "input_prompt": "Convert to professional prompt: Write a professional email to request a meeting",
  "target_output": "Subject: Request for Meeting - [Topic]\n\nDear [Recipient Name],\n\nI hope this email finds you well...",
  "quality_score": 0.95,
  "domain_category": "email",
  "use_case": "meeting_request",
  "is_curated": true,
  "is_selected": true,
  "created_at": "2025-10-08T10:30:00Z"
}
```

## Conclusion

The Kalimtak continuous learning system creates a powerful feedback loop that enables the AI model to continuously improve based on real user interactions and feedback. This approach ensures that the system becomes more valuable and accurate over time, adapting to user needs and preferences while maintaining high quality and privacy standards.