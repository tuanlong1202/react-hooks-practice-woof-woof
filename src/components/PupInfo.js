import React, { useState }from "react";

function PupInfo({dog, onGoodBadDogClick}) {
    const {id,image,isGoodDog,name} = dog[0];
    return (
        <div>
            <img src={image} alt={name} />
            <h2>{name}</h2>
            <button onClick={()=>{onGoodBadDogClick(id,!isGoodDog)}}>{(isGoodDog)? 'Good': 'Bad'} Dog!</button> 
        </div>
    )
}

export default PupInfo;