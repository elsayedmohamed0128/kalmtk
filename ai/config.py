# AI Model Configuration

MODEL_CONFIG = {
    "base_model": {
        "name": "Qwen/Qwen2-7B",
        "provider": "Hugging Face",
        "version": "2.0"
    },
    "fine_tuned_model": {
        "path": "./ai/models/qwen3_finetuned",
        "checkpoint_frequency": 100,  # Save checkpoint every 100 samples
        "training_batch_size": 8,
        "learning_rate": 0.0001,
        "epochs": 3
    },
    "inference": {
        "max_tokens": 2048,
        "temperature": 0.7,
        "top_p": 0.9,
        "repetition_penalty": 1.2
    },
    "training": {
        "initial_samples": 1000,
        "weekly_samples": 200,
        "validation_split": 0.1
    }
}