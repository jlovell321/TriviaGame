

var q1 = { 
			question: "Which of the following body parts does the bowhead whale not have?", 
			answers: [{answer:"A. Dorsal Fins"}, {answer:"B. Baleen"}, {answer:"C. Flippers"}], 
			correctIndex:0
		 };
var q2 = { 
			question: "Beluga whales have teeth designed for grabbing and tearing its prey. How many teeth do beluga whales have?", 
			answers: [{answer:"A. 45 teeth"}, {answer:"B. 60 teeth"}, {answer:"C. 34 teeth"}], 
			correctIndex:2
		};
var q3 = { 
			question: "Approximately how long is the gestation period for a blue whale calf?", 
			answers: [{answer:"A. 5-7 Months"}, {answer:"B. 11-12 Months"}, {answer:"C. 8-10 Months"}], 
			correctIndex: 1
		};

var q4 = { 
			question: "Whale milk has a high fat content. Approximately what percentage to volume in fat does whale milk contain?", 
			answers: [{answer:"A. 90%"}, {answer:"B. 30%"}, {answer:"C. 50%"}], 
			correctIndex: 2
		};

var q5 = { 
			question: "Which of the following is not a nickname for the beluga whale?", 
			answers: [{answer:"A. Sea Canary"}, {answer:"B. Squid Hound"}, {answer:"C. Bottle"}], 
			correctIndex: 0
		};

var questionBank=[];
var questionIndex = 0;
var intervalIDArray = [];
var losses = 0;
var wins = 0;
var openTagQTimer = "<div class='col-md-12 questionTimer'>";

function startGame(){
	questionBank= [q1, q2, q3, q4, q5,];
	questionIndex = 0;
    intervalIDArray = [];
	losses = 0;
	wins = 0;
	showQuestion();
}

function startClock(theQuestion){
	for(i=0; i<intervalIDArray.length; i++){
		clearInterval(intervalIDArray[i]); 
	}
	var timerValue = 10;
	var intervalID = setInterval(function(){
		timerValue = decrement(timerValue);
		if(timerValue<=0){isAnswerCorrect(false, theQuestion); clearInterval(intervalID);}
		}, 1000);
	intervalIDArray.push(intervalID);
	$("#qtimer").html(openTagQTimer	+timerValue+" seconds"+"</div>");
	return intervalID;
}

function showQuestion(){
	//
	if(questionIndex < questionBank.length){
		var timerValue = 10;
		var theQuestion = questionBank[questionIndex];
		var myTimerInterval = startClock(theQuestion);

		$("#displayQuestions").html("<div class = 'row questionClass'>Q" + (questionIndex + 1) + ": " + theQuestion.question + "</div>");
		for(j=0; j<theQuestion.answers.length; j++){
			//display the choices
			$("#displayQuestions").append("<div class ='row answerArray' indexSelected='"+ j + "'>"
				                            +theQuestion.answers[j].answer+"</div>");
		}
		$(".answerArray").click( function(){
		//stop the time
		clearInterval(myTimerInterval);

		$('.answerArray').off('click');

		var won = theQuestion.correctIndex == $(this).attr("indexSelected");
		setTimeout(isAnswerCorrect, 700, won, theQuestion);
		});
		questionIndex++;

	} else {
		//all the questions are finished
		clearInterval(myTimerInterval);
	    displayResults();
	}
}

function decrement(inputValue){
	var timer = parseInt(inputValue);
	timer--;
	if(timer<=10){
		$("#qtimer").html(openTagQTimer	+timer+" seconds"+"</div>");
	} 

	return timer;
}


function isAnswerCorrect(won, theQuestion){
	var message = "";
	if(won){
		message = "High Fin! You've Got It!";
		wins++;
	} else {
		message = "Oops That wasn't right!";
		losses++;
	}
	var htmlString = "<div class='displayTheAnswer'> <b> "+message+"</b> <br>"
	     + theQuestion.question + "<br>"+theQuestion.answers[theQuestion.correctIndex].answer
	     +"</div>";
	$("#qtimer").html("");
	$("#displayQuestions").html(htmlString);
	setTimeout(showQuestion,3000);
}

function displayResults(){
	var htmlString = "<div class='displayTheAnswer'> <br>"+
	     "You got<br>"+ wins+" questions correct<br>"+losses+" questions wrong"+"</div>"
	      +"<div class='startOver' onClick='startGame();'>Start Again</div>";
	$("#qtimer").html("");
	$("#displayQuestions").html("");
	$("#displayQuestions").html(htmlString);
}