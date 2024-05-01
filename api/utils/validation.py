# api/utils/validation.py
def validate_user_data(data):
    errors = []
    if 'username' not in data:
        errors.append('Username is required')
    if 'password' not in data:
        errors.append('Password is required')
    if 'email' not in data:
        errors.append('Email is required')
    return errors

def validate_folder_data(data):
    errors = []
    if 'folder_name' not in data:
        errors.append('Folder name is required')
    if 'user_id' not in data:
        errors.append('User ID is required')
    return errors

def validate_tag_data(data):
    errors = []
    if 'tag_name' not in data:
        errors.append('Tag name is required')
    if 'user_id' not in data:
        errors.append('User ID is required')
    return errors

def validate_chat_data(data):
    errors = []
    if 'content' not in data:
        errors.append('Content is required')
    return errors