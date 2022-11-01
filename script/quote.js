function start() {
    randomBackgroundAndQuote();
    setInterval(showTime, 1000);
    var lan;
}

function randomBackgroundAndQuote() {
    let img = document.getElementById("quote-main");
    let quote = document.getElementById("quote");

    fetch("../script/quotes_json.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let rNum1 = Math.floor(Math.random() * data.length);
            let rNum2 = Math.floor(Math.random() * data.length);
            img.style.backgroundImage = "url(../img/rImgs/" + rNum1 + ".jpg)";
            let q = data[rNum2];
            quote.innerHTML = q.quote;
            if (q.language == "en") {
                lan = 'en';
                quote.style.direction = 'ltr';
                img.style.fontFamily = "Lucida Grande";
            }
            else {
                lan = 'ar';
                quote.style.direction = 'rtl';
                img.style.fontFamily = "aboody";
            }
        });
}

function showTime() {
    let time = new Date();
    let hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();
    am_pm = "AM";
    
    if (hour >= 12) {
        if(hour != 12)
            hour -= 12;
        if (lan == 'en')
            am_pm = " PM";
        else
            am_pm = "  مساءً";
    }
    else {
        hr = 12;
        if (lan == 'en')
            am_pm = " AM";
        else
            am_pm = "  صباحاً";
    }

    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;

    let currentTime = hour + ":"
        + min + ":" + sec + am_pm;

    document.getElementById("clock")
        .innerHTML = currentTime;
}



window.addEventListener("load", start, false);