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

if(!Date.prototype.adjustDate){
	Date.prototype.adjustDate = function(days){
		var date;

		days = days || 0;

		if(days === 0){
			date = new Date( this.getTime() );
		} else if(days > 0) {
			date = new Date( this.getTime() );

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

// Блок строк 

class Strings {
	constructor() {
		this.today = new Date();
	}
	random(min, max) { 
		let rand = min - 0.5 + Math.random() * (max - min + 1);
		rand = Math.round(rand); 
		return rand;
	}
	setNull(arg) {
		return arg < 10 ? `0${arg}` : arg;
	}
	randomize(x, y) {
		return this.today.adjustDate(
			this.random(x, y)
		);
	}
	getDays(x, y) {
		let date = this.randomize(x, y);
		let day = this.setNull(date.getDate());
		let month = this.setNull(date.getMonth() + 1);
		let year = date.getFullYear();
		return `${day}:${month}:${year}`;
	}
};
