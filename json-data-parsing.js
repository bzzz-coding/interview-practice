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
    let qHeading, aText;

    // if response id matches input id
    if (res.id === String(id)) {
      let qaPairs = res.answers; // array of objects that has 'question' and 'answer' as keys, questionId and object (either choice:id or text:text pairs) as values
      let qId, cId; // questionId and choiceId

      // Loop through each quesntion/answer pair
      for (let qa of qaPairs) {
        qId = qa.question; // store questionId in qId
        if (qa.answer.choice) { // if the answer has 'choice' as key
          cId = qa.answer.choice // store id in cId
        } else {
          aText = qa.answer.text // store text in aText
        }
        
        for (const q of json.questions) {
          if (q.id == qId) { // if current question.id matches questionId from answer
            qHeading = q.heading; // store question heading in qHeading
            if (q.options && cId) { // if current question has options and there is a choice Id from answer
              // find the option that matches the choiceId and store the text value in aText
              for (const o of q.options) {
                if (o.id === cId) {
                  aText = o.text; 
                }
              }
            }
          }
        }

        // push [question heading, answer text] to response
        response[qId] = [qHeading, aText]
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
    for (const qa of person.answers) { // check each question/answer by this person
      if (qa.question === String(id)) {
        let personId = person.id;
        let answerText;
        if (qa.answer.choice) { // if qa.answer has 'choice'
          // find the option that matches id with id from answer
          for (const option of currentQuestionChoices) {
            if (option.id === qa.answer.choice) {
              answerText = option.text; // assign option text to answerText
            }
          }
        } else {
          answerText = qa.answer.text 
        }
        responses[personId] = [currentQuestionHeading, answerText]
      }
    }
  }
  return responses
}

console.log(getResponsesForQuestion(1))
console.log(getResponsesForQuestion(2))