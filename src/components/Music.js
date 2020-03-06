import React, { Component } from "react";
import ReactPlayer from 'react-player';
import PlayVolume from '../images/global/playvolume.png'
import PauseVolume from '../images/global/pausevolume.png'

class Music extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            url: this.props.url,
            playing: false,
            loop: true,
            src : PlayVolume
        }
    }
    togglePlaying = () => {
        console.log(this.props.location)
        this.state.playing === true ? this.setState({ playing: false, src : PauseVolume }) : this.setState({ playing: true , src : PlayVolume})
    }
    render() {

        return (
            <div>
                <ReactPlayer style={{ display: "none" }} url={this.state.url} playing={this.state.playing} loop={this.state.loop} controls={false} />
                <img src={this.state.src} style={{position :"absolute", top:"1vh", right: '2vw', height : "8vh"}} onClick={this.togglePlaying}/>
            </div>
        )

    }
}

export default Music