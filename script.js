let points = 0;
let currentQuestionIndex = 0;
let questions = [];
let selectedAnswer = "";
let correctAnswer = "";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

async function getData(categoryId) {
  try {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=easy&type=multiple`
    );
    const data = await response.json();
    if (!data.results || data.results.length === 0) {
      alert("No questions found. Please try another topic.");
      return;
    }
    questions = data.results;
    points = 0;
    currentQuestionIndex = 0;
    selectedAnswer = "";
    showQuestion();
  } catch (err) {
    alert("Failed to load quiz. Please check your internet connection.");
  }
}

function showQuestion() {
  const q = questions[currentQuestionIndex];
  correctAnswer = q.correct_answer;
  let options = [...q.incorrect_answers, q.correct_answer];
  options = shuffleArray(options);

  document.getElementById("question").innerHTML = q.question;
  document.querySelector(".selectTopicMsg").innerHTML = `Question: ${
    currentQuestionIndex + 1
  }/10`;

  const ids = ["a", "b", "c", "d"];
  ids.forEach((id, index) => {
    const btn = document.getElementById(id);
    btn.innerHTML = `<p>${String.fromCharCode(65 + index)}:</p><p>${
      options[index]
    }</p>`;
    btn.style.backgroundColor = "var(--backgroundColor-light)";
    btn.onclick = () => {
      selectedAnswer = options[index];
      highlightSelected(id);
    };
  });

  document.getElementById("submit").style.display = "block";
}

function highlightSelected(selectedId) {
  const ids = ["a", "b", "c", "d"];
  ids.forEach((id) => {
    const box = document.getElementById(id);
    box.style.backgroundColor = "var(--backgroundColor-light)";
  });
  document.getElementById(selectedId).style.backgroundColor = "green";
}

function showScore() {
  document.getElementById(
    "question"
  ).innerHTML = `You scored ${points} out of 10!`;
  document.querySelector(
    ".selectTopicMsg"
  ).innerHTML = `Wanna play again? Pick a topic above.`;

  document.querySelector(".display").style.display = "none";

  document.getElementById("question").style.textAlign = "center";
  document.querySelector(".selectTopicMsg").style.textAlign = "center";
  document.querySelector(".heading").style.rowGap = "1em";

  let createdbtn = document.createElement("button");
  createdbtn.textContent = "Play again";
  document.querySelector(".heading").append(createdbtn);

  createdbtn.classList.add("createdSubmitBtn");

  createdbtn.onclick = () => {
    location.reload();
  };
}

document.getElementById("submit").addEventListener("click", () => {
  if (!selectedAnswer) return;

  if (selectedAnswer === correctAnswer) {
    points++;
  }

  currentQuestionIndex++;
  selectedAnswer = "";

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("nature").addEventListener("click", () => {
    getData(17);
  });
  document.getElementById("computer").addEventListener("click", () => {
    getData(18);
  });
  document.getElementById("maths").addEventListener("click", () => {
    getData(19);
  });
  document.getElementById("gadgets").addEventListener("click", () => {
    getData(30);
  });
});
