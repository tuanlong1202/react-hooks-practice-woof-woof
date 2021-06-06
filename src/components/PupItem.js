import React from "react";

function PupItem({pup, itemClick}) {
    const {id,name} = pup
    return (
        <span onClick={()=>itemClick(id)}>{name}</span>
    )
}

export default PupItem;