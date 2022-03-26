// Returns object containing information on tab numbers in active window tabs & total.
async function tabInfo() {
    let activeWindowQueryOptions = {
        active: true,
        currentWindow: true,
    };
    let allWindowQueryOptions = {
        active: false,
        currentWindow: false,
    };
    let activeWindow = await chrome.tabs.query(activeWindowQueryOptions);
    let allWindow = await chrome.tabs.query(allWindowQueryOptions);
    return {
        active: activeWindow,
        total: allWindow
    };
}

/*===== Setting(s) =====*/
}


/*===== Bookmark(s) =====*/

class Bookmark {
    // listens to bookmark being created and logs it
    listenForBookmarkCreatedEvent() {
    chrome.bookmarks.onCreated.addListener((id, bookmark) => {
            (new Storage).set({bookmarks: {[id]: bookmark }});
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
                resolve(obj);
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
    console.clear();
    let tabs = await getAllTabs();
    /*
    tabs.forEach((obj) => {
        console.log(obj.url)
    })
    */
   //newTabCreatedEvent()
   chrome.tabs.onCreated.addListener((tab) => {
       console.log(tab)
       console.log("fuck")
   })
   chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
       //console.log(changeInfo)
       //console.log("fuck")
   })
   let d = await serverStatus();
   console.log(d)
}

start();
