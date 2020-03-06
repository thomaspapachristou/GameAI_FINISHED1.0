import React, { useState } from "react"
import { Link } from "react-router-dom"

const BackToMenu = () => {
    const [toggle, setToggle] = useState(true);

    return (
        toggle === false ?
            <div className="confirm-backtomenu">
                Go back to the main menu ?
                    <div>
                    <Link to={{ pathname: '/' }}>
                        <div className="yes-backtomenu"></div>
                    </Link>
                        <div className="no-backtomenu" onClick={() => setToggle(true)}></div>
                    </div>
            </div>
            :
            <div className="icon-backtomenu" onClick={() => setToggle(false)}></div>
    )

}

export default BackToMenu