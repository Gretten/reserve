// Код со stack.overflow, модифицирует объект Date, чтобы выдавал корректные даты после пороговых (0, 31). Заменить на MomentJS?
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

class GetDate {
	constructor(x, y) {
		this.today = new Date();
	}
	random(min, max) { 
		let rand = min - 0.5 + Math.random() * (max - min + 1);
		rand = Math.round(rand); 
		return rand;
	}
	getToday() {
		return this.today.getDate(); 
	}
	getBefore(x, y) {
		return this.today.adjustDate(
			- this.random(x, y)
		);
	}
	getAfter(x, y) {
		return this.today.adjustDate(
			this.random(x, y)
		);
	}
};

class Strings extends GetDate {
	beforeDay(x, y) {
		let day = super.getBefore(x, y).getDate();
		if(day < 10) {
			day = `0${day}`;
		}
		return day;
	}
	beforeMonth() {
		let month = super.getBefore().getMonth() + 1;
		if(month < 10) {
			month = `0${month}`;
		}
		return month;
	}	 
	
	afterDay(x, y) {
		let day = super.getAfter(x, y).getDate();
		if(day < 10) {
			day = `0${day}`;
		}
		return day;
	}
	afterMonth() {
		let month = super.getAfter().getMonth() + 1;
		if(month < 10) {
			month = `0${month}`;
		}
		return month;
	}
	beforeString(x, y) {
		return `${this.beforeDay(x, y)}:${this.beforeMonth()}:${super.getBefore().getFullYear()}`
	}
	afterString(x, y) {
		return `${this.afterDay(x, y)}:${this.afterMonth()}:${super.getBefore().getFullYear()}`
	}
}

/** 
Отрефакторить обязательно!

API

1. Создаем объект new Strings;
1.2. Методы beforeString и afterString принимает два числа, где первое - начало интервала случайного разброса дат, а второе - конец. 
1.3. Вставляем нужные методы в элементы.

*/