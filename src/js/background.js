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

/*===== Server =====*/
async function serverStatus() {
    let response = await fetch("https://httpbin.org/get");
    return response.ok ? "Up" : "Down"
}


/*===== Bookmark(s) =====*/
function newBookmarkCreatedEvent() {
    chrome.bookmarks.onCreated.addListener((id, bookmark) => {
        // TODO: post this to backend api
        console.log(id)
        console.log(bookmark)
        // bookmark obj = dateAdded, id, index, parentId, title, url
    })
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
