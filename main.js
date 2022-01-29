const questionel = document.querySelector(".question");
const optionsel = document.querySelector(".options");
const quizbtn = document.querySelector(".quizBtn");
let index = 0;
quizbtn.addEventListener("click", quiz);

function quiz() {
  fetch(
    "https://quizapi.io/api/v1/questions?apiKey=P78OZ7PoZ0rpiqkz4ZglxxDWPtSe2I0OUtRUjl8W&difficulty=Medium&limit=10"
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (index < 10) {
        console.log(data[0].question);
        questionel.innerText = data[index].question;
        optionsel.innerHTML = `
    <li>${data[index].answers.answer_a}</li>
    <li>${data[index].answers.answer_b}</li>
    <li>${data[index].answers.answer_c}</li>
    <li>${data[index].answers.answer_d}</li>
    `;
        index++;
      }
      else{
        questionel.innerText = `GAME OVER`;
      }
    });
}
