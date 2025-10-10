# Kalimtak – Universal Prompt Orchestrator

A cross-platform AI platform that converts any user input (text or voice) into a professional, structured prompt suitable for any AI system.

[![CI/CD](https://github.com/your-org/kalimtak/actions/workflows/ci_cd.yml/badge.svg)](https://github.com/your-org/kalimtak/actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Features
- 🗣️ **Multi-modal Input**: Text and voice input conversion to structured prompts
- 📱 **Cross-platform**: Runs on Android, iOS, and Web
- 🌍 **Multilingual**: Support for Arabic, English, and German
- 🧠 **AI-powered**: Uses Qwen 3 model from Alibaba via Hugging Face
- 💰 **Subscription Tiers**: Free, Pro, and Pro Plus plans
- 📚 **History Tracking**: Save and revisit previous prompts
- 🔐 **Secure**: Authentication via Supabase Auth

## Project Structure
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
│   ├── train_model.py     # Model training script
│   ├── config.py          # AI configuration
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

## Prerequisites
- Docker (for Dev Container)
- Node.js 20+
- Python 3.11+
- Expo CLI

## Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-org/kalimtak.git
   cd kalimtak
   ```

2. **Open in Dev Container:**
   - Open the project in VS Code
   - Reopen in Container when prompted
   - Or run: `docker-compose up -d`

3. **Install frontend dependencies:**
   ```bash
   npm install
   ```

4. **Set up backend environment:**
   ```bash
   cd backend
   python -m venv venv
   .\venv\Scripts\Activate.ps1  # On Windows
   # source venv/bin/activate   # On macOS/Linux
   pip install -r requirements.txt
   ```

5. **Configure environment:**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

6. **Run development servers:**
   ```bash
   # Terminal 1 - Backend
   cd backend
   .\venv\Scripts\Activate.ps1
   python app.py
   
   # Terminal 2 - Frontend
   npm start
   ```

## Development Commands

| Command | Description |
|---------|-------------|
| `npm start` | Start Expo development server |
| `npm run backend` | Start FastAPI backend server |
| `npm run dev` | Start both frontend and backend |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `qoder run kalimtak_full_build --strict-mode --auto-deploy` | Full build and deployment |

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/generate` | POST | Generate structured prompt |
| `/api/history/{user_id}` | GET | Get user prompt history |

Full API documentation: [docs/api_spec.md](docs/api_spec.md)

## Deployment

| Service | Platform | Notes |
|---------|----------|-------|
| Web | Vercel | Static site hosting |
| Mobile | Expo Publish | App store distribution |
| Backend | Render/Hugging Face | API server |
| Database | Supabase | PostgreSQL with auth |

## Contributing
1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a pull request

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- [Qwen 3](https://huggingface.co/Qwen) - AI model from Alibaba
- [LangChain](https://github.com/hwchase17/langchain) - Framework for developing applications powered by language models
- [FastAPI](https://fastapi.tiangolo.com/) - Modern, fast (high-performance) web framework for building APIs
- [React Native](https://reactnative.dev/) - Framework for building native apps using React
- [Supabase](https://supabase.io/) - Open source Firebase alternative

## Developer

- **elsayed elisswi**
