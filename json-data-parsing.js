// parse json data 
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



// Pass in id of response, return an object with questionId: [question heading, answer text] pairs from the entry
function getQuestionAndResponse(id) {
  let response = {}
  for (const res of json.responses) { // Loop through all responses
    // [questionHeading, answerText] will be pushed to response for each entry
    let questionHeading, answerText;

    // if response id matches input id
    if (res.id === String(id)) {
      let questionAnswerPairs = res.answers; // array of objects that has 'question' and 'answer' as keys, questionId and object (either choice:id or text:text pairs) as values
      let questionId, choiceId; // questionId and choiceId

      // Loop through each quesntion/answer pair
      for (let questionAnswer of questionAnswerPairs) {
        questionId = questionAnswer.question; // store questionId in questionId
        if (questionAnswer.answer.choice) { // if the answer has 'choice' as key
          choiceId = questionAnswer.answer.choice // store id in choiceId
        } else {
          answerText = questionAnswer.answer.text // store text in answerText
        }
        
        for (const question of json.questions) {
          if (question.id == questionId) { // if current question.id matches questionId from answer
            questionHeading = question.heading; // store question heading in questionHeading
            if (question.options && choiceId) { // if current question has options and there is a choice Id from answer
              // find the option that matches the choiceId and store the text value in answerText
              for (const option of question.options) {
                if (option.id === choiceId) {
                  answerText = option.text; 
                }
              }
            }
          }
        }

        // push [question heading, answer text] to response
        response[questionId] = [questionHeading, answerText]
      }
    }
  }
  
  return response
}

console.log(getQuestionAndResponse(1))
console.log(getQuestionAndResponse(2))
console.log(getQuestionAndResponse(3))
console.log(getQuestionAndResponse(4))


// what if I want to get all entries for a question? 
// return an obj with person Id being key and [questionHeading, answerText] and value
function getResponsesForQuestion(id) {
  let currentQuestionHeading, currentQuestionChoices;
  for (const q of json.questions) {
    if (q.id === String(id)) {
      currentQuestionHeading = q.heading;
      if (q.options) {
        currentQuestionChoices = q.options; // [{"id": '1', "text": "good"}, {"id": '2', "text": "ok"}, {"id": '3', "text": "not great"}]
      }
    }
  }
  let responses = {};
  
  // Loop through all responses(each person) from json.responses
  for (const person of json.responses) {
    for (const questionAnswer of person.answers) { // check each question/answer by this person
      if (questionAnswer.question === String(id)) {
        let personId = person.id;
        let answerText;
        if (questionAnswer.answer.choice) { // if questionAnswer.answer has 'choice'
          // find the option that matches id with id from answer
          for (const option of currentQuestionChoices) {
            if (option.id === questionAnswer.answer.choice) {
              answerText = option.text; // assign option text to answerText
            }
          }
        } else {
          answerText = questionAnswer.answer.text 
        }
        responses[personId] = [currentQuestionHeading, answerText]
      }
    }
  }
  return responses
}

console.log(getResponsesForQuestion(1))
console.log(getResponsesForQuestion(2))