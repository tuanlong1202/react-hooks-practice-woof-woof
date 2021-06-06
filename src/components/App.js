import React, { useEffect, useState } from "react";
import PupInfo from "./PupInfo";
import PupItem from "./PupItem";

function App() {
   
  const [pupList, setPupList] = useState([]);
  const [showGoodDog, setShowGoodDog] = useState(false);
  const [showDogID, setShowDogID] = useState(0);

  useEffect(loadData,[]);
  
  function loadData(){
    let url = 'http://localhost:3001/pups';
    fetch(url)
      .then(r=>r.json())
      .then((data) => {
        setPupList([...data]);
      })
      .catch((e)=>{
        console.error("Error: " + e);
      });
  }

  function handleShowGoodDogs() {
    setShowGoodDog(!showGoodDog);
  }

  const dogsIntoList = (showGoodDog) ? pupList.filter(item=>item.isGoodDog===true) : pupList;

  const dogsToDisplay = dogsIntoList.map((item,index) => {
    return (
      <PupItem
        key={index}
        pup={item}
        itemClick={handleItemClick}
      />
    )
  })

  function handleItemClick(value) {
    setShowDogID(value);
  }

  function showDogInfo(){
    if (showDogID > 0) {
      return (
        <PupInfo
          dog={pupList.filter(item=>item.id===showDogID)}
          onGoodBadDogClick={handleGoodBadDogClick}
        />
      )
    } else {
      return null
    }
  }

  function handleGoodBadDogClick(id,value){
    let url = 'http://localhost:3001/pups';
    fetch(url + '/' + id,{
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        'isGoodDog': value,
      })
    })
      .then(r=>r.json())
      .then(loadData)
      .catch(e=>console.error("Error: " + e));
  }

  return (
    <div className="App">
      <div id="filter-div">
        <button id="good-dog-filter" onClick={handleShowGoodDogs}>
          Filter good dogs: {(showGoodDog) ? 'OFF' : 'ON'}
        </button>
      </div>
      <div id="dog-bar">{dogsToDisplay}</div>
      <div id="dog-summary-container">
        <h1>DOGGO:</h1>
        <div id="dog-info">{showDogInfo()}</div>
      </div>
    </div>
  );
}

export default App;
