/*===== Tab(s) =====*/

// Returns total list of tabs from all windows
async function getTotalTabsOpened() {
    let num = await chrome.tabs.query({ windowId: chrome.windows.WINDOW_ID_NONE});
    return num.length;
}
