// ext/background.js
chrome.runtime.onInstalled.addListener(() => {
    console.log("ChatGPT Chat Manager Extension installed.");
});

let apiUrl = "https://llm.chat.manager.webally.co.za"; // Default API URL

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "updateApiUrl") {
        apiUrl = request.apiUrl;
    }

    if (request.action === "fetchFolders") {
        fetchFolders()
            .then((folders) => sendResponse({
                folders
            }))
            .catch((error) => sendResponse({
                error: error.message
            }));
        return true;
    } else if (request.action === "createFolder") {
        createFolder(request.folderName)
            .then((folder) => sendResponse({
                folder
            }))
            .catch((error) => sendResponse({
                error: error.message
            }));
        return true;
    } else if (request.action === "updateFolder") {
        updateFolder(request.folderId, request.folderName)
            .then((folder) => sendResponse({
                folder
            }))
            .catch((error) => sendResponse({
                error: error.message
            }));
        return true;
    } else if (request.action === "deleteFolder") {
        deleteFolder(request.folderId)
            .then(() => sendResponse({
                success: true
            }))
            .catch((error) => sendResponse({
                error: error.message
            }));
        return true;
    } else if (request.action === "fetchTags") {
        fetchTags()
            .then((tags) => sendResponse({
                tags
            }))
            .catch((error) => sendResponse({
                error: error.message
            }));
        return true;
    } else if (request.action === "createTag") {
        createTag(request.tagName)
            .then((tag) => sendResponse({
                tag
            }))
            .catch((error) => sendResponse({
                error: error.message
            }));
        return true;
    } else if (request.action === "updateTag") {
        updateTag(request.tagId, request.tagName)
            .then((tag) => sendResponse({
                tag
            }))
            .catch((error) => sendResponse({
                error: error.message
            }));
        return true;
    } else if (request.action === "deleteTag") {
        deleteTag(request.tagId)
            .then(() => sendResponse({
                success: true
            }))
            .catch((error) => sendResponse({
                error: error.message
            }));
        return true;
    } else if (request.action === "fetchChats") {
        fetchChats()
            .then((chats) => sendResponse({
                chats
            }))
            .catch((error) => sendResponse({
                error: error.message
            }));
        return true;
    } else if (request.action === "createChat") {
        createChat(request.chatContent, request.folderId, request.tagIds)
            .then((chat) => sendResponse({
                chat
            }))
            .catch((error) => sendResponse({
                error: error.message
            }));
        return true;
    } else if (request.action === "updateChat") {
        updateChat(request.chatId, request.chatContent, request.folderId, request.tagIds)
            .then((chat) => sendResponse({
                chat
            }))
            .catch((error) => sendResponse({
                error: error.message
            }));
        return true;
    } else if (request.action === "deleteChat") {
        deleteChat(request.chatId)
            .then(() => sendResponse({
                success: true
            }))
            .catch((error) => sendResponse({
                error: error.message
            }));
        return true;
    } else if (request.action === "syncData") {
        syncData()
            .then(() => sendResponse({
                success: true
            }))
            .catch((error) => sendResponse({
                error: error.message
            }));
        return true;
    }
});

// Folder API functions
function fetchFolders() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get("folders", (data) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve(data.folders || []);
            }
        });
    });
}

function createFolder(folderName) {
    return new Promise((resolve, reject) => {
        const newFolder = {
            id: Date.now().toString(),
            name: folderName,
            createdAt: new Date().toISOString(),
        };
        chrome.storage.local.get("folders", (data) => {
            const folders = data.folders || [];
            folders.push(newFolder);
            chrome.storage.local.set({
                folders
            }, () => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve(newFolder);
                }
            });
        });
    });
}

function updateFolder(folderId, folderName) {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get("folders", (data) => {
            const folders = data.folders || [];
            const folderIndex = folders.findIndex((folder) => folder.id === folderId);
            if (folderIndex !== -1) {
                folders[folderIndex].name = folderName;
                chrome.storage.local.set({
                    folders
                }, () => {
                    if (chrome.runtime.lastError) {
                        reject(chrome.runtime.lastError);
                    } else {
                        resolve(folders[folderIndex]);
                    }
                });
            } else {
                reject(new Error("Folder not found"));
            }
        });
    });
}

function deleteFolder(folderId) {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get("folders", (data) => {
            let folders = data.folders || [];
            folders = folders.filter((folder) => folder.id !== folderId);
            chrome.storage.local.set({
                folders
            }, () => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve();
                }
            });
        });
    });
}

