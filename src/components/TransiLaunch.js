import React from "react"
import '../App.css'

class TransiLaunch extends React.Component {
    componentDidMount() {
        setTimeout(() => {
            this.setState({ show: false })
        }, 10000);
    }
    constructor(props) {
        super(props);

        this.state = {
            show: true
        }
    }

    render() {
        return (
            this.state.show === true ?
                <div id="titre" style={{ width: '100vw', height: '100vh' }}>
                    <div id="rouge"></div>
                </div> 
                :
                null
        )
    }
}

export default TransiLaunch