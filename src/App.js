import React, { useState } from "react";
import { errValues } from "./components/constants";
import closeIcon from "../src/components/images/close-round-icon.svg";
import Results from "./components/results";
import "./App.css";

function App() {
  // state declarations
  const [namesArray, setNamesArray] = useState([]);
  const [inputName, setInputName] = useState("");
  const [currentState, setCurrentState] =useState('home')
  const [resultMatches, setResultMatches] = useState([]);
  const [errors, setErrors] = useState({
    name: "",
    count: "",
  });

  const handleNameChange = (event) => {
    if (errors.name) {
      setErrors((prev) => ({ ...prev, name: "" }));
    }
    if (errors.count) {
      setErrors((prev) => ({ ...prev, count: "" }));
    }
    setInputName(event.target.value);
  };
  const handleKeyCapture = (event) => {
    if (event.key === "Enter" && event.target.value) {
      handleAdd(event.target.value);
    }
  };

  const handleAdd = (name) => {
    const nameToAdd = name.trim();
    if (namesArray.indexOf(nameToAdd) === -1) {
      setNamesArray((prev) => [...prev, nameToAdd]);
      setInputName("");
    } else {
      setErrors((prev) => ({ ...prev, name: errValues.name }));
    }
  };

  const removeNamefromList = (name) => {
    if (errors.count) {
      setErrors((prev) => ({ ...prev, count: "" }));
    }
    const tmpArr = [...namesArray];
    const idx = namesArray.indexOf(name);
    tmpArr.splice(idx, 1);
    setNamesArray(tmpArr);
  };

  const handleNamesSubmit = () => {
    let givers = [...namesArray]
    let receivers = [...namesArray]
    let res = [];
    let assignments = {};
    for (let i=0 ; i<givers.length; i++) {
      let availableReceivers = receivers.filter(receiver => receiver !== givers[i]);
      if (availableReceivers.length === 0) {
        // Swap the last two assignments
        let temp = assignments[givers[i - 1]];
        assignments[givers[i - 1]] = givers[i];
        assignments[givers[i]] = temp;
      } else {
        let randomIndex = Math.floor(Math.random() * availableReceivers.length);
        let selectedReceiver = availableReceivers[randomIndex];
        assignments[givers[i]] = selectedReceiver;
        receivers = receivers.filter(receiver => receiver !== selectedReceiver);
      }
    }
    for(let i=0; i< namesArray.length; i++) {
      res.push({ name: namesArray[i], match: assignments[namesArray[i]] });
    }
    setResultMatches(res);
    setCurrentState('result');
  };

  const handleClearAll = () => {
    // handleNamesSubmit();
    setResultMatches([]);
    setCurrentState("home");
  }

  // return statement
  return (
    <div className="container">
      {/* header */}
      <header className="header">
        <h1 className="title">Secret Santa Generator</h1>
      </header>
      {/* body */}
      <div className="body">
        {currentState === 'home' && (
          <div>
            <div className="addNameContainer">
          {/* add name */}
          <label className="nameLabel" htmlFor="name">
            Enter Name to Add:
          </label>
          <div className="addName">
            <input
              className="nameInput"
              id="name"
              onChange={(e) => handleNameChange(e)}
              onKeyUp={(e) => handleKeyCapture(e)}
              placeholder="Enter a Name..."
              value={inputName}
              type="text"
            />
            <button
              className="nameButton"
              disabled={!inputName}
              onClick={() => handleAdd(inputName)}
            >
              Add
            </button>
          </div>
          {errors?.name && <div className="error">{errors.name}</div>}
        </div>
        {/* show list of names */}
        {namesArray.length > 0 && (
          <div className="selectedNamesContainer">
            <div className="selectedNamesTitle">Selected Names:</div>
            <div className="selectedNamesGrid">
              {namesArray.map((name) => {
                return (
                  <div className="selectedNameBlock" key={name}>
                    <div className="selectedNameValue">{name}</div>
                    <img
                      className="selectedNameButton"
                      onClick={() => removeNamefromList(name)}
                      src={closeIcon}
                      alt="close pill icon"
                    />
                  </div>
                );
              })}
            </div>
            <div className="selectedNamesSubmission">
              <button
                className="selectedNamesClearAll"
                onClick={() => setNamesArray([])}
              >
                Clear All
              </button>
              <button
                className={
                  namesArray.length < 3
                    ? "submitButtonDisabled"
                    : "submitButton"
                }
                onClick={() => handleNamesSubmit()}
              >
                Submit
              </button>
            </div>
            {errors?.count && <div className="error">{errors.count}</div>}
          </div>
        )}
          </div>
        )}
        {/* show matches */}
        {currentState === 'result' && resultMatches.length > 0 && (
          <Results 
            handleClearAll= {handleClearAll}
            resultMatches = {resultMatches}
          />
        )}
      </div>
    </div>
  );
}

export default App;
