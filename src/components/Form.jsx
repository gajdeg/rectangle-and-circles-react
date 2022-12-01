import { useState } from "react";

export const Form = ({ onSubmit, submittedCoords }) => {
  const [coords, setCoords] = useState({
    minX: 0,
    maxX: 500,
    minY: 0,
    maxY: 300,
  });

  const handleChange = (e) => {
    setCoords({
      ...coords,
      [e.target.name]: +e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(coords);
  };

  const handleReset = () => {
    setCoords(submittedCoords);
  };

  const disableReset = submittedCoords === coords;
  const disableSubmit = submittedCoords === coords;

  return (
    <form className="navbar-nav" id="myform">
      <label className="mb-1">
        minX
        <input
          name="minX"
          type="number"
          value={coords.minX}
          onChange={handleChange}
        />
      </label>
      <br />
      <label className="mb-1">
        maxX
        <input
          name="maxX"
          type="number"
          value={coords.maxX}
          onChange={handleChange}
        />
      </label>
      <br />
      <label className="mb-1">
        minY
        <input
          name="minY"
          type="number"
          value={coords.minY}
          onChange={handleChange}
        />
      </label>
      <br />
      <label className="mb-1">
        maxY
        <input
          name="maxY"
          id="maxY"
          value={coords.maxY}
          onChange={handleChange}
          type="number"
        />
      </label>

      <div className="btn-group mb-1">
        <button
          type="submit"
          onClick={handleSubmit}
          className="btn-orange"
          disabled={disableSubmit}
        >
          Submit
        </button>
        <button
          disabled={disableReset}
          type="reset"
          className="btn-orange"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </form>
  );
};
