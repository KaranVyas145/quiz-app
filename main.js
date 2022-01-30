// Variables
const questionel = document.querySelector(".question");
const optionsel = document.querySelector(".options");
const nextbtn = document.querySelector(".quizBtn");
const scoreel = document.querySelector(".score");
const timerel = document.querySelector(".timer");
const startbtn = document.querySelector(".start");
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
  "https://quizapi.io/api/v1/questions?apiKey=P78OZ7PoZ0rpiqkz4ZglxxDWPtSe2I0OUtRUjl8W&category=sql&limit=10&tags=MySQL"
);

xhr.send();
xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    data = JSON.parse(xhr.responseText);
    console.log(data);
  }
});

// The main quiz function
function quiz() {
  clearInterval(myTimer);
  if (xhr.readyState < 4) {
    // loader
    questionel.innerText = `loading`;
  } else {
    // resetting the timer on new question
    timer = 60;

    // setinterval to control the timer
    myTimer = setInterval(intervalFuntion, intervalTime);

    // data = JSON.parse(xhr.responseText);
    console.log(data);
    if (index < 10) {
      // console.log(data[0].question);
      questionel.innerText = `${index + 1} ${data[index].question}`;

      let correctOptions = data[index].correct_answers;

      let correctOptionsArray = [
        correctOptions.answer_a_correct,
        correctOptions.answer_b_correct,
        correctOptions.answer_c_correct,
        correctOptions.answer_d_correct,
      ];

      // console.log(correctOptionsArray);

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

      optionsel.innerHTML = `
    <li class="answers">${data[index].answers.answer_a}</li>
    <li class="answers">${data[index].answers.answer_b}</li>
    <li class="answers">${data[index].answers.answer_c}</li>
    <li class="answers">${data[index].answers.answer_d}</li>
    `;
      // creating and inserting options
      const options = document.querySelectorAll(".answers");
      console.log(correctAnswer);
      // creating event listener for each option
      options.forEach((element) => {
        element.addEventListener("click", (e) => {
          console.log(e.target.innerHTML);
          // let correctAnswer = data[index].correct_answer;
          // console.log(correctAnswer);
          // console.log(data[index].answers[correctAnswer]);
          // data[index - 1].answers[correctAnswer]

          if (e.target.innerHTML === correctAnswer) {
            console.log("right");
            optionsel.innerHTML = `<div class="correct">CORRECT ANSWER</div>`;
            score++;
            clearInterval(myTimer);
            // index++;
          } else {
            optionsel.innerHTML = `<div class="wrong">WRONG ANSWER
                    <br>
                    The correct answer is
                      ${correctAnswer};
                    </div>`;
            console.log("wrong");
            clearInterval(myTimer);
            // index++;
          }
          scoreel.innerText = `Score : ${score}`;
          // timerel.innerText = `${timer}`;
        });
      });
    } else {
      questionel.innerText = `GAME OVER`;
      optionsel.innerHTML = `SCORE: ${score}`;
      clearInterval(myTimer);
      nextbtn.addEventListener("click", () => {
        window.location.reload();
      });
    }
  }
}

function timeOut() {
  optionsel.innerHTML = "TIME OUT";
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
