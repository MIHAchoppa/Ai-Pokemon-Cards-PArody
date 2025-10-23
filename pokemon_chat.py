#!/usr/bin/env python3
"""
Pokemon Parody Chat API Integration
This script demonstrates how to interact with the Pokemon.parody model using the Poe API.
"""

import os
import requests
import json
import sys


def chat_with_pokemon_parody(message: str, api_key: str = None) -> dict:
    """
    Send a message to the Pokemon.parody model via Poe API.
    
    Args:
        message: The message to send to the model
        api_key: Poe API key (defaults to POE_API_KEY environment variable)
    
    Returns:
        dict: The API response
    """
    if api_key is None:
        api_key = os.environ.get('POE_API_KEY')
    
    if not api_key:
        raise ValueError("POE_API_KEY not found. Please set the environment variable or pass it as an argument.")
    
    url = "https://api.poe.com/v1/chat/completions"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }
    
    payload = {
        "model": "Pokemon.parody",
        "messages": [{"role": "user", "content": message}]
    }
    
    try:
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error communicating with Poe API: {e}", file=sys.stderr)
        if hasattr(e, 'response') and e.response is not None:
            print(f"Response: {e.response.text}", file=sys.stderr)
        raise


def main():
    """Main function to demonstrate the Pokemon Parody Chat API."""
    # Check for API key
    if not os.environ.get('POE_API_KEY'):
        print("Error: POE_API_KEY environment variable not set.", file=sys.stderr)
        print("Please set it with: export POE_API_KEY=your_api_key", file=sys.stderr)
        sys.exit(1)
    
    # Default message or get from command line
    message = " ".join(sys.argv[1:]) if len(sys.argv) > 1 else "Hello world"
    
    print(f"Sending message to Pokemon.parody model: {message}")
    print("-" * 50)
    
    try:
        response = chat_with_pokemon_parody(message)
        print("Response received:")
        print(json.dumps(response, indent=2))
    except Exception as e:
        print(f"Failed to get response: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
