/*===== Setting(s) =====*/

class Setting {
    constructor() {

    }

}

/*===== Badge(s) =====*/

function createBadgeText(content) {
    chrome.action.setBadgeText({text: content});
}

function getBadgeText() {
    chrome.action.getBadgeText()
}


/*===== Bookmark(s) =====*/

class Bookmark {
    // listens to bookmark being created and logs it
    listenForBookmarkCreatedEvent() {
        chrome.bookmarks.onCreated.addListener((id, bookmark) => {
            (new Storage).set({bookmarks: {[id]: bookmark }});
            createBadgeText("1");
        })
    }
    // remove bookmark from storage
    listenForBookmarkRemovedEvent() {
        chrome.bookmarks.onRemoved.addListener((id, removedInfo) => {
            (new Storage).remove(id);
        })
    }
    listenForBookmarkEventUpdates() {
        this.listenForBookmarkCreatedEvent();
        this.listenForBookmarkRemovedEvent();
    }
}


/*===== Tab(s) =====*/

// Returns total list of tabs from all windows
async function getTotalTabsOpened() {
    let num = await chrome.tabs.query({ windowId: chrome.windows.WINDOW_ID_NONE});
    return num.length;
}

function newTabCreatedEvent() {
    chrome.tabs.onCreated.addListener((tab) => {
        console.log("tab", tab)
    })
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        if (changeInfo.status === "loading" && changeInfo.hasOwnProperty("url")) {
            console.log(changeInfo)
        }
    })
    console.log("new tabs")
}

// Returns a list of tab objects
async function getAllTabs() {
    let allTabs = await chrome.tabs.query({ windowId: chrome.windows.WINDOW_ID_NONE});
    return allTabs;
}

/*===== Window(s) =====*/

// Returns a array of all window ids
async function getAllWindowId() {
    let windowList = await chrome.windows.getAll();
    return windowList.map((window) => {
        return window.id;
    })
}


/*===== Storage =====*/

class Storage {
    getAll() {
        // get all items in storage
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get(null, (items) => {
                if (chrome.runtime.lastError) {
                    return reject(chrome.runtime.lastError);
                }
                resolve(items);
            })
        })
    }
    clear() {
        // clear all storage items
        return new Promise((resolve, reject) => {
            chrome.storage.sync.clear(() => {
                if (chrome.runtime.lastError) {
                    return reject(chrome.runtime.lastError);
                }
                resolve("ok");
            })
        })
    }
    get(key) {
        // get single key value object
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get(key, (result) => {
                if (chrome.runtime.lastError) {
                    return reject(chrome.runtime.lastError);
                }
                return resolve(result);
            })
        })
        
    }
    set(obj) {
        // sets new object in storage
        return new Promise((resolve, reject) => {
            chrome.storage.sync.set(obj, () => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                }
                resolve("ok");
            })
        })
    }
    remove(key) {
        // remove key value from storage
        return new Promise((resolve, reject) => {
            chrome.storage.sync.remove(key, () => {
                if (chrome.runtime.lastError) {
                    return reject(chrome.runtime.lastError);
                }
                resolve("ok")
            })
        })
    }
    getBytesInUse() {
        // return space used in bytes
        return new Promise((resolve, reject) => {
            chrome.storage.sync.getBytesInUse(null, (size) => {
                if (chrome.runtime.lastError) {
                    return reject(chrome.runtime.lastError);
                }
                resolve(size);
            })
        })
    }
}


async function start() {
   (new Bookmark).listenForBookmarkEventUpdates();
   let storage = new Storage();
   let store = await storage.getAll();
   console.log(store)
   console.log("running in background.js")
}


start();
