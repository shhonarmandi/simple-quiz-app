const correctAnswers = { q0: 0, q1: 1 };
let userAnswers = {};

const answersContainers = document.querySelectorAll('.answer');
const answersInputs = document.querySelectorAll('input[type="radio"]');

answersContainers.forEach((answerContainer) => {
	answerContainer.addEventListener('click', handleClickOnAnswerContainer);
});

answersInputs.forEach((answerInput) => {
	answerInput.addEventListener('click', handleClickOnAnswerInput);
});

function handleClickOnAnswerContainer(event) {
	if (event.target !== event.currentTarget) return;

	const input = event.target.childNodes[1];
	input.checked = true;
	handleSelectedAnswer(input);
}

function handleClickOnAnswerInput(event) {
	const input = event.target;
	handleSelectedAnswer(input);
}

function handleSelectedAnswer(input) {
	const complexId = input.id;
	const answerId = getAnswerId(complexId);
	const questionId = getQuestionID(complexId);

	updateUserAnswersArray(questionId, answerId);
}

function getQuestionID(id) {
	return id.split('-')[0];
}

function getAnswerId(id) {
	return Number(id.split('-')[1]);
}

function updateUserAnswersArray(questionId, answerId) {
	userAnswers = {
		...userAnswers,
		[questionId]: answerId,
	};
}

function submitForm(event) {
	event.preventDefault();

	disableSubmitButton();
	disableAllAnswersInputs();
	compareCorrectAnswersWithUserAnswers(userAnswers);
}

function disableSubmitButton() {
	const submitButton = document.getElementById('submit');
	submitButton.disabled = true;
}

function disableAllAnswersInputs() {
	answersContainers.forEach((answerContainer) => {
		answerContainer.childNodes[1].disabled = true;
		answerContainer.removeEventListener('click', handleClickOnAnswerContainer);
	});
}

function compareCorrectAnswersWithUserAnswers(userAnswers) {
	for (const question in correctAnswers) {
		const userAnswerValue = userAnswers[question];
		const correctAnswerValue = correctAnswers[question];

		const userAnswerId = `${question}-${userAnswerValue}`;
		const correctAnswerId = `${question}-${correctAnswerValue}`;

		if (correctAnswerValue === userAnswerValue) {
			highlightUserAnswerOnCheckingTheResult(userAnswerId, true);
		} else {
			highlightUserAnswerOnCheckingTheResult(userAnswerId, false);
			highlightUserAnswerOnCheckingTheResult(correctAnswerId, true);
		}
	}
}

function highlightUserAnswerOnCheckingTheResult(id, flag) {
	const answerInput = document.getElementById(id);
	answerInput.parentElement.classList.toggle(flag ? 'answer--correct' : 'answer--wrong');
}
