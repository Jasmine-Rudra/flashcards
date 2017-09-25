const fs=require("fs");
var ClozeCard= function(text, cloze){
	if(this instanceof ClozeCard){
		this.fulltext=text;
		this.cloze=cloze;
		if(text.indexOf(cloze)!= -1){
			this.partialtext=text.replace(this.cloze,'.....');
			fs.appendFile("clozeCard.csv", this.partialtext + "," + this.cloze + "\n", "utf8", function(error) {
				if(err){
					return console.log(err);
				}
			})
		}
		else{
			console.log("Cloze doesn't appear in the text");
			return;
		}
	}
	else{
		return new ClozeCard(text,cloze);
	}

}

module.exports=ClozeCard;