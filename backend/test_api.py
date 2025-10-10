# Test script for Kalimtak API
import requests
import json

def test_generate_prompt():
    """Test the /api/generate endpoint"""
    url = "http://localhost:8000/api/generate"
    headers = {"Content-Type": "application/json"}
    
    # Test data
    payload = {
        "text": "Create a Python script that sorts a list of numbers",
        "language": "en",
        "target_tool": "code generation",
        "user_id": "test_user_123"
    }
    
    try:
        response = requests.post(url, headers=headers, data=json.dumps(payload))
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        return response.status_code == 200
    except Exception as e:
        print(f"Error: {e}")
        return False

def test_get_history():
    """Test the /api/history endpoint"""
    url = "http://localhost:8000/api/history/test_user_123"
    
    try:
        response = requests.get(url)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        return response.status_code == 200
    except Exception as e:
        print(f"Error: {e}")
        return False

if __name__ == "__main__":
    print("Testing Kalimtak API...")
    print("\n1. Testing generate prompt endpoint:")
    test_generate_prompt()
    
    print("\n2. Testing history endpoint:")
    test_get_history()
    
    print("\nAPI tests completed!")