function addRowToTable(domain, view, url, now) {
    let _domain = domain || "";
    let _view = view || 1;
    let _url = url || "";
    let _now = now || Date.now();

    let html = `
    <tr>
        <td>${_domain}</td>
        <td>${_view}</td>
        <td>${_url}</td>
        <td>${_now}</td>
    </tr>`
    
    let tBody = document.getElementById("table-body");
    tBody.insertAdjacentHTML("afterend", html);
}

/*
chrome.tabs.onCreated.addListener((tab) => {
    console.log(tab.url);
    addRowToTable("", 1, tab.url, Date.now());
})
*/

