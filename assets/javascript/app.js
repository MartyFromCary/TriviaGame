
function reportObj(obj) {
	console.log("title: "+obj.title);
	console.log("background_image: "+obj.background_image);
	console.log("length: "+obj.items.length);
	obj.items.forEach(function(item,index){
		console.log("index: "+index);
		console.log("background_color: "+item.background_color);
		console.log("question: "+item.question);
		item.answers.forEach(function(item,index){console.log("("+index+"): "+item);});
	console.log("correct_answer: "+item.correct_answer);
	});
}

//reportObj(Trivia);

function Box(){
	return $("<div>").addClass("button-group");
}

var Body;
var Start;
var Done;

function runQuiz(obj) {
	var radioInpArr;
	var myAnswers=[];
	var newDiv;

	if( obj.background_image!==null){
		Body.css("background-image","url("+obj.background_image+")");
	}
	Start.append(Box().append($("<h1>").text(obj.title)));

	obj.items.forEach(function(questionGroup,questionNr){
		myAnswers.push(-1);
		newDiv=Box();
		if( questionGroup.background_color!==null) {
			newDiv.css("background-color",questionGroup.background_color)
		}
		newDiv.append($("<h2>").text(questionGroup.question));

		var Form=$("<form>");
		questionGroup.answers.forEach(function(answer,answerNr){
			var radioInp=$("<input>").attr("type","radio").attr("name",questionNr).val(answerNr);

			Form.append(
				$("<label>")
					.addClass("radio-inline")
					.append(radioInp).append($("<p>").text(answer))
			);
			//radioInpArr.push(radioInp);
		});
		newDiv.append(Form);
		Start.append(newDiv);
	});
	Done=$("<button>").addClass("btn btn-success").css("font-size","36px").text("DONE");

	radioInpArr=$(":radio");
	radioInpArr.on("click",function(){
		console.log("name: "+$(this).attr("name")+" value: "+$(this).attr("value"));
		myAnswers[$(this).attr("name")] = $(this).attr("value");
	});

	Start.append(Box().addClass("text-center").append(Done));
	Done.on("click",function(){
		console.log(myAnswers.length);
		for(var i=0;i<myAnswers.length;i++){
			console.log("myAnswer: "+myAnswers[i]+" correct_answer: "+obj.items[i].correct_answer);
		}
	});

}

$(document).ready(function() {

Body=$("body");
Start=$("#start");

runQuiz(Trivia);

});