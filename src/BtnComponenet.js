//import React, { useEffect, useState } from "react";
import classNames from "classnames";

export default function BtnComponent( props){
  /*const [incorrect, setIncorrect] = useState(0)

  useEffect(()=>{
    if((props.value !== props.correctAnswer)&& props.isHold){
      setIncorrect(notcorrect => notcorrect + 1)
    }
  }, [props.correctAnswer, props.isHold])
 
  const sendDataToParent = ()=>{
    props.handleClicks(incorrect)
  }
  const handleButtonClick =()=>{
    props.handleClick();
    !props.checkAnswerTime && sendDataToParent();
  }*/
  console.log(props)

  return(
    <div className='btn-div'>
      <button 
      onClick={props.handleClick} 
      className={classNames('btn1',{
        'btn-held': /*props.isHeld && */ props.held && props.isHeld,
         'correct': props.checkCorrectness || (props.value === props.correctAnswer),
         'not-correct':!props.checkCorrectness && props.isHold})}>
        {props.value}
        </button>
    </div>
  )
}