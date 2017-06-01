// Initialize global variables
var questionCount = 0, correctAnswers = 0, incorrectAnswers = 0, unanswered = 0, countdown = 13;
var correct = false;
// Hide unneccessary divs
$('.game-question').hide();
$('.game-results').hide();

$(document).ready(function() {
    $("#audio").get(0).play();
});

// Trivia object that holds questions, choices and answers
var trivia = {
	"questions" : [
		{
			"question" : "What is the location of the Order of the Phoenix headquarters?",
			"answer" : "Number Twelve, Grimmauld Place",
			"multipleChoice" : [
				"Number Four, Privet Drive", "Shell Cottage", "Number Twelve, Grimmauld Place", "Spinner's End"
			]
		},
		{
			"question" : "How did Harry's parents die according to the Dursleys",
			"answer" : "In a Car Crash",
			"multipleChoice" : [
				"They Were Both Very Sick", "They Were Murdered", "In a Car Crash", "Lost at Sea"
			]
		},
		{
			"question" : "In Harry Potter and the Philosopher's Stone which Gringotts vault was the Philosopher's Stone kept in?",
			"answer" : "713",
			"multipleChoice" : [
				"703", "713", "504", "217"
			]
		}
	]
}

// Button Listener to start the game
$('#start-game').on('click', function(){
		$('.splash-screen').hide();
		questionCount = 0, correctAnswers = 0, incorrectAnswers = 0, unanswered = 0, countdown = 15;
		start();
});

// Function to start game
function start() {
	//Ask First Question
	askQuestion(questionCount);
	//console.log(trivia.questions[questionCount].question);
	counter = setInterval(countDownToNextQuestion,1000);
}

// Function to display questions
function askQuestion(questionCount) {
	$('.game-question').show();
	if( questionCount < 3 ) {
		console.log(trivia.questions[questionCount].question);
		$('#question').html(trivia.questions[questionCount].question);

		//Display multiple choices
		$('#option-1').html(trivia.questions[questionCount].multipleChoice[0]);
		$('#option-2').html(trivia.questions[questionCount].multipleChoice[1]);
		$('#option-3').html(trivia.questions[questionCount].multipleChoice[2]);
		$('#option-4').html(trivia.questions[questionCount].multipleChoice[3]);
	}

	else {
		clearInterval(counter);
		results();
	}
}


// Function to check if answer to question is correct
function checkIfCorrect(guessed) {
	if( guessed === trivia.questions[questionCount].answer) {
		return true;
	}

	else {
		return false;
	}
}

// Check if selected answer matches current question answer
$('.multiple-choice-item').on('click', function(){

	if (checkIfCorrect($(this).html()) === true) {
		correctAnswers++;
		console.log(" # of Correct Answers: " + correctAnswers);
		questionCount++;
		askQuestion(questionCount);
	}
	else if (checkIfCorrect($(this).html()) === false){
		incorrectAnswers++;
		console.log(" # of Incorrect Answers: " + incorrectAnswers);
		questionCount++;
		askQuestion(questionCount);
	}
});


// Function to time each question until next question
function countDownToNextQuestion() {
	countdown--;

	// Show the countdown in the #show-countdown tag.
    $('#time-remaining').html('<h4>Time Remaining: ' + countdown + ' seconds</h4>');

    // Once countdown hits zero...
    if (countdown === 0){

        // stop countdown.
        clearInterval(counter);

        // Alert the user that time is up.
        unanswered++;
        console.log(" # of Unanswered: " + unanswered);
        console.log('Time Up!')

        // Update question count
        questionCount++;

        // If all questions, have been asked, display results
        if ( questionCount == 10 ) {
        	clearInterval(counter);
        	results();
        }

        else {
	       	// go to next question
	        askQuestion(questionCount);

	        // Update counter
	        countdown = 15;

	        // Countdown to 0
	        counter = setInterval(countDownToNextQuestion,1000);
        }



    }
}

// Function to display results at the end of the game
function results () {
	$('.game-question').hide();
	$('.game-results').show();
	$('#correct-answers').html("Correct Answers: " + correctAnswers);
	$('#incorrect-answers').html("Incorrect Answers: " + incorrectAnswers);
	$('#unanswered').html("Unanswered: " + unanswered);
  // var wrongAnswers = incorrectAnswers + unanswered;
  // var scorePercentage = Math.round((wrongAnswers / 3) * 100);
	// $('#score').html("Score: " + scorePercentage + "%");

	//Debugging
	console.log("Correct Answers: " + correctAnswers);
	console.log("Incorrect Answers: " + incorrectAnswers);
	console.log("Unanswered: " + unanswered);

}
