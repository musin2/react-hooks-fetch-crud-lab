import React from "react";
import {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions,setQuestions] = useState([])

  useEffect(()=> {
    fetch("http://localhost:4000/questions")
      .then((res) => {
        if(!res.ok){ throw new Error("Failed to GET data");}
      else {return res.json()}       
      })
      .then((questionsData) => {setQuestions(questionsData)} )
      .catch(err => console.error("Reason for fail "+ err));
  }, [])
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) =>{
          return (
            <QuestionItem
              key={question.id}
              question={question}
              setQuestions={setQuestions}
            />
          );
        })}
      </ul>
    </section>
  );
}

export default QuestionList;
