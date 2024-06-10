// popup.js

document.getElementById("changePage").addEventListener("click", () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {action: "ocenyedit"}, (response) => {
            console.log(response.status);
        });
    });
});
