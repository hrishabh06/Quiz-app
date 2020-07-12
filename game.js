const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {}
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
{
    question : "In which country was COVID-19 first reported?",
    choice1 : "<USA>",
    choice2 : "<India>",
    choice3 : "<China>",
    choice4 : "<Italy>",
    answer: 3
},
{
    question : "What are the most common symptoms of COVID-19 ?",
    choice1 : "<Fever>",
    choice2 : "<Dry cough>",
    choice3 : "<Tiredness>",
    choice4 : "<All the above>",
    answer: 4
},
{
    question : "The Lai Haraoba festival is observed by which state ?",
    choice1 : "<Sikkim>",
    choice2 : "<Tripura>",
    choice3 : "<Mizoram>",
    choice4 : "<Nagaland>",
    answer: 2
},
{
    question : "Which city hosted the Indian Science Congress in 2020",
    choice1 : "<Chennai>",
    choice2 : "<Kolkata>",
    choice3 : "<Bengaluru>",
    choice4 : "<Mumbai>",
    answer: 3
},
{
    question : "Which port is renamed as Shyama Prasad Mukherjee Port", 
    choice1 : "<Kolkata Port>",
    choice2 : "<Chennai Port>",
    choice3 : "<Paradip Port>",
    choice4 : "<Visakhapatnam Port>",
    answer: 1
},
{
    question : ".......... is the first woman to head a public sector bank",
    choice1 : "< Arundhati Bhattacharya>",
    choice2 : "<Shikha Sharma>",
    choice3 : "<Chanda Kochar>",
    choice4 : "< Usha Ananthasubramanyan>",
    answer: 1
},
{
    question : " World Tourism Day is celebrated on-",
    choice1 : "< September 29>",
    choice2 : "< September 26>",
    choice3 : "< September 27>",
    choice4 : "< September 28>",
    answer: 3
},
{
    question : " The 'Dalong Village' covering an area of 11.35 sq. km. has recently (May 2017) been declared as Biodiversity Heritage Site under Section 37(1) of Biological Diversity Act, 2002. The village is situated in the Indian State of -",
    choice1 : "<Madhya Pradesh>",
    choice2 : "<Manipur>",
    choice3 : "<Mizoram>",
    choice4 : "<Maharashtra>",
    answer: 1
},
{
    question : "Three seconds are related to which sport",
    choice1 : "<Boxing>",
    choice2 : "<Basketball>",
    choice3 : "<Billiards>",
    choice4 : "<Cricket>",
    answer: 2
},
{
    question : "The National Game of Japan is",
    choice1 : "<Tennis>",
    choice2 : "<Baseball>",
    choice3 : "<Judo>",
    choice4 : "<Ice Hockey>",
    answer: 3
},
{
    question : "To mark the 100th year of Indian participation in the Olympic Games the Indian Olympic Association adopted a new visual identity. Who is the President of Indian Olympic Association?",
    choice1 : "<Chandramauli Kumar Prasad>",
    choice2 : "<Narinder Dhruv Batra>",
    choice3 : "<Ashish Kumar Chauhan>",
    choice4 : "<Vijay Keshav Gokhale>",
    answer: 2
},
{
    question : "Name of the first Atomic Submarine of India?",
    choice1 : "<I.N.S Chakra>",
    choice2 : "<R.N. Shukla>",
    choice3 : "<V.R. Gill>",
    choice4 : "<D.B. Mahawar>",
    answer: 1
},
{
    question : "Where is India's First nuclear centre",
    choice1 : "<Tarapur>",
    choice2 : "<Jaipur>",
    choice3 : "<Kanpur>",
    choice4 : "<Raipur>",
    answer: 1
},
{
    question : "Blu-Ray technology is developed by:",
    choice1 : "<IBM>",
    choice2 : "<Compaq>",
    choice3 : "<Sony>",
    choice4 : "<Apple>",
    answer: 3
},
{
    question : "Bootstrap program is a program that ________",
    choice1 : "<terminates the working of computer>",
    choice2 : "<starts the computer working>",
    choice3 : "<meddle part of computer>",
    choice4 : "<both (1) and (2)>",
    answer: 2
},
{
    question : "Name of the first election commissioner of India?",
    choice1 : "<Sukumar Sen>",
    choice2 : "<R.N. Shukla>",
    choice3 : "<V.R. Gill>",
    choice4 : "<D.B. Mahawar>",
    answer: 1
},
{
    question : "Which of the following team has not won a single title of ICC Women's T20 World Cup so far?",
    choice1 : "<England>",
    choice2 : "<Australia>",
    choice3 : "<West Indies>",
    choice4 : "<Pakistan>",
    answer: 4
},
{
    question : "Which Indian institution developed an intensive care unit (ICU) grade ventilator under the name of ‘Project Praana’?",
    choice1 : "<AIIMS>",
    choice2 : "<IIT-Delhi>",
    choice3 : "<IIT-Guwahati>",
    choice4 : "<Indian Institute of Science (IISc)>",
    answer: 4
},
{
    question : "Who among the following invented the cinematograph?",
    choice1 : "<Lumiere Brothers>",
    choice2 : "<Mani Sethna>",
    choice3 : "<Dada Saheb Phalke>",
    choice4 : "<Dhirendra Nath Ganguly>",
    answer: 1
},
{
    question : "Which of the following regional cinema referred to as Kollywood?",
    choice1 : "<Punjabi Cinema>",
    choice2 : "<Tamil Cinema>",
    choice3 : "<Marathi Cinema>",
    choice4 : "<Malayalam Cinema>",
    answer: 2
},

]

//CONSTANTS
const CORRECT_BONUS = 10;
const INCORRECT_BONUS = -5;
const MAX_QUESTION = 20;


startGame = () => {
    questionCounter = 0;
    score=0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestions();
};

getNewQuestions = () => {

    if(availableQuestions.length == 0 || questionCounter >= MAX_QUESTION){
        localStorage.setItem("mostRecentScore",score);
        //go to the end page
        return window.location.assign("/end.html");
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTION}`;
    //update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTION) * 100}%`;
    

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    console.log(availableQuestions);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        
        if(classToApply === "correct"){
            incrementScore(CORRECT_BONUS);
        }
        else{
            incrementScore(INCORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestions();
        }, 1000);        
    });
});

incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
} 

startGame();