# API Specification

## Overview
The Kalimtak API provides endpoints for generating structured prompts from user input, retrieving prompt history, submitting feedback, and managing continuous learning processes.

## Base URL
```
http://localhost:8000/api
```

## Authentication
All endpoints require authentication via Supabase Auth tokens passed in the `Authorization` header.

## Endpoints

### Generate Prompt
Generate a structured prompt from user input.

**POST** `/generate`

#### Request Body
```json
{
  "text": "string",
  "language": "string",
  "target_tool": "string",
  "user_id": "string"
}
```

#### Response
```json
{
  "structured_prompt": "string",
  "model_output": "string",
  "tokens_used": "integer"
}
```

### Get History
Retrieve prompt history for a user.

**GET** `/history/{user_id}`

#### Response
```json
[
  {
    "id": "string",
    "user_id": "string",
    "input_text": "string",
    "structured_prompt": "string",
    "output": "string",
    "tokens": "integer",
    "timestamp": "string"
  }
]
```

### Submit Feedback
Submit user feedback for a specific interaction to improve the model.

**POST** `/feedback`

#### Request Body
```json
{
  "interaction_id": "string",
  "score": "integer", // 1-5 scale
  "feedback_text": "string"
}
```

#### Response
```json
{
  "status": "string",
  "message": "string"
}
```

### Curate Training Data
Admin endpoint to manually trigger training data curation process.

**POST** `/admin/curate-training-data`

#### Response
```json
{
  "status": "string",
  "message": "string"
}
```

## Continuous Learning Endpoints

### Get Training Data Candidates
Retrieve high-quality interactions for training data (admin only).

**GET** `/admin/training-data-candidates`

#### Query Parameters
- `limit`: integer (default: 1000)

#### Response
```json
[
  {
    "id": "string",
    "input_text": "string",
    "structured_prompt": "string",
    "feedback_score": "integer",
    "target_tool": "string",
    "language": "string",
    "created_at": "string"
  }
]
```

### Trigger Model Training
Initiate a full model training cycle (admin only).

**POST** `/admin/train-model`

#### Request Body
```json
{
  "base_model": "string"
}
```

#### Response
```json
{
  "status": "string",
  "message": "string",
  "new_model_version": "string"
}
```

## Error Handling
All errors follow the standard HTTP status codes:
- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden (for admin endpoints)
- 404: Not Found
- 500: Internal Server Error