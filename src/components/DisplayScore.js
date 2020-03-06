import React from "react"


const DisplayScore = ({ player1, player2, player3, player4, nbPlaces }) => {

    const styleScore = {
        position: "absolute",
        top : '2vh',
        left : '2vh',
        border : 'solid white 1px',
        padding : "1vw",
        minWidth : '8vw'
    }
    return (
        <div className="scores" style={styleScore}>
            <p style={{ padding: "0px", margin: "0px" }}>Scores : </p>
            <br />
            {nbPlaces >= 1 ? <div className="score-player">Player 1 : {player1}</div> : null}
            {nbPlaces >= 2 ? <div className="score-player">Player 2 : {player2}</div> : null}
            {nbPlaces >= 3 ? <div className="score-player">Player 3 : {player3}</div> : null}
            {nbPlaces >= 4 ? <div className="score-player">Player 4 : {player4}</div> : null}
        </div>
    )

}
export default DisplayScore