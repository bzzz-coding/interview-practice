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


// id of response
function getQuestionAndResponse(id) {
  let response = []
  for (const res of json.responses) {
    let qHeading, aText;
    if (res.id === String(id)) {
      let qaPairs = res.answers;
      let qId, cId;
      for (let qa of qaPairs) {
        qId = qa.question;
        if (qa.answer.choice) {
          cId = qa.answer.choice
        } else {
          aText = qa.answer.text
        }
        
        for (const q of json.questions) {
          if (q.id == qId) {
            qHeading = q.heading;
            if (q.options && cId) {
              for (const o of q.options) {
                if (o.id === cId) {
                  aText = o.text;
                }
              }
            }
          }

        }
        response.push([qHeading, aText])
      }
      
    }
    
  }
  
  return response
}

console.log(getQuestionAndResponse(1))
console.log(getQuestionAndResponse(2))
console.log(getQuestionAndResponse(3))
console.log(getQuestionAndResponse(4))
