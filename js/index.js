uName = document.querySelector(`input[name="uName"]`);
mail = document.querySelector(`input[name="mail"]`);
pw = document.querySelector(`input[name="pw"]`);
var users = [];
var index;

if (localStorage.getItem(`users`) != null) {
    users = JSON.parse(localStorage.getItem(`users`));
}


if (window.location.href.slice(-10,-5) == `inner`) {
    head.innerHTML = `welcome ${localStorage.getItem(`tempName`)}`;
}



function valid (element) {

    var vadlidation = {
        uName : /^[a-zA-Z\s]{3,20}$/,
        mail : /^[a-zA-Z0-9_]{3,15}@{1}[a-zA-Z]{3,7}.{1}[a-zA-Z]{2,3}$/,
        pw : /^[a-zA-Z0-9\-!@#$%^&*()_]{8,15}$/
    }
        return vadlidation[element.name].test(element.value);
}

document.addEventListener(`focusin`, function(e) {
    if (e.target.tagName == `INPUT`&& window.location.href.slice(-11,-5) == `regist`) {
        e.target.nextElementSibling.classList.remove(`d-none`);
        e.target.nextElementSibling.nextElementSibling.classList?.add(`d-none`);
        e.target.nextElementSibling.nextElementSibling.classList?.remove(`animated`);
        e.target.nextElementSibling.nextElementSibling.nextElementSibling.classList?.add(`d-none`);
        e.target.nextElementSibling.nextElementSibling.nextElementSibling.classList?.remove(`animated`);
        e.target.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.classList?.add(`d-none`);
        e.target.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.classList?.remove(`animated`);
    }


    if(e.target.tagName == `INPUT`&& window.location.href.slice(-11,-5) == `regist` && e.target.name != `pw` ) {
        e.target.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.classList?.add(`d-none`);
        e.target.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.classList?.remove(`animated`);
    }
})


function token(element) {
    for(var i = 0 ; i < users.length;i++) {

        if(users[i][`${element.name}`] == element.value) {
            return true
        }
    }
    return false;
}


if (window.location.href.slice(-11,-5) == `regist`) {
    
    regist.addEventListener(`click`, function(e) {
        if(uName.value == `` || mail.value == `` || pw.value == ``) {
            uName.nextElementSibling.nextElementSibling.classList?.remove(`d-none`);
            mail.nextElementSibling.nextElementSibling.classList?.remove(`d-none`);
            pw.nextElementSibling.nextElementSibling.classList?.remove(`d-none`);
        }

        if(!valid(uName) || !valid(mail) || !valid(pw) || uName.length == 0 || mail.length == 0 || pw.length == 0 || token(uName) || token(mail)) {
            var anime = document.getElementsByClassName(`text-danger`);

            for(var i = 0 ; i < anime.length;i++) {
                anime[i].classList.toggle(`animated`);
            }
            return
        }

        regist.nextElementSibling.classList.add(`d-none`);

        users.push({uName : uName.value, mail: mail.value, pw: pw.value});
        localStorage.setItem(`users`,JSON.stringify(users))

        window.location = `./index.html`;
    })
    document.addEventListener(`focusout`, function(e) {
        e.target.nextElementSibling.classList.add(`d-none`);
    
        if(e.target.value == 0) {
            e.target.nextElementSibling.nextElementSibling.classList.remove(`d-none`);
            return
        }    
        if(token(e.target)) {
            e.target.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove(`d-none`);
            return
        }
        if(valid(e.target)) {
            e.target.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove(`d-none`);
            }else {
            e.target.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove(`d-none`);
            return;
        }


    })
}

function isUser () {
    for(var i = 0 ; i < users.length;i++) {
        if(users[i].mail == mail.value && users[i].pw == pw.value) {
            index= i;
            return true;
        }
    }
    return false;
    
}


login.addEventListener(`click`, function (e) {    

        if(mail.value == `` || pw.value == ``) {
            login.nextElementSibling.classList.remove(`d-none`);
            return
        }
        if(!isUser()) {
            login.nextElementSibling.nextElementSibling.classList.remove(`d-none`);
            return
        }
    
        localStorage.setItem(`tempName`, `${users[index].uName}`)

        window.location=`./inner.html`;
    })
    