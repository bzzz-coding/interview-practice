const json = {
  "id" : '1',
  "questions": [
    {
      "id": '1',
      "heading": "How is your day?",
      "options": [{"id": '1', "text": "good"}, {"id": '2', "text": "ok"}, {"id": '3', "text": "not great"}]
    },
    {
      "id": '2',
      "heading": "What's your favorite food?"
    }
  ],
  "responses": [
    {
      "id": '1',
      "answers": [{"question": '1', "answer": {"choice": "1"}}, {"question": '2', "answer": {"text": "ice cream"}}]
    },
    {
      "id": '2',
      "answers": [{"question": '1', "answer": {"choice": "3"}}, {"question": '2', "answer": {"text": "pizza"}}]
    },
    {
      "id": '3',
      "answers": [{"question": '1', "answer": {"choice": "3"}}, {"question": '2', "answer": {"text": ""}}]
    },
    {
      "id": '4',
      "answers": [{"question": '2', "answer": {"text": "ramen"}}]
    }
  ]
}

// How to restructure the json file for easy data parsing?
// Change arrays into objects of objects with id as properties
// Store questions and answers in two objects separates

const questionsObj = json.questions.reduce((obj, currentQuestion) => {
  obj[currentQuestion.id] = {
    heading: currentQuestion.heading,
  };
  if (currentQuestion.options) {
    let optionsObj = currentQuestion.options.reduce((obj, currentOption) => {
      obj[currentOption.id] = currentOption.text;
      return obj
    }, {});
    // console.log(obj);
    obj[currentQuestion.id]['options'] = optionsObj;
  }
  return obj
}, {})

// console.log(questionsObj[1]['heading']);
// console.log(questionsObj[1]['options'][2]);
// console.log(questionsObj[2]);

const responsesObj = json.responses.reduce((obj, currentResponse) => {
  let answersObj = currentResponse.answers.reduce((obj, currentAnswer) => {
    // set question id as property, and its corresponding answer as value
    
    // if answer has a text property, store answer.text as value for question id
    if (currentAnswer.answer.text) {
      obj[currentAnswer.question] = currentAnswer.answer.text
    } else if (currentAnswer.answer.choice) { 
      // if answer has a choice property, look up the corresponding option text in questionsObj and store as value for question id
      obj[currentAnswer.question] = questionsObj[currentAnswer.question]['options'][currentAnswer.answer.choice] // questionsObj[//questionId][options][optionId]
    }
  
    return obj
  }, {});
  // set currentResponse id as property, and the answersObj as value
  obj[currentResponse.id] = answersObj;
  return obj
}, {});

console.log(`Response 1: Question 1: ${questionsObj[1].heading}, Answer: ${responsesObj[1][1]}`);
console.log(`Response 1: Question 2: ${questionsObj[2].heading}, Answer: ${responsesObj[1][2]}`);
console.log(`Response 2: Question 1: ${questionsObj[1].heading}, Answer: ${responsesObj[2][1]}`);
console.log(`Response 2: Question 2: ${questionsObj[2].heading}, Answer: ${responsesObj[2][2]}`);

