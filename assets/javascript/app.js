
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
var newDiv;
var Done;

function runQuiz(obj) {
	if( obj.background_image!==null){
		Body.css("background-image","url("+obj.background_image+")");
	}
	Start.append(Box().append($("<h1>").text(obj.title)));

	obj.items.forEach(function(item,index){
		newDiv=Box();
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

	Done=$("<button>").addClass("btn btn-success").css("font-size","36px").text("DONE");
	Done.on("click",Score);
	Start.append(Box().addClass("text-center").append(Done));
}

function Score(){
	//alert("Score");
	var Inp=$("input");
	//alert(Inp.length);
	for(var i=0;i<Inp.length;i++){
		console.log(Inp[i]);
		console.log("name: "+Inp[i].name+" value: "+Inp[i].value);
	}
}


$(document).ready(function() {

Body=$("body");
Start=$("#start");

runQuiz(Trivia);

});