const init=function(){
    var gradecount=0;
    document.querySelectorAll('.ocena').forEach((grade)=>{
    gradecount+=1;
    grade.id='grade-'+gradecount.toString();
    grade.parentNode.addEventListener('click',(e)=>{
    if(editmode){
        editgrade(grade.id);
    }
    });
    });
removealerts();
}
init();
var editmode=false;
var gradecount=0;
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "ocenyedit") {
    editmode=true;
        //var gradecount=0;
        document.querySelectorAll('.ocena').forEach((grade)=>{
            //gradecount+=1;
            grade.style.pointerEvents='none';
            grade.style.position='absolute';
            var editbtn=document.createElement('img');
            editbtn.className='amadyreksio-librus-edit-btn';
            editbtn.src='https://api.amadyreksio.pl/edit.png';
            //editbtn.style.pointerEvents='all';
            editbtn.addEventListener('click',(e)=>{
            
            setTimeout(() => {
                window.location.href='https://synergia.librus.pl/przegladaj_oceny/uczen';
                editgrade(grade.id);
            }, 1000);
            
            });
            
            grade.appendChild(editbtn);
        });
        sendResponse({status: "completed"});
    }
});
function editgrade(id){
var inputbox=document.createElement('div');
inputbox.className='amadyreksio-librus-popup';
var inptitle=document.createElement('h1');
inptitle.textContent='Zmień ocenę';
inptitle.style='color: white;font-family: \'Calibri\';width: 100%;text-align: center;'
inputbox.appendChild(inptitle);
var textbox=document.createElement('input');
textbox.type='text';
textbox.className='amadyreksio-librus-inputtb';
inputbox.appendChild(textbox);
var cls=document.createElement('img');
cls.className='amadyreksio-librus-cls';
cls.src='https://api.amadyreksio.pl/close.png';
cls.addEventListener('click',(e)=>{
document.querySelectorAll('.amadyreksio-librus-edit-btn').forEach((editbtnq)=>{
    editbtnq.remove();
    });
    document.querySelectorAll('.ocena').forEach((grade)=>{
    grade.style.pointerEvents='all';
    grade.style.position='static';
    });
    editmode=false;
    inputbox.classList.add('amady-anim-hide');
    setTimeout(() => {
        inputbox.remove();
    }, 200);
});
inputbox.appendChild(cls);
var btn=document.createElement('button');
btn.className='amadyreksio-librus-btn';
btn.textContent='OK';
inputbox.appendChild(btn);
document.body.appendChild(inputbox);
btn.addEventListener('click',(e)=>{
document.getElementById(id).innerHTML=textbox.value;
document.querySelectorAll('.amadyreksio-librus-edit-btn').forEach((editbtnq)=>{
    editbtnq.remove();
    });
    document.querySelectorAll('.ocena').forEach((grade)=>{
    grade.style.pointerEvents='all';
    grade.style.position='static';
    });
    editmode=false;
    inputbox.classList.add('amady-anim-hide');
    setTimeout(() => {
        inputbox.remove();
    }, 200);
});

}
function removealerts(){
    try {
        document.getElementsByClassName('modal-box')[0].remove();
        console.log('te kurvy wyświetlają komunikat o tym, że używasz rozszerzenia! Pozbyto się go.')
      } catch (error) {
        
      }
    setTimeout(() => {
        removealerts();
    }, 1);
    
    
}