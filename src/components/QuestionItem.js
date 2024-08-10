import React from "react";

function QuestionItem({ question, setQuestions }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDelete() {
    console.log(id);
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
     // headers: { "Content-type": "application/json" },
    })
      .then((res) => {
        res.json();
         //window.location.reload();
      })
      .then((data) => {
        setQuestions((x) => (x.filter((currQuestions) => {return currQuestions.id !== id})));
      });
  }

  function handleCorrectChange(event) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ correctIndex: event.target.value }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }
  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleCorrectChange} defaultValue={correctIndex}>
          {options}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
