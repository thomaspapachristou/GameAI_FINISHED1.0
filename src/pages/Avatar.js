import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Nala from "../images/global/nala.png";
import Scar from "../images/global/scar.png";
import Simba from "../images/global/simba.png";
import Hyenas from "../images/global/hyenas.png";
import '../avatar.css';

export default class Avatar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nbP: this.props.data.nbP,
            nbB: this.props.data.nbB,
            avatar: [
                { id: 1, name: "Nala", img: Nala },
                { id: 2, name: "Scar", img: Scar },
                { id: 3, name: "Simba", img: Simba },
                { id: 4, name: "Hyenas", img: Hyenas }
            ],
            hands: [
                // { id : 1 ,value : '11' },
                // { id : 2 ,value : '22' },
                // { id : 3 ,value : '33' },
                // { id : 4 ,value : '44' }
            ]
        }
    }

    ///// CHANGER FACON DE PROCEDER? DECORTIQUER ARRAY ET PUSH UN PAR UN  /////////////
    ///// ou AU LIEU DE COPIER LA LIGNE, COPIER LE RESTE ? ////////////////////////////
    addToHand = (id) => {
        var x = id;
        // copie du state.avatar et hands
        var copieAvatar = this.state.avatar;
        var copieHands = this.state.hands; // []

        // on conserve la partie que l'on retire du tableau avatar 
        var partToAdd = copieAvatar.slice(x - 1, x); // []
        // on retire la ligne dont l'id est x à la copie du state
        copieAvatar.splice(x - 1, 1, ""); //[]
        // on ajoute la copie du tableau 
        copieHands.push(partToAdd); // [[]]
        // on définit le state.hands comme étant notre tableau copié et modifié
        this.setState({ _hand1: partToAdd });
        // console.log(copieHands.join());
        console.log(this.state._hand1);
    }

    render() {
        const style = {
            width: '100px',
            height: '100px',
            border: "none"
        }
        const hands = this.state.hands;
        const elH = hands.map((hands) =>
            <div id={hands.id}>
                <img src={hands.src} alt="" />
                {hands.name}
            </div>);

        const avatar = this.state.avatar;
        const elA = avatar.map((avatar) =>
            <div>
                <img key={avatar.id} src={avatar.img} style={style} onClick={() => this.addToHand(avatar.id)} alt="" />{avatar.name}
            </div>
        )
        return (
            <div style={{display : "flex", flexDirection : "row"}}>
                {this.state.nbP}
                {elA}
                {elH}
            </div>
        )
    }
}








// export default class Avatar extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             nbP: this.props.location.data.nbP,
//             nbB: this.props.location.data.nbB,
//             avatar: [Nala, Scar, Simba, Hyenas],
//             name: ["Nala", "Scar", "Simba", "Hyenas"],
//             defaultCharacter: '',
//             nameDefault: '',
//             compteur: 0
//         }
//     }
//     // affiche avatar précédent
//     changeAvatarL = () => {
//         if (this.state.compteur === 0) {
//             this.setState({ compteur: this.state.avatar.length - 1 });
//         }
//         else {
//             this.setState({ compteur: this.state.compteur - 1 });
//         }
//         this.setState({ defaultCharacter: this.state.avatar[this.state.compteur-1], nameDefault: this.state.name[this.state.compteur-1] });

//         console.log(this.state);
//         console.log("DefaultCharacter = " + this.state.avatar[this.state.compteur])
//     }
//     // affiche avatar suivant
//     // ICI IL FAUT REMPLACER 3 PAR LE NOMBRE DE PLACE AU TOTAL
//     changeAvatarR = () => {
//         if(this.state.compteur === (this.state.avatar.length-1)){
//             this.setState({compteur : 0 })
//         } else{
//             this.setState({compteur : this.state.compteur + 1})
//         }
        // this.setState({defaultCharacter : this.state.avatar[this.state.compteur], nameDefault: this.state.name[this.state.compteur] })

        // console.log(this.state.defaultCharacter);
        // console.log("DefaultCharacter = " + this.state.avatar[this.state.compteur])
        // if (this.state.compteur === (this.state.avatar.length)-1) {
        //     this.setState({ defaultCharacter: this.state.avatar[0], nameDefault: this.state.name[0], compteur: 0 });
        // }
        // else {
        //     this.setState({ defaultCharacter: this.state.avatar[this.state.compteur + 1], nameDefault: this.state.name[this.state.compteur + 1], compteur: this.state.compteur + 1 });
        // }
    // }
//     // Ajouter 
//     confirmChoice = () => {
//         this.state.avatar.splice(this.state.compteur, 1);
//         this.state.name.splice(this.state.compteur, 1);
//     }

//     render() {
//         // console.log("avatar", this.props.location.data);
//         // const numberPlayers = this.props.location.data.nbP;
//         // const numberTotal = this.props.location.data.nbB;
//         const numberPlayers = 2;
//         const numberTotal = 4;
//         const t = [];
//         for (var i = 0; i < numberPlayers; i++) {
//             t.push("Player " + (i + 1));
//         }
//         for (var i = 0; i < (numberTotal - numberPlayers); i++) {
//             t.push("IA " + (i + 1));
//         }


//         // el : affiche les joueurs
//         const el = t.map((value, index) =>
//             <p id={index}>{value}</p>
//         )
//         return (
//             <div id="parent">
//                 <div id="selAvatar">
//                     <h1>{t[0]} choose</h1>
//                     <div id="avatarFleche">
//                         <div id="fleG"><img src={leftArrow} onClick={this.changeAvatarL} alt="" /></div>
//                         <div style={{ overflow: "hidden" }}>
//                             <img id="imgAvatar" src={this.state.defaultCharacter} style={{ width: "40vh", height: "40vh" }} alt="" />
//                         </div>
//                         <div id="fleD"><img src={rightArrow} onClick={this.changeAvatarR} alt="" /></div>
//                     </div>
//                     <h1 id="nameCharac">{this.state.nameDefault}</h1>
//                     <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", marginTop: "40px", marginBottom: "40px" }}>
//                         <div id="imgYes" onClick={this.confirmChoice}></div>
//                         <div id="imgBack" onclick="back()"></div>
//                     </div>
//                 </div>
//                 <div id="dispRight">
//                     {/* <div style={{display: "flex", flexDirection:"row"}}>
//                         <div id="vol"></div>
//                         <div id="quit"></div>
//                     </div> */}
//                     <div id="targetPlace">
//                         {el}
//                     </div>
//                 </div>
//             </div>)
//     }
// }