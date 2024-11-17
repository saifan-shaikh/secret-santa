import React from "react";
import "../App.css";

const Results = (props) => {
  const {
    handleClearAll,
    resultMatches,
  } = props;
  return (
    <div className="matchesContainer">
      <div className="matchesTitle">Secret Santa Matches:</div>
      {resultMatches.length > 0 && (
        <table className="matchesTable">
          {/* header */}
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
            </tr>
          </thead>
          <tbody>
            {resultMatches.map((val) => {
              return (
                <tr>
                  <td>{val.name}</td>
                  <td>{val.match}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <div>
        <button
          className="matchesClearAllButton"
          onClick={() => handleClearAll()}
        >
          Clear All Matches
        </button>
      </div>
    </div>
  );
};

export default Results;
