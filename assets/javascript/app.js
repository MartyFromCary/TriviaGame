function reportObj(obj) {
  console.log("title: " + obj.title);
  console.log("background_image: " + obj.background_image);
  console.log("length: " + obj.items.length);
  obj.items.forEach(function(item, index) {
    console.log("index: " + index);
    console.log("background_color: " + item.background_color);
    console.log("question: " + item.question);
    item.answers.forEach(function(item, index) {
      console.log("(" + index + "): " + item);
    });
    console.log("correct_answer: " + item.correct_answer);
  });
}

//reportObj(Trivia);

function Box() {
  return $("<div>").addClass("button-group");
}

var Body;
var Start;

function runQuiz(obj) {
  var myTimeout;
  var doneButton;
  var TimeLeft = obj.items.length * 6;
  var HTMLTimeLeft = $("<h2>");
  var radioInpArr;
  var myAnswers = [];
  var newDiv;

  function doneFunction() {
    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unanswered = 0;

    clearTimeout(myTimeout);
    myAnswers.forEach(function(myAnswer, index) {
      console.log(
        "myAnswer: " +
          myAnswer +
          " correct_answer: " +
          obj.items[index].correct_answer
      );
      if (myAnswer == -1) {
        unanswered++;
        return;
      }
      if (myAnswer == obj.items[index].correct_answer) {
        correctAnswers++;
      } else {
        incorrectAnswers++;
      }
    });

    Start.empty();
    Start.append(
      Box()
        .addClass("text-center")
        .append($("<h1>").text("All Done!"))
        .append($("<h2>").text("Correct Answers: " + correctAnswers))
        .append($("<h2>").text("Incorrect Answers: " + incorrectAnswers))
        .append($("<h2>").text("Unanswered: " + unanswered))
    );
  }

  function decTimeLeft() {
    TimeLeft--;
    HTMLTimeLeft.text("Time Left: " + TimeLeft + " Secs");
    if (TimeLeft > 0) {
      return;
    }
    doneFunction();
  }

  Start.empty();
  if (obj.background_image !== null) {
    Body.css("background-image", "url(" + obj.background_image + ")");
  }
  Start.append(
    Box()
      .addClass("text-center")
      .append($("<h1>").text(obj.title))
      .append(HTMLTimeLeft)
  );

  obj.items.forEach(function(questionGroup, questionNr) {
    myAnswers.push(-1);
    newDiv = Box();
    if (questionGroup.background_color !== null) {
      newDiv.css("background-color", questionGroup.background_color);
    }
    newDiv.append($("<h2>").text(questionGroup.question));

    var Form = $("<form>");
    questionGroup.answers.forEach(function(answer, answerNr) {
      var radioInp = $("<input>")
        .attr("type", "radio")
        .attr("name", questionNr)
        .val(answerNr);

      Form.append(
        $("<label>")
          .addClass("radio-inline")
          .append(radioInp)
          .append($("<p>").text(answer))
      );
      //radioInpArr.push(radioInp);
    });
    newDiv.append(Form);
    Start.append(newDiv);
  });

  radioInpArr = $(":radio");
  radioInpArr.on("click", function() {
    myAnswers[$(this).attr("name")] = $(this).attr("value");
  });

  doneButton = $("<button>")
    .addClass("btn btn-secondary")
    .css("font-size", "36px")
    .text("DONE");
  Start.append(
    Box()
      .addClass("text-center")
      .append(doneButton)
  );

  HTMLTimeLeft.text("TimeLeft: " + TimeLeft + " Secs");
  doneButton.on("click", doneFunction);
  myTimeout = setInterval(decTimeLeft, 1000);
}

$(document).ready(function() {
  Body = $("body");
  Start = $("#start");

  var StartButton = $("<button>")
    .addClass("btn btn-secondary")
    .css("font-size", "36px")
    .text("START");
  Start.append(
    Box()
      .addClass("text-center")
      .append(StartButton)
  );
  StartButton.on("click", function() {
    runQuiz(Trivia);
  });
});
