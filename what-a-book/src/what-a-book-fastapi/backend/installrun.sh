#!/usr/bin/env bash

#!/usr/bin/env bash
# Prompt for an environment variable value in Bash
echo "Getting Ready to Build And Run What-A-Book REST API Service...\n"

read -r -p "Enter the MongoDB Password: " mongopwd
export MONGODB_PWD="$mongopwd"
echo "$MONGODB_PWD"

cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

python create_indexes.py
uvicorn app.main:app --reload --port 8000

