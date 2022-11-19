import React from "react";
import "./App.css"

function Dice(props) {

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "rgb(240, 249, 255)"
    }

    return (
    <div className="die" style={styles} onClick={props.hold}>
        <label>{props.value}</label>
    </div>
    )
}

export default Dice;