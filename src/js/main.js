(async () => {
    const src = chrome.runtime.getURL("/src/js/background.js");
    const main = await import(src);
    main.start();
    console.log("hi from main")
})
