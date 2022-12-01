import { useState } from "react";
import "./App.css";
import { Form } from "./components/Form";
import { Rectangle } from "./components/Rectangle";
import { Circle } from "./components/Circle";

const App = () => {
  const [coords, setCoords] = useState({
    minX: 0,
    maxX: 500,
    minY: 0,
    maxY: 300,
  });

  const handleSubmit = (coords) => {
    setCoords(coords);
  };

  return (
    <>
      <div className="container">
        <div className="rectangle">
          {[].map((element, index) => (
            <Circle key={index} y={element.y} x={element.x} />
          ))}
          <Rectangle
            className="blue"
            style={{
              visibility: "visible",
            }}
            x={coords.minX}
            y={coords.minY}
            width={coords.maxX - coords.minX}
            height={coords.maxY - coords.minY}
          />
        </div>
      </div>
      <nav className="navbar">
        <div>
          <Form
            onSubmit={handleSubmit}
            onChange={setCoords}
            submittedCoords={coords}
          />

          <div className="btn-group mb-1">
            <button type="button" className="btn-blue">
              Undo
            </button>
            <button type="button" className="btn-blue">
              Redo
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default App;
