import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Music from '../components/Music'
import leftArrow from '../images/global/leftarrow.png';
import rightArrow from '../images/global/rightarrow.png';
import img0 from '../images/global/nombre0.png';
import img1 from '../images/global/nombre1.png';
import img2 from '../images/global/nombre2.png';
import img3 from '../images/global/nombre3.png';
import img4 from '../images/global/nombre4.png';
import '../menu.css';
import TransiLaunch from '../components/TransiLaunch';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nbP: 2,
            nbPback: [img0, img1, img2, img3, img4],
            styleP: img2,
            styleB: img2,
            nbB: 2,
            showBlock: true
        }
    }
    handleRemovePlayer = () => {
        if (this.state.nbP !== 0) {
            this.setState({ nbP: this.state.nbP - 1, styleP: this.state.nbPback[this.state.nbP - 1] });
        }
    }
    handleAddPlayer = () => {
        if (this.state.nbP !== 4) {
            this.setState({ nbP: this.state.nbP + 1, styleP: this.state.nbPback[this.state.nbP + 1] });
            if (this.state.nbP >= this.state.nbB) {
                this.setState({ nbB: this.state.nbB + 1, styleB: this.state.nbPback[this.state.nbB + 1] })
            }
        }
    }
    handleRemoveBot = () => {
        if (this.state.nbB !== 2) {
            this.setState({ nbB: this.state.nbB - 1, styleB: this.state.nbPback[this.state.nbB - 1] });
            if (this.state.nbB === this.state.nbP) {
                this.setState({ nbP: this.state.nbP - 1, styleP: this.state.nbPback[this.state.nbP - 1] })
            }
        }
    }
    handleAddBot = () => {
        if (this.state.nbB !== 4) {
            this.setState({ nbB: this.state.nbB + 1, styleB: this.state.nbPback[this.state.nbB + 1] });
        }

    }
    toggleBlock = () => {
        this.setState({ showBlock: !this.state.showBlock })
    }

    render() {
        return (
            <div className="backgroundMenu">
                <TransiLaunch />
                <Music url='https://www.youtube.com/embed/V3bhdIGoWCI' />

                <div id="newOne">

                    {/* <ul id="scene" data-friction-x="0.03" data-friction-y="0.05">
                            <li className="layer" id="layer-1" data-depth="0.15">
                                <div className="img" id="img-1"></div>
                            </li>
                            <li className="layer" id="layer-2" data-depth="0.25">
                                <div className="img" id="img-2"></div>
                            </li>
                            <li className="layer" id="layer-3" data-depth="0.45">
                                <div className="img" id="img-3"></div>
                            </li>
                        </ul> */}

                    {
                        this.state.showBlock === true ?
                            // afficher le menu
                            <div id="posmenu">
                                <div className="btnMenu" id="start" onClick={this.toggleBlock}></div>
                                <div className="btnMenu" id="tutorial"></div>
                                <div className="btnMenu" id="bonus"></div>
                            </div>
                            :
                            // afficher la selection du nombre de joueurs
                            <div className="posBlockChoix">

                                <p>Selectionnez le nombre de joueurs</p>
                                <div className="selJ">
                                    <div className="fleG" onClick={this.handleRemovePlayer}>
                                        <img src={leftArrow} alt="" />
                                    </div>
                                    <div id="nbJoueur" style={{ backgroundImage: "url('" + this.state.styleP + "')", backgroundSize: "cover" }}>
                                    </div>
                                    <div className="fleD" onClick={this.handleAddPlayer}>
                                        <img src={rightArrow} alt="" />
                                    </div>
                                </div>


                                <p>Selectionnez le nombre de place</p>
                                <div className="selJ">
                                    <div className="fleG" onClick={this.handleRemoveBot}>
                                        <img src={leftArrow} alt="" />
                                    </div>
                                    <div id="nbBot" style={{ backgroundImage: "url('" + this.state.styleB + "')", backgroundSize: "cover" }}>
                                    </div>
                                    <div className="fleD" onClick={this.handleAddBot}>
                                        <img src={rightArrow} alt="" />
                                    </div>
                                </div>
                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                                    <Link to={{
                                        pathname: '/character',
                                        state: {
                                            nbP: this.state.nbP,
                                            nbB: this.state.nbB - this.state.nbP
                                        }
                                    }}>
                                        <div id="imgYes"></div>
                                    </Link>
                                    <div id="imgBack" onClick={this.toggleBlock}></div>
                                </div>
                            </div>
                    }

                </div>
            </div>
        )
    }

};


export default Menu;