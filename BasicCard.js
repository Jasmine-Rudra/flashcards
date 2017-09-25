const fs=require("fs");
var BasicCard=function(front, back){
	if(this instanceof BasicCard){
		this.front=front;
		this.back=back;
		fs.appendFile("basicCard.csv", this.front + "," + this.back + "\n", "utf8", function(error) {
    		if(err){
    			return console.log(err);
    		}
		})
	}
	else{
		return new BasicCard(front,back);
	}

}

module.exports=BasicCard;