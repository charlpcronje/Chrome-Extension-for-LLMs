# ChatGPT Chat Manager Documentation

This repository contains the documentation for the ChatGPT Chat Manager application. The application consists of a Flask API and a Chrome extension that work together to provide a seamless chat management experience within ChatGPT.

## Overview

The ChatGPT Chat Manager application allows users to organize their ChatGPT conversations using folders and tags. The Flask API serves as the backend, providing endpoints for managing folders, tags, and chats. The Chrome extension serves as the frontend, offering a user-friendly interface for interacting with the API and integrating with ChatGPT's user interface.

## Repositories

The project is divided into three repositories:

1. [ChatGPT Chat Manager API](https://github.com/your-username/chatgpt-chat-manager-api): Contains the Flask API for managing folders, tags, and chats.
2. [ChatGPT Chat Manager Extension](https://github.com/your-username/chatgpt-chat-manager-extension): Contains the Chrome extension for interacting with the API and integrating with ChatGPT.
3. [ChatGPT Chat Manager Documentation](https://github.com/your-username/chatgpt-chat-manager-docs): Contains the documentation for the entire project (you are here).

## Installation and Setup

To set up the ChatGPT Chat Manager application, follow these steps:

1. Clone the API repository and follow the installation instructions in its README.md file.
2. Clone the Chrome extension repository and follow the installation instructions in its README.md file.
3. Configure the Chrome extension by providing the API URL and desired sync interval.

For detailed installation and setup instructions, please refer to the respective repository's README.md file.

## API Documentation

The ChatGPT Chat Manager API provides the following endpoints:

- User Management:
  - `POST /api/users`: Create a new user.
  - `POST /api/users/login`: User login.
  - `PUT /api/users/<user_id>`: Update user information.
- Folder Management:
  - `POST /api/folders`: Create a new folder.
  - `GET /api/folders/<folder_id>`: Get folder details.
  - `PUT /api/folders/<folder_id>`: Update folder information.
  - `DELETE /api/folders/<folder_id>`: Delete a folder.
- Tag Management:
  - `POST /api/tags`: Create a new tag.
  - `GET /api/tags/<tag_id>`: Get tag details.
  - `PUT /api/tags/<tag_id>`: Update tag information.
  - `DELETE /api/tags/<tag_id>`: Delete a tag.
- Chat Management:
  - `POST /api/chats`: Create a new chat.
  - `GET /api/chats/<chat_id>`: Get chat details.
  - `PUT /api/chats/<chat_id>`: Update chat information.
  - `DELETE /api/chats/<chat_id>`: Delete a chat.
- Synchronization:
  - `POST /api/sync`: Sync data between the client and server.

For detailed information on request and response formats for each endpoint, please refer to the API documentation in the ChatGPT Chat Manager API repository.

## Chrome Extension Usage

The ChatGPT Chat Manager Chrome extension provides a user-friendly interface for managing folders, tags, and chats within ChatGPT. To use the extension:

1. Open ChatGPT in your Chrome browser.
2. Click on the ChatGPT Chat Manager extension icon in the toolbar to open the popup.
3. Use the popup to manage folders, tags, and chats:
   - Create new folders, tags, and chats using the respective buttons.
   - View and organize your folders, tags, and chats.
   - Click on the "Sync" button to manually sync the data with the server.
4. The extension will automatically integrate with ChatGPT's user interface, allowing you to easily manage your conversations.

For more information on using the Chrome extension, please refer to the ChatGPT Chat Manager Extension repository.

## Contributing

Contributions to the ChatGPT Chat Manager project are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request in the respective repository.

## License

The ChatGPT Chat Manager project is licensed under the [MIT License](LICENSE).