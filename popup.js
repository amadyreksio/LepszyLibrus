// popup.js

document.getElementById("changePage").addEventListener("click", () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {action: "ocenyedit"}, (response) => {
            console.log(response.status);
        });
    });
});
document.getElementById("chk1").addEventListener("click", () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {action: "chk1chk"}, (response) => {
            document.getElementById('chk1').checked=response.val;
        });
    });
});
document.addEventListener('DOMContentLoaded',(e)=>{
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {action: "getval1"}, (response) => {
            document.getElementById('chk1').checked=response.val;
        });
    });
});