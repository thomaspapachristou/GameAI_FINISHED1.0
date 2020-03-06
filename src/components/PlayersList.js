import React from "react"

const PlayersList = ({ number, avatar }) => {
    
    let { srcOf } = "";
    // on démarre avec un objet de longueur 0, il faut attendre que la longueur soit > 0 pour récupérer
    // l'avatar et l'afficher à coté de la liste
    if (avatar.length !== 0) {
        srcOf = avatar[0];
        console.log(srcOf['avatar'])
    }

    const styleImg = {
        width: '5vw',
        height: '5vw'
    }
    let nb = number;
    const display = (value) => {
        if (value <= nb) {
            return "Player " + value;
        } else {
            return '';
        }
    }
    return (
        <ul style={{ color: "white" }}>
            <li>{avatar.length >= 1 ? <img src={avatar[0].avatar} style={styleImg} /> : <div></div>}<p>{display(1)}</p></li>
            <li>{avatar.length >= 2 ? <img src={avatar[1].avatar} style={styleImg} /> : <div></div>}<p>{display(2)}</p></li>
            <li>{avatar.length >= 3 ? <img src={avatar[2].avatar} style={styleImg} /> : <div></div>}<p>{display(3)}</p></li>
            <li>{avatar.length >= 4 ? <img src={avatar[3].avatar} style={styleImg} /> : <div></div>}<p>{display(4)}</p></li>
        </ul>
    )

}

export default PlayersList;