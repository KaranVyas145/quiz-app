const questionel = document.querySelector(".question");
const optionsel = document.querySelector(".options");
const quizbtn = document.querySelector(".quizBtn");
let scoreel=document.querySelector(".score")
let index = 0;
let score=0
quizbtn.addEventListener("click", quiz);

// function quiz() {
//   fetch(
//     "https://quizapi.io/api/v1/questions?apiKey=P78OZ7PoZ0rpiqkz4ZglxxDWPtSe2I0OUtRUjl8W&difficulty=Medium&limit=10"
//   )
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       if (index < 10) {
//         console.log(data[0].question);
//         questionel.innerText = data[index].question;
//         optionsel.innerHTML = `
//     <li>${data[index].answers.answer_a}</li>
//     <li>${data[index].answers.answer_b}</li>
//     <li>${data[index].answers.answer_c}</li>
//     <li>${data[index].answers.answer_d}</li>
//     `;
//         index++;
//       }
//       else{
//         questionel.innerText = `GAME OVER`;
//       }
//     });
// }

function quiz() {
  const data = null;

  const xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function () {
    const load = document.createElement("div");
    load.classList.add("load");
    if (this.readyState < 4) {
      questionel.innerText = `loading`;
    } else {
      let data = JSON.parse(this.responseText);
      console.log(data);
      if (index < 10) {
        console.log(data[0].question);
        questionel.innerText = data[index].question;
        optionsel.innerHTML = `
    <li class="answers">${data[index].answers.answer_a}</li>
    <li class="answers">${data[index].answers.answer_b}</li>
    <li class="answers">${data[index].answers.answer_c}</li>
    <li class="answers">${data[index].answers.answer_d}</li>
    `;
   
        

        const options= document.querySelectorAll('.answers');
        options.forEach(element=>{
            element.addEventListener('click',(e)=>{
                console.log(e.target.innerHTML);
                let correctAnswer= data[index].correct_answer;
                console.log(correctAnswer);
                console.log(data[index].answers[correctAnswer]);

                if(e.target.innerHTML === data[index].answers[correctAnswer]){
                    console.log("right");
                    optionsel.innerHTML= `<div class="correct">CORRECT ANSWER</div>`;
                    score++;
                    index++;
                }
                else{
                    optionsel.innerHTML=  `<div class="wrong">WRONG ANSWER
                    <br>
                    The correct answer is ${ data[index].answers[correctAnswer]};
                    </div>`;
                    console.log("wrong");
                    index++;
                }
                scoreel.innerText=`${score}`;
            })
        })
      
      
    } else {
        questionel.innerText = `GAME OVER`;
        optionsel.innerHTML= `SCORE: ${score}`
      }
    }
  });

  xhr.open(
    "GET",
    "https://quizapi.io/api/v1/questions?apiKey=P78OZ7PoZ0rpiqkz4ZglxxDWPtSe2I0OUtRUjl8W&category=sql&limit=10"
  );

  xhr.send(data);
}

// https://quizapi.io/api/v1/questions?apiKey=P78OZ7PoZ0rpiqkz4ZglxxDWPtSe2I0OUtRUjl8W&category=sql&limit=10