import React, { useState } from "react";
import { errValues } from "./components/constants";
import closeIcon from "../src/components/images/close-round-icon.svg";
import arrowRight from "../src/components/images/arrow-right.svg";
import "./App.css";

function App() {
  // state declarations
  const [namesArray, setNamesArray] = useState([]);
  const [inputName, setInputName] = useState("");
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

  const generateShuffledArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const tmp = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[tmp]] = [arr[tmp], arr[i]];
    }
    return arr;
  };

  const handleNamesSubmit = () => {
    if (namesArray.length < 3) {
      setErrors((prev) => ({ ...prev, count: errValues.count }));
    } else {
      const res = [];
      const shuffledArr = generateShuffledArray([...namesArray]);
      for (let i = 0; i < namesArray.length; i++) {
        if (namesArray[i] === shuffledArr[i]) {
          const tmp = shuffledArr[i];
          shuffledArr[i] = shuffledArr[(i + 1) % namesArray.length];
          shuffledArr[(i + 1) % namesArray.length] = tmp;
        }
        res.push({ name: namesArray[i], match: shuffledArr[i] });
      }
      setResultMatches(res);
    }
  };

  // return statement
  return (
    <div className="container">
      {/* header */}
      <header className="header">
        <h1 className="title">Secret Santa Generator</h1>
      </header>
      {/* body */}
      <div className="body">
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
                namesArray.length < 3 ? "submitButtonDisabled" : "submitButton"
              }
              onClick={() => handleNamesSubmit()}
            >
              Submit
            </button>
            </div>
            {errors?.count && <div className="error">{errors.count}</div>}
          </div>
        )}
        {/* show matches */}
        {resultMatches.length > 0 && (
          <div className="matchesContainer">
            <div className="matchesTitle">Secret Santa Matches:</div>
            {resultMatches.map((val) => {
              return (
                <div className="matchBlock" key={val.name}>
                  <div className="matchName">{val.name}</div>
                  <img
                    className="matchIcon"
                    src={arrowRight}
                    alt="arrow-right-match"
                  />
                  <div className="matchName">{val.match}</div>
                </div>
              );
            })}
            <div>
              <button
                className="matchesClearAllButton"
                onClick={() => setResultMatches([])}
              >
                Clear All Matches
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
