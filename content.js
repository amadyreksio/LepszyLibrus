const init = function() {
    document.querySelectorAll('.ocena').forEach((grade, index) => {
        grade.id = 'grade-' + (index + 1).toString();
        grade.parentNode.addEventListener('click', (e) => {
            if (editmode) {
                editgrade(grade.id);
            }
        });
    });
    removealerts();
    loadgrades();
    var logs=document.createElement('span');
    logs.id='amady-logs';
    document.body.appendChild(logs);
    chrome.storage.local.get(['setting-enablesaving'], function(result) {
            if (result['setting-enablesaving'] != null) {
                if(result['setting-enablesaving']==true){savingenabled=true;}
                if(result['setting-enablesaving']==false){savingenabled=false;}
                if(result['setting-enablesaving']=='true'){savingenabled=true;}
                if(result['setting-enablesaving']=='false'){savingenabled=false;}
                if(result['setting-enablesaving']=='undefined'){savingenabled=true;}

            }
        });
}
init();
var savingenabled=true;
var editmode = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "ocenyedit") {
        editmode = true;
        document.querySelectorAll('.ocena').forEach((grade) => {
            grade.style.pointerEvents = 'none';
            grade.style.position = 'absolute';
            var editbtn = document.createElement('img');
            editbtn.className = 'amadyreksio-librus-edit-btn';
            editbtn.src = 'https://api.amadyreksio.pl/edit.png';
            editbtn.addEventListener('click', (e) => {
                setTimeout(() => {
                    window.location.href = 'https://synergia.librus.pl/przegladaj_oceny/uczen';
                    editgrade(grade.id);
                }, 1000);
            });
            grade.appendChild(editbtn);
        });
        sendResponse({ status: "completed" });
    }else if (message.action === "chk1chk") {
        savingenabled=!savingenabled;
        chrome.storage.local.set({ ['setting-enablesaving']: savingenabled }, function() {
        });
        sendResponse({ val: savingenabled });
    }else if (message.action === "getval1") {
        sendResponse({ val: savingenabled });
    }
});

function editgrade(id) {
    var inputbox = document.createElement('div');
    inputbox.className = 'amadyreksio-librus-popup';
    var inptitle = document.createElement('h1');
    inptitle.textContent = 'Zmień ocenę';
    inptitle.style = 'color: white; font-family: \'Calibri\'; width: 100%; text-align: center;';
    inputbox.appendChild(inptitle);
    var textbox = document.createElement('input');
    textbox.type = 'text';
    textbox.className = 'amadyreksio-librus-inputtb';
    inputbox.appendChild(textbox);
    var cls = document.createElement('img');
    cls.className = 'amadyreksio-librus-cls';
    cls.src = 'https://api.amadyreksio.pl/close.png';
    cls.addEventListener('click', (e) => {
        document.querySelectorAll('.amadyreksio-librus-edit-btn').forEach((editbtnq) => {
            editbtnq.remove();
        });
        document.querySelectorAll('.ocena').forEach((grade) => {
            grade.style.pointerEvents = 'all';
            grade.style.position = 'static';
        });
        editmode = false;
        
        inputbox.classList.add('amady-anim-hide');
        setTimeout(() => {
            inputbox.remove();
        }, 200);
    });
    inputbox.appendChild(cls);
    var btn = document.createElement('button');
    btn.className = 'amadyreksio-librus-btn';
    btn.textContent = 'OK';
    inputbox.appendChild(btn);
    document.body.appendChild(inputbox);
    btn.addEventListener('click', (e) => {
        document.getElementById(id).innerHTML = textbox.value;
        document.querySelectorAll('.amadyreksio-librus-edit-btn').forEach((editbtnq) => {
            editbtnq.remove();
        });
        document.querySelectorAll('.ocena').forEach((grade) => {
            grade.style.pointerEvents = 'all';
            grade.style.position = 'static';
        });
        editmode = false;
        inputbox.classList.add('amady-anim-hide');
        savegrades();
        setTimeout(() => {
            inputbox.remove();
        }, 200);
    });
}

function removealerts() {
    try {
        document.getElementsByClassName('modal-box')[0].remove();
        console.log('te kurvy wyświetlają komunikat o tym, że używasz rozszerzenia! Pozbyto się go.');
    } catch (error) {
    }
    setTimeout(() => {
        removealerts();
    }, 1);
}
function log(logtext){
    var logelem=document.createElement('p');
    logelem.textContent=logtext;
    document.getElementById('amady-logs').appendChild(logelem);
}
function savegrades() {
    
    if(savingenabled){
    document.querySelectorAll('.ocena').forEach((grd) => {
        
        var grdid = grd.href.replace('/przegladaj_oceny/szczegoly/', '').replace('https://synergia.librus.pl','');
        log(grdid+':'+grd.innerHTML);
        chrome.storage.local.set({ [''+grdid]: grd.innerHTML }, function() {
            log('saved: ' + grdid + ':' + grd.innerHTML);
        });
    });
    }
}

function loadgrades() {
    var resultt=false;
    chrome.storage.local.get(['setting-enablesaving'], function(result) {
        if (result['setting-enablesaving'] != null) {
            //log(result['setting-enablesaving']);
            //if(result['setting-enablesaving']==true){savingenabled=true;}
            //if(result['setting-enablesaving']==false){savingenabled=false;}
            //if(result['setting-enablesaving']=='true'){savingenabled=true;}
            //if(result['setting-enablesaving']=='false'){savingenabled=false;}
            //if(result['setting-enablesaving']=='undefined'){savingenabled=true;}
            resultt=result['setting-enablesaving'];
            
    if(resultt){
    document.querySelectorAll('.ocena').forEach((grd) => {
        var grdid = grd.href.replace('/przegladaj_oceny/szczegoly/', '').replace('https://synergia.librus.pl','');
        chrome.storage.local.get([grdid], function(resulttt) {
            if (resulttt[grdid] != null) {
                grd.innerHTML = resulttt[grdid];
            }
        });
    });
}
        }else{
        
        }
    });
    

}





function onUrlChange(callback) {
    let lastUrl = location.href;

    new MutationObserver(() => {
        const currentUrl = location.href;
        if (currentUrl !== lastUrl) {
            lastUrl = currentUrl;
            callback(currentUrl);
        }
    }).observe(document, { subtree: true, childList: true });

    window.addEventListener('popstate', () => {
        const currentUrl = location.href;
        if (currentUrl !== lastUrl) {
            lastUrl = currentUrl;
            callback(currentUrl);
        }
    });
}


onUrlChange((newUrl) => {
    console.log('URL zmienił się na:', newUrl);

    loadgrades();
});