# ChatGPT Chat Manager Chrome Extension

This repository contains the Chrome extension for the ChatGPT Chat Manager application. The extension provides a user-friendly interface for managing folders, tags, and chats, and seamlessly integrates with ChatGPT's user interface.

## Installation

1. Clone the repository:
```sh
   git clone https://github.com/your-username/chatgpt-chat-manager-extension.git
```

2. Install the required dependencies:
```sh
   npm install
```

3. Build the CSS file:
```sh
   npx tailwindcss -i styles.css -o output.css
```

4. Load the extension in Chrome:
   - Open Google Chrome and navigate to `chrome://extensions`.
   - Enable "Developer mode" using the toggle switch in the top right corner.
   - Click on "Load unpacked" and select the `ext` directory.

5. Configure the extension:
   - Click on the extension icon in the Chrome toolbar to open the popup.
   - Go to the options page by clicking on the gear icon.
   - Enter the API URL and desired sync interval.
   - Click on "Save Options" to apply the changes.

## Usage

1. Open ChatGPT in your Chrome browser.
2. Click on the ChatGPT Chat Manager extension icon in the toolbar to open the popup.
3. Use the popup to manage folders, tags, and chats:
   - Create new folders, tags, and chats using the respective buttons.
   - View and organize your folders, tags, and chats.
   - Click on the "Sync" button to manually sync the data with the server.
4. The extension will automatically integrate with ChatGPT's user interface, allowing you to easily manage your conversations.

## Deployment to Chrome Web Store

To deploy the extension to the Chrome Web Store, follow these steps:

1. Create a developer account on the Chrome Web Store if you don't have one already.
2. Prepare the extension for publishing:
   - Update the `manifest.json` file with the appropriate version number and description.
   - Ensure that all the necessary files are included in the `ext` directory.
3. Create a ZIP file of the `ext` directory.
4. Go to the Chrome Web Store Developer Dashboard.
5. Click on "Add New Item" and upload the ZIP file of your extension.
6. Fill in the required information, such as the extension name, description, screenshots, and promotional images.
7. Set the pricing and distribution options for your extension.
8. Submit the extension for review.
9. Once the extension is approved, it will be available in the Chrome Web Store for users to install.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
