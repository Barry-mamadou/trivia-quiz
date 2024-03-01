import React from "react";

export default function Home(props){
  return(
    <div className="home-div">
      <h1 className="home-h1">
        Quizzical
      </h1>
      <p className="home-p">
        Some description if needed
      </p>
      <button className="home-button" onClick={props.switch}>
        Start quiz
      </button>
    </div>
  )
}