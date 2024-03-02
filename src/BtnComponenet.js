import classNames from "classnames";

export default function BtnComponent( props){

  return(
    <div className='btn-div'>
      <button 
      onClick={props.handleClick} 
      className={classNames('btn1',{
        'btn-held': props.held && props.isHeld,
         'correct': props.checkCorrectness || (props.value === props.correctAnswer),
         'not-correct':!props.checkCorrectness && props.isHold})}>
        {props.value}
        </button>
    </div>
  )
}