
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

reportObj(Trivia);

var Body;
var Start;
var newDiv;

function runQuiz(obj) {
	if( obj.background_image!==null){
		Body.css("background-image","url("+obj.background_image+")");
	}
	Start.append($("<div>").addClass("button-group").append($("<h1>").text(obj.title)));

	obj.items.forEach(function(item,index){
		newDiv=$("<div>").addClass("button-group");
		if( item.background_color!==null) {
			newDiv.css("background-color",item.background_color)
		}
		newDiv.append($("<h2>").text(item.question));

		var Form=$("<form>");
		var buttonName="Question"+index;
		item.answers.forEach(function(item,index){
			Form.append(
				$("<label>")
					.addClass("radio-inline")
					.append(
						$("<input>")
						.attr("type","radio")
						.attr("name",buttonName)
						.val(index))
					.append(
						$("<p>")
						.text(item))
			);
		});
		newDiv.append(Form);
		Start.append(newDiv);
	});
	Start.append($("<div>").addClass("button-group").append($("<h1>").text("DONE")));
}

$(document).ready(function() {

Body=$("body");
Start=$("#start");

runQuiz(Trivia);

});