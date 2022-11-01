function start() {
    var login_btn = document.getElementById('log-btn');
    var reg_btn = document.getElementById('reg-btn');

    var login_form = document.getElementById('login');
    var reg_form = document.getElementById('reg');

    var log_sbt = document.getElementById('log_sbt');
    var reg_sbt = document.getElementById('reg_sbt');

    var log_user = document.getElementById('log_user');
    var log_pass = document.getElementById('log_pass');

    var reg_user = document.getElementById('reg_user');
    var reg_pass = document.getElementById('reg_pass');

    var logo = document.getElementById('logo');
    var face = document.getElementById('face');

    var log_msg = document.getElementById('log_msg');
    var reg_msg = document.getElementById('reg_msg');


    reg_user.addEventListener('focus', function () { setInterval("faceExprition(face,reg_user,reg_pass)", 1) }, false);
    reg_pass.addEventListener('focus', function () { setInterval("faceExprition(face,reg_user,reg_pass)", 1) }, false);

    reg_sbt.addEventListener('mouseenter', function () { escapingButton(reg_sbt,reg_user,reg_pass) });
    log_sbt.addEventListener('mouseenter', function () { escapingButton(log_sbt,log_user,log_pass) });


    loginAndRegisterDetection(log_sbt, reg_sbt, log_msg, reg_msg);

    log_reg_switch(login_btn, reg_btn, login_form, reg_form, logo, face);



}

function loginAndRegisterDetection(log_sbt, reg_sbt, log_msg, reg_msg) {
    log_sbt.onclick = function () {
        if (validUserAndPass(log_user, log_pass)) {
            fetch("../script/data.json")
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    if (log_user.value == data[0].username && log_pass.value == data[0].password) {
                        alert('Welcome ' + data[0].username + ' !');
                        location.replace("../apps/apps.html");
                    }
                    else
                        alert('Wrong username or password!');
                });
        }
        else {
            log_msg.style.display = "block";

            if (!validateName(log_user)) {
                log_msg.innerHTML = "Username must contain 6-20 characters and no spaces";
            }
            else if (!validatePass(log_pass)) {
                log_msg.innerHTML = "Password must contain 8 characters and at least one number";
            }
            else {

            }
        }
    };
    reg_sbt.onclick = function () {
        if (validUserAndPass(reg_user, reg_pass))
            alert("WELCOME");
        else {
            reg_msg.style.display = "block";

            if (!validateName(reg_user)) {
                reg_msg.innerHTML = "Username must contain 6-20 characters and no spaces";
            }
            else if (!validatePass(reg_pass)) {
                reg_msg.innerHTML = "Password must contain 8 characters and at least one number";
            }
            else {

            }
        }
    };

}

function log_reg_switch(login_btn, reg_btn, login_form, reg_form, logo, face) {

    login_btn.onclick = function () {
        reg_form.style.display = 'none';
        login_form.style.display = 'block';

        reg_user.value = "";
        reg_pass.value = "";
        reg_sbt.style.left = "0px";

        logo.style.display = 'block';
        face.style.display = 'none';

        reg_msg.style.display = 'none';
    }

    reg_btn.onclick = function () {
        login_form.style.display = 'none';
        reg_form.style.display = 'block';

        log_user.value = "";
        log_pass.value = "";

        logo.style.display = 'none';
        face.style.display = 'block';

        log_msg.style.display = 'none';
    }
}

function validateName(x) {
    var reg = /^[^-\s]{6,20}$/;
    if (reg.test(x.value))
        return true;
    else
        return false;
}

function validatePass(x) {
    var reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (reg.test(x.value))
        return true;
    else
        return false;
}

function validUserAndPass(user, pass) {
    if (validateName(user) && validatePass(pass)) {
        return true;
    }
    else {
        return false;
    }
}

function faceExprition(face, user, pass) {
    if (user.value.length == 0 && pass.value.length == 0) {
        face.src = 'img/neutral.png';
        face.style.backgroundColor = 'yellow';
    }
    else {
        if (validUserAndPass(user, pass)) {
            face.src = 'img/smile.png';
            face.style.backgroundColor = 'lime';
        }
        else {
            face.src = 'img/sad.png';
            face.style.backgroundColor = 'blue';
        }
    }
}

function moveButton(btn) {
    alert('Move button clicked');
    console.log('Move button clicked');
    btn.style.right = "-10px";

}

function escapingButton(btn,user,pass) {
    if (!validUserAndPass(user, pass)) {
        var pos = getPos(btn);
        var width = document.getElementById("log_reg_box").offsetWidth;
        var move = width * 0.25;

        if (pos == 'left') {
            btn.style.left = move+'px';
            pos = 'right';
        }
        else {
            btn.style.left = '-'+move+'px';
            pos = 'left';
        }
    }
}

function getPos(btn) {
    if (parseInt(btn.style.left) > 0)
        return 'right';
    else if (parseInt(btn.style.left) < 0)
        return 'left';
}

window.addEventListener("load", start, false);