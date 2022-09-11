const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const gameScreen = document.getElementById('content-container');
const questionSection = document.getElementById('question');
const answerButtons = document.getElementById('answer-btns');

let currentIndex = -1;

startButton.addEventListener('click' , startGame);

nextButton.addEventListener('click' , getNextQuestion);

function startGame()
{
    startButton.classList.add('hide');
    gameScreen.classList.remove('hide');
    sortedArray = questionArray.sort( () => 0.5-Math.random() );
    getNextQuestion();
}

function getNextQuestion()
{
    removeAnswerBtns();
    displayNextQuestion(sortedArray[++currentIndex]);
}

/*
let currentIndex = -1;

startButton.addEventListener('click' , startGame);

nextButton.addEventListener('click' ,  getNextQuestion);

function startGame()
{
    startButton.classList.add('hide');
    gameScreen.classList.remove('hide');
    sortedArray = questionArray.sort( () => 0.5-Math.random() );
    getNextQuestion();
}

function getNextQuestion()
{
    removeAnswerBtns();
    displayNextQuestion(sortedArray[++currentIndex]);
}
*/ 

function displayNextQuestion(question)
{
    questionSection.innerText = question.question;
    question.answer.forEach(element => {
        const button = document.createElement('button');
        button.innerText = element.text;
        button.classList.add('btn');
        if(element.op)
        {
            button.dataset.correct = element.op;
            //else correct option button will also turn red after click
        }
        answerButtons.appendChild(button);
        button.addEventListener('click' , selectAnswer);
    });
}

function removeAnswerBtns()
{
    resetPageColor(document.body);
    nextButton.classList.add('hide');
    while(answerButtons.firstChild)
    {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e)
{
    const iClicked = e.target; //the button we clicked
    const possibility = iClicked.dataset.correct;
    console.log(possibility);
    //if right or wrong , change BGcolor of body accordingly
    colorOnClick(document.body , possibility);
    //if right or wrong , change BGcolor of buttons accordingly
    Array.from(answerButtons.children).forEach(button => {
        colorOnClick(button , button.dataset.correct);
    });
    if(sortedArray.length > currentIndex + 1)
    {
        nextButton.classList.remove('hide');
    }
    else
    {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
        currentIndex = -1;
    }
}

function colorOnClick(partOfpage , possibility)
{
    resetPageColor(partOfpage);
    if(possibility)
    {
        partOfpage.classList.add('correct');
    }
    else
    {
        partOfpage.classList.add('wrong');
    }
}

function resetPageColor(partOfpage)
{
    partOfpage.classList.remove('correct');
    partOfpage.classList.remove('wrong');
}

const questionArray = [
    {
        question : "Number of zeroes in 1 Million :",
        answer : [
            {text : 5 , op : false},
            {text : 6 , op : true},
            {text : 7 , op : false},
            {text : 8 , op : false}
        ]
    },
    {
        question : "Evaluate : [2*2*2*2*2]",
        answer : [
            {text : 22 , op : false},
            {text : 44 , op : false},
            {text : 32 , op : true},
            {text : 25 , op : false}
        ]
    },
    {
        question : 'What does (2%2) returns in a C++ program :',
        answer : [
            {text : 0 , op : true},
            {text : 1 , op : false}
        ]
    },
    {
        question : 'Did Satoshi Nakamoto introduced Cryptocurrency concept ?',
        answer : [
            {text : "Yes" , op : true},
            {text : "No" , op : false}
        ]
    },
    {
        question : 'What does the fear of heights called ?',
        answer : [
            {text : "Thanatophobia" , op : false},
            {text : "Noctiphobia" , op : false},
            {text : "Aerophobia" , op : false},
            {text : "Acrophobia" , op : true}
        ]
    }
]