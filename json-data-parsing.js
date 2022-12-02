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
  responses: [
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
