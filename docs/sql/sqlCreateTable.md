# SQL Create Table Statements

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