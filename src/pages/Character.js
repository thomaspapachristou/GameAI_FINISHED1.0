import React, { useState } from 'react'
import PlayersList from '../components/PlayersList';
import BackToMenu from '../components/BackToMenu';
import '../avatar.css'
import Nala from '../images/cards/Nala/No Hover/nala1.png'
import NalaBack from '../images/cards/cover/rwyaLANA.png'
import Simba from '../images/cards/Simba/No Hover/simba1.png'
import SimbaBack from '../images/cards/cover/rwyaSIMBA.png'
import Scar from '../images/cards/Scar/No Hover/scar1.png'
import ScarBack from '../images/cards/cover/rwyaSCAR.png'
import Hyenas from '../images/cards/Hyenas/No Hover/hyenas1.png'
import HyenasBack from '../images/cards/cover/rwyaHYENAS.png'
import NalaAvatar from "../images/global/nala.png";
import ScarAvatar from "../images/global/scar.png";
import SimbaAvatar from "../images/global/simba.png";
import HyenasAvatar from "../images/global/hyenas.png";
import Avatars from '../components/Avatars';
import Music from '../components/Music'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { Slide } from 'react-slideshow-image'

// propriétés du slider
const properties = {
    duration: 10000000,
    transitionDuration: 500,
    infinite: true
}

const Character = (props) => {
    const [avatar, setAvatar] = useState([
        { id: 1, name: "Nala", avatar: NalaAvatar, char: Nala, verso: NalaBack, isBot: false },
        { id: 2, name: "Scar", avatar: ScarAvatar, char: Scar, verso: ScarBack, isBot: false },
        { id: 3, name: "Simba", avatar: SimbaAvatar, char: Simba, verso: SimbaBack, isBot: false },
        { id: 4, name: "Hyenas", avatar: HyenasAvatar, char: Hyenas, verso: HyenasBack, isBot: false }
    ]);
    const playerNumber = props.location.state.nbP;
    const botNumber = props.location.state.nbB;
    const [hands, setHands] = useState([]);
    // Push le personnage dans le tableau determinant le choix des personnages 
    const handleDelete = id => {
        // Copie des tableaux du state
        const updatedAvatar = [...avatar];
        const updatedHands = [...hands];
        // Ceci permet de limiter le nombre de joueurs 
        if (hands.length !== playerNumber) {
            // recherche de la ligne à retirer
            const index = updatedAvatar.findIndex(avatar => avatar.id === id);
            const add = updatedAvatar.splice(index, 1);
            // merge du tableau des personnages selectionnés et de la nouvelle valeur à ajouter
            Array.prototype.push.apply(updatedHands, add);
            setAvatar(updatedAvatar);
            setHands(updatedHands);
        } else {
            var y = botNumber;
            while (y !== 0) {
                // index du bot
                const index = updatedAvatar.findIndex(avatar => avatar.id === 1);
                // valeur à extraire de avatar
                const add = updatedAvatar.splice(index, 1);
                // mise à jour du paramètre isBot
                add[0].isBot = true;
                // merge du tableau des personnages selectionnés et de la nouvelle valeur à ajouter
                Array.prototype.push.apply(updatedHands, add);
                setAvatar(updatedAvatar);
                setHands(updatedHands);
                y--;
            }
        } console.log(hands)
    }
    return (
        <div className='backgroundPrincipal'>
            <Music url='https://www.youtube.com/embed/VQVoFpX39jI' />
            <div className='character-slider'>
                {/* Afficher les personnages sous forme de slider */}
                <Slide {...properties}>
                    {avatar.map(avatar => (
                        <Avatars
                            key={avatar.id}
                            content={avatar}
                            onDelete={handleDelete}
                        />
                    )
                    )}
                </Slide>
                {/* Lancer la partie si tout les players ont choisi */}
                {hands.length === (playerNumber + botNumber) ?
                    <Link to={{
                        pathname: 'game',
                        state: {
                            nbP: playerNumber,
                            nbB: botNumber,
                            hands: hands
                        }
                    }}>
                        <div className='start'> Start playing </div>
                    </Link>
                    :
                    // si tout les personnages n'ont pas choisi, instructions
                    <div className='rule'> Select your character by clicking on it. </div>}

            </div>
            {/* afficher la liste des joueurs avec les personnages qu'ils ont choisit */}
            <div className='player-list'>
                <PlayersList number={playerNumber + botNumber}
                    avatar={hands} />
            </div>
            <BackToMenu />
        </div>
    )
}
export default Character;