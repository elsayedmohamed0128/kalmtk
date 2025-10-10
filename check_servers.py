import requests

def check_server(url: str, name: str) -> bool:
    try:
        response = requests.get(url, timeout=5)
        print(f"{name} is running. Status code: {response.status_code}")
        return True
    except requests.exceptions.RequestException as e:
        print(f"{name} is not accessible: {e}")
        return False

if __name__ == "__main__":
    print("Checking if servers are running...")
    
    # Check backend server
    backend_running = check_server("http://localhost:8001", "Backend server (FastAPI)")
    
    # Check frontend server
    frontend_running = check_server("http://localhost:8081", "Frontend server (Expo)")
    
    if backend_running and frontend_running:
        print("\nBoth servers are running! You can access:")
        print("- Backend API: http://localhost:8001")
        print("- Frontend app: http://localhost:8081")
    elif backend_running:
        print("\nOnly the backend server is running. You can access the API at http://localhost:8001")
    elif frontend_running:
        print("\nOnly the frontend server is running. You can access the app at http://localhost:8081")
    else:
        print("\nNeither server is running. Please start both servers.")