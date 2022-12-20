window.onload = function () {
    var sec = 0;
    var min = 0;
    setInterval(function () {
        sec++;
    }, 1000);
    var jump_btn = document.getElementById("jump");
    var left_btn = document.getElementById("left");
    var right_btn = document.getElementById("right");
    var down_btn = document.getElementById("down");
    let count = 0;
    var t = Date.now();
    var speed = 25;
    var start = false;
    jump_btn.onclick = function () {
        jump();
    }
    left_btn.onclick = function () {
        left();
    }
    right_btn.onclick = function () {
        right();
    }
    down_btn.onclick = function () {
        down();
    }
    var keys = {
        up: false,
        down: false,
        left: false,
        right: false
    };



    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var x = 300;
    var y = 350;
    var xEnemy = 50;
    var yEnemy = 350;
    context.beginPath();
    context.arc(x, y, 50, 0, 2 * Math.PI);
    context.fillStyle = "red";
    context.fill();

    context.beginPath();
    context.arc(xEnemy, yEnemy, 50, 0, 2 * Math.PI);
    context.fillStyle = "green";
    context.fill();

    function jump() {
        count += 1;
        if (count < 20) {
            if (y <= 100)
                y = 50;
            else
                y -= 100;
            speed = 25;
            start = true;
        }
    }

    function left() {
        if (x != 50)
            x -= 25;
    }

    function right() {
        if (x != 550)
            x += 25;
    }

    function down() {
        if (y >= 350)
            y = 350;
        else
            y += 100;
    }

    document.body.onkeydown = function (e) {
        if (e.code == "ArrowLeft") {
            keys["left"] = true;
        }
        if (e.code == "ArrowRight") {
            keys["right"] = true;
        }
        if (e.code == "ArrowUp") {
            keys["up"] = true;
        }
        if (e.code == "ArrowDown") {
            keys["down"] = true;
        }

        if (keys["up"] && keys["right"]) {
            jump();
            right();
        }
        if (keys["up"] && keys["left"]) {
            jump();
            left();
        }
        if (keys["down"] && keys["right"]) {
            down();
            right();
        }
        if (keys["down"] && keys["left"]) {
            down();
            left();
        }

        if (keys["up"] && !keys["right"] && !keys["down"] && !keys["left"])
            jump();
        if (keys["right"])
            right();
        if (keys["down"] && !keys["right"] && !keys["up"] && !keys["left"])
            down();
        if (keys["left"])
            left();
    }

    document.body.onkeyup = function (e) {
        if (e.code == "ArrowLeft") {
            keys["left"] = false;
        }
        if (e.code == "ArrowRight") {
            keys["right"] = false;
        }
        if (e.code == "ArrowUp") {
            keys["up"] = false;
        }
        if (e.code == "ArrowDown") {
            keys["down"] = false;
        }
    }

    draw();
    function draw() {
        context.clearRect(0, 0, 600, 400);

        context.beginPath();
        context.arc(x, y, 50, 0, 2 * Math.PI);
        context.fillStyle = "red";
        context.fill();

        context.beginPath();
        context.arc(xEnemy, yEnemy, 50, 0, 2 * Math.PI);
        context.fillStyle = "green";
        context.fill();

        context.font = '25px Arial';
        context.fillStyle = 'white';
        context.fillText("Time: " + getTime(), 20, 30);

        var timePassed = (Date.now() - t) / 1000;
        t = Date.now();



        if ((x >= xEnemy - 75 && x <= xEnemy + 75) && (y >= yEnemy - 75 && y <= yEnemy + 75)) {
            x = 300;
            y = 350;
            xEnemy = 50;
            yEnemy = 350;
            spd = 1;

            keys["left"] = false;
            keys["right"] = false;
            keys["up"] = false;
            keys["down"] = false;
            alert("GAME OVER, Time Passed => " + getTime());
            sec = 0;
            min = 0;
        }

        setTimeout(function () { bounceOf() }, 1);

        if (y < 350) {
            speed += 500 * timePassed; //gravity speed
            y += Math.floor(speed * timePassed);
            if (y > 350)
                y = 350;
        }
        else {
            count = 0;
            if (start) {
                y = 350;
                start = false;
            }
        }
        window.requestAnimationFrame(draw);
    }


    function getTime() {
        if (sec == 60) {
            min++;
            sec = 0;
        }
        if (sec < 10 && min < 10)
            return "0" + min + ":0" + sec;
        else if (sec < 10)
            return min + ":0" + sec;
        else if (min < 10)
            return "0" + min + ":" + sec;
        else
            return min + ":" + sec;
    }

    var xUp = true, xDown = false, yUp = true, yDown = false;
    var spd = 1;
    var c = 0;
    function bounceOf() {
        if (xEnemy <= 50) {
            xUp = true;
            xDown = false;
            c++;
        }
        else if (xEnemy >= 550) {
            xUp = false;
            xDown = true;
            c++;
        }

        if (yEnemy >= 350) {
            yUp = true;
            yDown = false;
            c++;
        }
        else if (yEnemy <= 50) {
            yUp = false;
            yDown = true;
            c++;
        }

        if (xUp)
            xEnemy += spd;
        else if (xDown)
            xEnemy -= spd;

        if (yUp)
            yEnemy -= spd;
        else if (yDown)
            yEnemy += spd;

        if (c % 4 == 0) {
            spd += 0.01;
        }

        if (spd >= 20)
            spd = 20;
    }
}