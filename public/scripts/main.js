
class Person {
	constructor(name){
		this.name = name;
	}
	hello(){
		if (typeof this.name === 'string') {
			return 'Hello Mr.' + this.name + '!';
		}
		else {
			return 'Boooom wrong code';
		}
	}
}

var abc = new Person("Sikandar");

document.write(abc.hello());