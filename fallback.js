/*
Первый блок - со stack.overflow, модифицирует объект Date, чтобы выдавал корректные даты после пороговых (0, 31).

API

0. Подключаем либу;
1. Создаем объект new Strings;
1.2. Метод getDays устанавливает разброс случайных значений для дат:
    -  случайная дата в прошлом? Передаем в аргументы два положительных числа - минимальное и максимальное.
    -  в будущем? Передаем отрицательные числа. Абсолютное значение первого должно быть больше второго!
    -  нужна текущая дата? Вызываем без аргументов. 
1.3. Вставляем метод в элементы.

*/

// Блок модификации Date

if (!Date.prototype.adjustDate) {
    Date.prototype.adjustDate = function (days) {
        var date;

        days = days || 0;

        if (days === 0) {
            date = new Date(this.getTime());
        } else if (days > 0) {
            date = new Date(this.getTime());

            date.setDate(date.getDate() + days);
        } else {
            date = new Date(
                this.getFullYear(),
                this.getMonth(),
                this.getDate() - Math.abs(days),
                this.getHours(),
                this.getMinutes(),
                this.getSeconds(),
                this.getMilliseconds()
            );
        }

        this.setTime(date.getTime());

        return this;
    };
};

var String = function () {
    this.today = new Date();
}

String.prototype.random = function (min, max) {
    return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}

String.prototype.setNull = function (arg) {
    return arg < 10 ? '0' + arg : arg;
}

String.prototype.randomize = function (x, y) {
    return this.today.adjustDate(
        this.random(x, y)
    );
}

String.prototype.getDays = function (x, y, symb) {
    var symbMonths = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря'
    ];
    var date = this.randomize(x, y);
    var day = this.setNull(date.getDate());
    var year = date.getFullYear();
    var month;
    if (symb) {
        month = symbMonths[date.getMonth()]
    } else {
        month = this.setNull(date.getMonth() + 1);
    }
    return day + '.' + month + '.' + year;
}

// Геолокация.
// Вставить в HTML: <script src="https://api-maps.yandex.ru/1.1/index.xml" type="text/javascript"></script>


var Cities = function() {
    this.ymaps = YMaps;
}

Cities.prototype.getCity = function() {
    var city = this.ymaps.location.city;
    return city;
}