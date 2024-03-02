import React, { useEffect, useState } from "react";
//import classNames from "classnames";
import BtnComponent from "./BtnComponenet";

export default function Quiz() {
  const [datas, setDatas] = useState([])
  const [loading, setloading] = useState(true)
  const [incorrect, setIncorrect] = useState(-20)
  const [checkAnswer, setCheckAnswer] = useState(true)

  const [array, setArray] = useState([])
  const [selectedAnswers, setSelectedAnswers] = useState([])
  const [checkAnswerBtn, setCheckAnswerBtn] = useState(0)




  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://opentdb.com/api.php?amount=5&category=14&difficulty=easy&type=multiple");
        const result = await response.json();
        setDatas(result.results.map(d => {
          return ({
            question: d.question,
            held: false,
            checkCorrectness: false,
            answers: [
              { answer: d.correct_answer, held: false },
              { answer: d.incorrect_answers[0], held: false },
              { answer: d.incorrect_answers[1], held: false },
              { answer: d.incorrect_answers[2], held: false }
            ],
            correctAnswer: d.correct_answer
          })
        }

        ));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setloading(false);
      }
    };
    fetchData()

  }, [])




  /*useEffect(() => {
    setDatas(dataS=>{

      const newDatas = dataS.map(data=>{
        const newArray = data.answers

          for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            // Swap elements using parentheses
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
         };
         return {...data, answers: newArray}
        })
        return newDatas
      })  
  }, [])*/
  useEffect(() => {
    setDatas(dataS => {
      const newDataS = dataS.map(data => {
        const newArray = [...data.answers];

        for (let i = newArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          // Swap elements using parentheses
          [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }

        return { ...data, answers: newArray };
      });

      return newDataS;
    });
  }, [loading]);





  const checkAnswers = () => {
    datas.map(data => {
      data.answers.map(answer => {
        if (data.held && answer.held) {
          selectedAnswers.push(answer.answer)
        }

        return answer
      })
      return data
    })
    datas.map(data => {
      data.answers.map(answer => {
        if ((!data.held && answer.held) || (!data.held && answer.held) || (!data.held && !answer.held)) {
          const newSeletedAnswers = selectedAnswers.filter(item => item === answer.answer)

          setSelectedAnswers(newSeletedAnswers)
        }

        return answer
      })
      return data
    })
    if (selectedAnswers.length > 4) {
      setCheckAnswer(false)
      for (let i = 0; i < selectedAnswers.length; i++) {
        datas.map(data => {
          return data.correctAnswer === selectedAnswers[i] ?
            {
              ...data, checkCorrectness: true
            } : data;
        })
      }
      for (let i = 0; i < selectedAnswers.length; i++) {
        datas.map(data => {
          data.answers.map(d => {
            if (data.correctAnswer !== selectedAnswers[i] && (d.held)) {
              setIncorrect(notCorrect => notCorrect + 1)
            }
            return d
          })

          return data
        })


      }


    }
    setCheckAnswerBtn(setBtn => setBtn + 1)

  }
  /*const checkIncorrectFn = notcorrect=>{
    setIncorrect(notcorrect)
  }*/

  const playAgain = () => {
    window.location.reload()
  }


  const checkSelect = (question, selected) => {
    setArray(selected)
    setCheckAnswerBtn(count => count + 1)


    //setIsHeld(true)

    return setDatas(allDatas => {
      return allDatas.map(answerObjects => {
        const allAnswers = answerObjects.answers
        const answers1 = allAnswers.map(answerObject => {
          return selected === answerObject.answer ?
            { ...answerObject, held: !answerObject.held } : answerObject;
        })
        return question === answerObjects.question ?
          { ...answerObjects, held: !answerObjects.held, answers: answers1 } : answerObjects;
      })
    })

  }

  const questions = datas.map((x, index) => {

    return <div key={index}>
      <h4>
        {x.question}
      </h4>
      {x.answers.map((answer, i) => (
        <BtnComponent
          key={i}
          checkAnswer={array}
          handleClick={() => checkSelect(x.question, answer.answer)}
          value={answer.answer}
          held={x.held}
          isHeld={answer.held}
          checkAnswerTime={checkAnswer}
        />))}

      <hr />
    </div>

  })


  const checkSelectedd = datas.map((x, index) => {

    return <div key={index}>
      <h4>
        {x.question}
      </h4>
      {x.answers.map((answer, i) => (
        <BtnComponent
          key={i}
          value={answer.answer}
          checkCorrectness={x.checkCorrectness}
          correctAnswer={x.correctAnswer}
          hold={x.held}
          isHold={answer.held}

        />))}

      <hr />
    </div>

  })


  console.log(datas)
  return (
    <div className="quizApp">
      {loading ? (<p className="loading">Loading...</p>) :
        (checkAnswer && questions) || (!checkAnswer && checkSelectedd)}

      {(checkAnswerBtn > 4) && (checkAnswer) && <button className="checkAnswer" onClick={checkAnswers}>
        Check answers
      </button>}
      {(!checkAnswer) && <div className="score-div">
        <p> You scored {5 - incorrect}/5 correct answers</p>
        <button className="play-again" onClick={playAgain}>
          play again
        </button>
      </div>}

    </div>
  )
}