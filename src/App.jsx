import { useState } from "react";
import "./App.css";

const App = () => {
  const [state, setState] = useState({
    minX: 0,
    maxX: 500,
    minY: 0,
    maxY: 300,
  });

  const [isActive, setIsActive] = useState(false);
  const [saveButton, setSaveButton] = useState(false);
  const [resetButton, setResetButton] = useState(true);
  const [undoButton, setUndoButton] = useState(true);
  const [redoButton, setRedoButton] = useState(true);
  const [coord, setCoord] = useState([]);
  const [undone, setUndone] = useState([]);

  const showCircles = coord.map((element, index) => {
    return (
      <div
        key={index}
        className="circle"
        style={{ top: `${element.y}px`, left: `${element.x}px` }}
      >
        {index}
      </div>
    );
  });

  const updateButtons = () => {
    if (coord.length === 0) setUndoButton(true);
    if (undone.length === 0) setRedoButton(true);
  };

  const handleChange = (e) => {
    setState((state) => ({
      ...state,
      [e.target.name]: +e.target.value,
    }));
  };

  const showRectangle = (e) => {
    e.preventDefault();
    setCoord(
      coord.filter((element) => {
        return (
          element.x < state.minX ||
          element.x > state.maxX ||
          element.y < state.minY ||
          element.y > state.maxY
        );
      })
    );
    setUndone(() => []);
    setIsActive(true);
    setSaveButton(true);
    setResetButton(false);
    updateButtons();
  };

  const calCoord = (e) => {
    const { pageX, pageY, currentTarget, target } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    const { pageXOffset, pageYOffset } = window;
    const x = pageX - left - pageXOffset;
    const y = pageY - top - pageYOffset;
    if (currentTarget !== target) {
      return;
    }
    setCoord((current) => [...current, { x, y }]);
    setUndone(() => []);
    setUndoButton(false);
    setRedoButton(true);
  };

  const handleReset = (e) => {
    state.minX = 0;
    state.maxX = 500;
    state.minY = 0;
    state.maxY = 300;
    setIsActive(false);
    setResetButton(true);
    setSaveButton(false);
  };
  const undoneMethod = () => {
    undone.push(coord.pop());
    setCoord((current) => [...current]);
    setRedoButton(false);
    updateButtons();
  };
  const redoMethod = () => {
    coord.push(undone.pop());
    setCoord((current) => [...current]);
    setUndone((current) => [...current]);
    setUndoButton(false);
    updateButtons();
  };

  return (
    <>
      <div className="container">
        <div className="rectangle" onClick={calCoord}>
          {showCircles}
          <div
            className="blue"
            style={{
              width: `${state.maxX - state.minX}px`,
              height: `${state.maxY - state.minY}px`,
              transform: `translate(${state.minX}px,${state.minY}px)`,
              visibility: isActive ? "visible" : "hidden",
            }}
          ></div>
        </div>
      </div>
      <nav className="navbar">
        <form className="navbar-nav" id="myform">
          <input name="minX" value={state.minX} onChange={handleChange} />
          <label>minX</label>
          <br />
          <input name="maxX" value={state.maxX} onChange={handleChange} />
          <label>maxX</label>
          <br />
          <input name="minY" value={state.minY} onChange={handleChange} />
          <label>minY</label>
          <br />
          <input name="maxY" value={state.maxY} onChange={handleChange} />
          <label>maxY</label>
          <br /> <br />
          <input
            type="submit"
            id="btnSave"
            onClick={showRectangle}
            disabled={saveButton}
          />
          <input
            disabled={resetButton}
            type="reset"
            id="btnClear"
            value="Reset"
            onClick={handleReset}
          />
          <br /> <br />
          <input
            disabled={undoButton}
            type="button"
            id="btnUndo"
            value="Undo"
            onClick={undoneMethod}
          />
          <input
            disabled={redoButton}
            type="button"
            id="btnRedo"
            value="Redo"
            onClick={redoMethod}
          />
        </form>
      </nav>
    </>
  );
};

export default App;
