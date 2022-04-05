// used https://github.com/HueRtx/webclock

/*global window*/
(function (global) {
    "use strict";
    function Clock(el) {
        var document = global.document;
        this.el = document.getElementById(el);
        this.months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
        this.days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    }
    Clock.prototype.addZero = function (i) {
        if (i < 10) {
            i = "0" + i;
            return i;
        }
        return i;
    };
    Clock.prototype.updateClock = function () {
        var now, year, month, dayNo, day, hour, minute, second, result, self;
        now = new global.Date();
        year = now.getFullYear();
        month = now.getMonth();
        dayNo = now.getDay();
        day = now.getDate();
        hour = this.addZero(now.getHours());
        minute = this.addZero(now.getMinutes());
        second = this.addZero(now.getSeconds());
        result = this.days[dayNo] + ", " + day + " " + this.months[month] + " " + year + " " + hour + ":" + minute + ":" + second;
        self = this;
        self.el.innerHTML = result;
        global.setTimeout(function () {
            self.updateClock();
        }, 1000);
    };
    global.Clock = Clock;
}(window));

function addEvent(elm, evType, fn, useCapture) {
    "use strict";
    if (elm.addEventListener) {
        elm.addEventListener(evType, fn, useCapture);
    } else if (elm.attachEvent) {
        elm.attachEvent('on' + evType, fn);
    } else {
        elm['on' + evType] = fn;
    }
}

addEvent(window, "load", function () {
    if (document.getElementById("clock-ru")) {
        var clock = new Clock("clock-ru");
        clock.updateClock();
    }
});
