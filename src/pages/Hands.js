import React, { useState } from 'react';


const DisplayHand = ({ hand, func }) => {

    var copyHand = hand;
    console.log(copyHand)
    const removeCard = (id) => {
        // console.log(state)
        const newState = copyHand;
        const index = newState.findIndex(copyHand => copyHand.id === id);
        newState.splice(index, 1);
        copyHand = newState;
        console.log(copyHand)

        // // console.log(state)
        // const newState = [...hand];
        // const index = newState.findIndex(hand => hand.id === id);
        // newState.splice(index, 1);
        // console.log(newState)
    }


    return (
        copyHand.map((hand) =>
            <button onClick={() => removeCard(hand.id)} key={hand.id}>
                {hand.value}
            </button>
        ))
    // hand.map((hand) =>
    //     <button onClick={() => removeCard(hand.id)} key={hand.id}>
    //         {hand.value}
    //     </button>
    // ))
}

export default DisplayHand;