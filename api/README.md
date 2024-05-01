# Chrome Extension for LLMs API

This repository contains the Flask API for the ChatGPT Chat Manager application. The API provides endpoints for managing folders, tags, and chats.

## Installation

1. Clone the repository:
```sh
   git clone https://github.com/your-username/chatgpt-chat-manager-api.git
```

2. Install the required dependencies:
```sh
   pip install -r requirements.txt
```

3. Set up the database:
   - Create a new MariaDB database for the application.
   - Update the database connection settings in the `.env` file.
   - Run the following SQL commands to create the required tables:
```sql
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    updated_by INT,
    FOREIGN KEY (created_by) REFERENCES users(user_id),
    FOREIGN KEY (updated_by) REFERENCES users(user_id)
);

CREATE TABLE folders (
    folder_id INT AUTO_INCREMENT PRIMARY KEY,
    folder_name VARCHAR(255) NOT NULL,
    parent_folder_id INT,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    updated_by INT,
    FOREIGN KEY (parent_folder_id) REFERENCES folders(folder_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(user_id),
    FOREIGN KEY (updated_by) REFERENCES users(user_id)
);

CREATE TABLE tags (
    tag_id INT AUTO_INCREMENT PRIMARY KEY,
    tag_name VARCHAR(255) NOT NULL,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    updated_by INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(user_id),
    FOREIGN KEY (updated_by) REFERENCES users(user_id)
);

CREATE TABLE chats (
    chat_id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    folder_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    updated_by INT,
    FOREIGN KEY (folder_id) REFERENCES folders(folder_id)
      ON DELETE SET NULL
      ON UPDATE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(user_id),
    FOREIGN KEY (updated_by) REFERENCES users(user_id)
);

CREATE TABLE chat_tags (
    chat_id INT,
    tag_id INT,
    PRIMARY KEY (chat_id, tag_id),
    FOREIGN KEY (chat_id) REFERENCES chats(chat_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(tag_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
);

CREATE TABLE user_folders (
    user_id INT,
    folder_id INT,
    PRIMARY KEY (user_id, folder_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    FOREIGN KEY (folder_id) REFERENCES folders(folder_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
);

CREATE TABLE user_tags (
    user_id INT,
    tag_id INT,
    PRIMARY KEY (user_id, tag_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(tag_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
);
```

4. Start the Flask development server:
```sh
   python app.py
```

## API Endpoints

### User Management

- `POST /api/users`: Create a new user.
- `POST /api/users/login`: User login.
- `PUT /api/users/<user_id>`: Update user information.

### Folder Management

- `POST /api/folders`: Create a new folder.
- `GET /api/folders/<folder_id>`: Get folder details.
- `PUT /api/folders/<folder_id>`: Update folder information.
- `DELETE /api/folders/<folder_id>`: Delete a folder.

### Tag Management

- `POST /api/tags`: Create a new tag.
- `GET /api/tags/<tag_id>`: Get tag details.
- `PUT /api/tags/<tag_id>`: Update tag information.
- `DELETE /api/tags/<tag_id>`: Delete a tag.

### Chat Management

- `POST /api/chats`: Create a new chat.
- `GET /api/chats/<chat_id>`: Get chat details.
- `PUT /api/chats/<chat_id>`: Update chat information.
- `DELETE /api/chats/<chat_id>`: Delete a chat.

### Synchronization

- `POST /api/sync`: Sync data between the client and server.

Please refer to the API documentation for detailed information on request and response formats for each endpoint.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
```

2. Chrome Extension Repository - README.md:

