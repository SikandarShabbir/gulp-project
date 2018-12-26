
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

var person = new Person("Sikandar");
var greetHTML = templates['greeting']({
	message: person.hello()
});
document.write(greetHTML);