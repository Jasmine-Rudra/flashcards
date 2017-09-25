var basicCard = require("./BasicCard");
var clozeCard = require("./ClozeCard");
var fs = require("fs");
var inquirer = require("inquirer");

var start= function(){
	inquirer.prompt({
		name:"option",
		message:"Choose an option",
		choice:[{question:"1.Make a new card",value:1},
				{question:"2.Show existing cards",value:2},
				{question:"3.Exit",value:3}],
		type:"list"
	}).then(function(answer){
		switch(answer){
			case 1:addCard();
				break;
			case 2:showCard();
				break;
			case 3:console.log("Goodbye");
				exitApp();
				break;
			default:console.log("Wrong choice");
				exitApp();
		}
	})
}

var exitApp=function(){
	exit();
}

var addCard=function(){
	inquirer.prompt({
		name:"type",
		message:"Choose card type:",
		choices:[{name:"1. Basic Card",value:1},
				{name:"2. Cloze Card",value:2}],
		type:"list"
	}).then(function(answer){
		if(answer.type==1){
			inquirer.prompt([
				{
					name:"front",
					message:"Enter text on the front of the card"
				},
				{
					name:"back",
					message:"Enter text on the back of the card"
				}
			]).then(function(answer){
				var newCard=basicCard(answer.front,answer.back);
				start();
			});
		}
		else if(answer.type==2){
			inquirer.prompt([
				{
					name:"text",
					message:"Enter the full text"
				},
				{
					name:"cloze",
					message:"Enter the cloze text"
				}
			]).then(function(answer){
				var newCard=clozeCard(answer.text,answer.cloze);
				start();
			});
		}
	})
}

var showCard=function(){
	inquirer.prompt({
		name:"type",
		message:"Display all:",
		choices:[{name:"1. Basic Cards",value:1},
				{name:"2. Cloze Cards",value:2}],
		type:"list"
	}).then(function(answer){
		if(answer.type==1){
			fs.readFile("basicCard.csv","utf8",function(error,data){
				console.log(data);
				start();
			})
		}
		else if(answer.type==2){
			fs.readFile("clozeCard.csv","utf8",function(error,data){
				console.log(data);
				start();
			})
		}
	});
}

start();