// Tag API functions
function fetchTags() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get("tags", (data) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve(data.tags || []);
            }
        });
    });
}

function createTag(tagName) {
    return new Promise((resolve, reject) => {
        const newTag = {
            id: Date.now().toString(),
            name: tagName,
            createdAt: new Date().toISOString(),
        };
        chrome.storage.local.get("tags", (data) => {
            const tags = data.tags || [];
            tags.push(newTag);
            chrome.storage.local.set({
                tags
            }, () => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve(newTag);
                }
            });
        });
    });
}

function updateTag(tagId, tagName) {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get("tags", (data) => {
            const tags = data.tags || [];
            const tagIndex = tags.findIndex((tag) => tag.id === tagId);
            if (tagIndex !== -1) {
                tags[tagIndex].name = tagName;
                chrome.storage.local.set({
                    tags
                }, () => {
                    if (chrome.runtime.lastError) {
                        reject(chrome.runtime.lastError);
                    } else {
                        resolve(tags[tagIndex]);
                    }
                });
            } else {
                reject(new Error("Tag not found"));
            }
        });
    });
}

function deleteTag(tagId) {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get("tags", (data) => {
            let tags = data.tags || [];
            tags = tags.filter((tag) => tag.id !== tagId);
            chrome.storage.local.set({
                tags
            }, () => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve();
                }
            });
        });
    });
}

// Chat API functions
function fetchChats() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get("chats", (data) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve(data.chats || []);
            }
        });
    });
}

function createChat(chatContent, folderId, tagIds) {
    return new Promise((resolve, reject) => {
        const newChat = {
            id: Date.now().toString(),
            content: chatContent,
            folderId,
            tagIds,
            createdAt: new Date().toISOString(),
        };
        chrome.storage.local.get("chats", (data) => {
            const chats = data.chats || [];
            chats.push(newChat);
            chrome.storage.local.set({
                chats
            }, () => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve(newChat);
                }
            });
        });
    });
}

function updateChat(chatId, chatContent, folderId, tagIds) {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get("chats", (data) => {
            const chats = data.chats || [];
            const chatIndex = chats.findIndex((chat) => chat.id === chatId);
            if (chatIndex !== -1) {
                chats[chatIndex].content = chatContent;
                chats[chatIndex].folderId = folderId;
                chats[chatIndex].tagIds = tagIds;
                chrome.storage.local.set({
                    chats
                }, () => {
                    if (chrome.runtime.lastError) {
                        reject(chrome.runtime.lastError);
                    } else {
                        resolve(chats[chatIndex]);
                    }
                });
            } else {
                reject(new Error("Chat not found"));
            }
        });
    });
}

function deleteChat(chatId) {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get("chats", (data) => {
            let chats = data.chats || [];
            chats = chats.filter((chat) => chat.id !== chatId);
            chrome.storage.local.set({
                chats
            }, () => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve();
                }
            });
        });
    });
}


// Use the apiUrl variable when making API calls
fetch(`${apiUrl}/endpoint`)
    .then((response) => response.json())
    .then((data) => {
        // Handle the response data
    })
    .catch((error) => {
        console.error("Error:", error);
    });

// Sync data with the server
function syncData() {
    return new Promise((resolve, reject) => {
        Promise.all([fetchFolders(), fetchTags(), fetchChats()])
            .then(([folders, tags, chats]) => {
                const syncData = {
                    folders,
                    tags,
                    chats,
                };
                // Send syncData to the server API
                fetch("https://api.chatgpt.com/sync", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(syncData),
                    })
                    .then((response) => {
                        if (response.ok) {
                            resolve();
                        } else {
                            reject(new Error("Sync failed"));
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            })
            .catch((error) => {
                reject(error);
            });
    });
}

chrome.commands.onCommand.addListener((command) => {
    if (command === "open-sidebar") {
        // Open the sidebar
    } else if (command === "show-folders") {
        // Show folders
    } else if (command === "add-chat-to-folder") {
        // Add chat to folder
    } else if (command === "add-chat-to-tag") {
        // Add chat to tag
    } else if (command === "delete-chat-from-folder") {
        // Delete chat from folder
    } else if (command === "move-chat") {
        // Move chat
    } else if (command === "select-chats") {
        // Select chats
    } else if (command === "sync-folders-tags") {
        // Sync folders and tags
    }
});