#!/bin/bash

# Install Python dependencies
pip install --upgrade pip
pip install fastapi langchain transformers supabase-py aiohttp uvicorn

# Install Node.js dependencies
npm install -g expo-cli typescript prettier eslint

# Install React Native and Expo dependencies
npm install react-native expo

# Install TailwindCSS and i18next
npm install tailwindcss i18next

# Install pre-commit hooks
pip install pre-commit black
pre-commit install

# Create required directories
mkdir -p ai/models/qwen3_finetuned
mkdir -p docs
mkdir -p backend
mkdir -p frontend

echo "Development environment setup complete!"