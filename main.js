// Variables
const questionel = document.querySelector(".question");
const optionsel = document.querySelector(".options");
const nextbtn = document.querySelector(".quizBtn");
const scoreel = document.querySelector(".score");
const timerel = document.querySelector(".timer");
const startbtn = document.querySelector(".startbtn");
const bg = document.querySelector("body");
startbtn.addEventListener("click", () => {
  document.querySelector(".intro").classList.add("intro-fade");
  quiz();
  index++;
});
let index = 0;
let score = 0;
let timer = 60;
// let timeInterval;
const intervalTime = 1000;
let myTimer;
let data;
let correctAnswer;

// Event Listeners
nextbtn.addEventListener("click", () => {
  quiz();
  index++;
});

// Ajax Request
const xhr = new XMLHttpRequest();
xhr.open(
  "GET",
  "https://quizapi.io/api/v1/questions?apiKey=P78OZ7PoZ0rpiqkz4ZglxxDWPtSe2I0OUtRUjl8W&category=linux&limit=10"
);

xhr.send();
xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    data = JSON.parse(xhr.responseText);
    quiz();
  }
  else{
    data='';
    optionsel.innerHTML="loading";
  }
});

// The main quiz function
function quiz() {
  if (bg.classList.contains("bg-wrong")) {
    bg.classList.remove("bg-wrong");
  }
  if (bg.classList.contains("bg-correct")) {
    bg.classList.remove("bg-correct");
  }
  nextbtn.innerText = "Next Question";
  clearInterval(myTimer);
  // resetting the timer on new question
  timer = 60;

  // setinterval to control the timer
  myTimer = setInterval(intervalFuntion, intervalTime);

  if (index < 10) {
    questionel.innerText = `${index + 1}. ${data[index].question}`;

    let correctOptions = data[index].correct_answers;

    let correctOptionsArray = [
      correctOptions.answer_a_correct,
      correctOptions.answer_b_correct,
      correctOptions.answer_c_correct,
      correctOptions.answer_d_correct,
    ];

    correctOptionsArray.forEach((element, i) => {
      if (element === "true") {
        switch (i) {
          case 0:
            correctAnswer = data[index].answers.answer_a;
            break;
          case 1:
            correctAnswer = data[index].answers.answer_b;
            break;
          case 2:
            correctAnswer = data[index].answers.answer_c;
            break;
          case 3:
            correctAnswer = data[index].answers.answer_d;
            break;
        }
      }
    });

    let optionsArray = [
      data[index].answers.answer_a,
      data[index].answers.answer_b,
      data[index].answers.answer_c,
      data[index].answers.answer_d,
    ];

    optionsel.innerHTML=``;

    optionsArray.forEach(element => {
      if(element!=null){
        optionsel.innerHTML =optionsel.innerHTML+ ` <li class="answers">${element}</li>`;
      }
    });
    

    const options = document.querySelectorAll(".answers");
    // creating event listener for each option
    options.forEach((element) => {
      element.addEventListener("click", (e) => {

        if (e.target.innerHTML === correctAnswer) {
          optionsel.innerHTML = `<div class="correct">CORRECT ANSWER</div>`;
          score++;
          clearInterval(myTimer);
          bg.classList.add("bg-correct");

        } else {
          optionsel.innerHTML = `<div class="wrong">WRONG ANSWER
                    <br>
                    The correct answer is
                      ${correctAnswer}
                    </div>`;
          bg.classList.add("bg-wrong");
          clearInterval(myTimer);

        }

        scoreel.innerText = `Score : ${score}`;
      });
    });
  } else {
    questionel.innerHTML=``;
    optionsel.innerHTML = `
    <div class="final-score">FINAL SCORE : ${score}</div>
    `;
    scoreel.setAttribute("style","visibility:hidden");
    timerel.setAttribute("style","visibility:hidden");
    clearInterval(myTimer);
    nextbtn.innerText = "Restart";
    nextbtn.addEventListener("click", () => {
      window.location.reload();
    });
  }
}

function timeOut() {
  optionsel.innerHTML = `
  <div class="time-out">TIME OUT</div>
  `;
  bg.classList.add('bg-wrong')
}


function intervalFuntion() {
  if (timer > 0) {
    timer--;
    if (timer === 0) {
      timeOut();
      clearInterval(myTimer);
    }
    timerel.innerText = `Time Left : ${timer}`;
  } else {
    timer = 0;
  }
}
