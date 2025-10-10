# Kalimtak Project Structure

## Directory Layout
```
kalimtak/
├── .devcontainer/          # Development container configuration
├── backend/                # FastAPI backend
│   ├── app.py             # Main FastAPI application
│   ├── requirements.txt   # Python dependencies
│   ├── models.py          # Database models
│   ├── database.py        # Supabase integration
│   └── ai_service.py      # LangChain and AI integration
├── frontend/               # React Native + Expo frontend
│   ├── App.js             # Main application component
│   ├── i18n.js            # Internationalization
│   ├── package.json       # Node.js dependencies
│   └── app.json           # Expo configuration
├── ai/                     # AI models and training
│   └── models/
│       └── qwen3_finetuned/ # Fine-tuned Qwen 3 models
├── docs/                   # Documentation
│   └── api_spec.md        # API specification
├── .github/                # GitHub Actions workflows
├── README.md               # Project overview
├── package.json            # Root package.json
├── app.json                # Expo configuration
├── env.example             # Environment variables example
├── .eslintrc.json          # ESLint configuration
├── .prettierrc             # Prettier configuration
└── pyproject.toml          # Python formatting configuration
```

## Development Setup

1. Open in Dev Container
2. Install dependencies
3. Configure environment variables
4. Run development servers

## Deployment Architecture

- Web: Vercel
- Mobile: Expo Publish
- Backend: Render or Hugging Face Spaces
- Database: Supabase