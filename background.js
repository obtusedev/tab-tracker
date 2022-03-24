/*===== Server =====*/
async function serverStatus() {
    let response = await fetch("https://httpbin.org/get");
    return response.ok ? "Up" : "Down"
}
/*===== Tab(s) =====*/

// Returns total list of tabs from all windows
async function getTotalTabsOpened() {
    let num = await chrome.tabs.query({ windowId: chrome.windows.WINDOW_ID_NONE});
    return num.length;
}

// Returns a list of tab objects
async function getAllTabs() {
    let allTabs = await chrome.tabs.query({ windowId: chrome.windows.WINDOW_ID_NONE});
    return allTabs;
}

