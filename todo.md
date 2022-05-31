
https://developer.chrome.com/docs/extensions/reference/
https://developer.chrome.com/docs/extensions/mv3/manifest/
https://developer.chrome.com/docs/extensions/reference/browserAction/#method-setBadgeText

https://developer.chrome.com/docs/extensions/reference/contextMenus/

Features:
- Blacklist sites. If blacklisted then put "hidden" for domain
- How many tabs & windows were opened every x min. like every 1hr. customizable.
how often switching between tabs
- disable if on dashboard
- When new tab open get domain and time plus increment view.
- Add setting like debug for console.log true
UI:
settings page
    -export settings
page with graphs for visualization

MISC:
- Add images to readme

popup.html
total tabs opened
domain | views | sorted by most hits

Settings Object:
{
    "debug": true,
    "intervalToSaveTotalTabsInMinutes": 60,
    
}

tab object
active: false
audible: false
autoDiscardable: true
discarded: false
favIconUrl: "https://expressjs.com/images/favicon.png"
groupId: -1
height: 851
highlighted: false
id: 5
incognito: true
index: 0
mutedInfo: {muted: false}
pinned: false
selected: false
status: "complete"
title: "Express routing"
url: "https://expressjs.com/en/guide/routing.html"
width: 1920
windowId: 1
