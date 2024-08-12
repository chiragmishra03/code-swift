import React, { useState } from "react";
import { ReactPainter } from "react-painter";

function Canvas() {
  const [isEraserActive, setIsEraserActive] = useState(false);
  const [brushColor, setBrushColor] = useState("black");
  const [prevBrushColor, setPrevBrushColor] = useState(null);
  const width = 0.85 * window.innerWidth;
  const height = 0.65 * window.innerHeight;

  const handleEraserToggle = (setColor) => {
    if (isEraserActive) {
      setColor(prevBrushColor);
    } else {
      setPrevBrushColor(brushColor);
      setColor("rgb(71, 70, 70)"); // Color to simulate erasing
    }
    setIsEraserActive(!isEraserActive);
  };

  return (
    <div className="canvas-container">
      <ReactPainter
        width={width}
        height={height}
        onSave={(blob) => console.log(blob)}
        render={({ setColor, setLineWidth, canvas, clearCanvas }) => (
          <div className="toolbox">
            <div className="flex-item">
              <div className="flex">
                <label htmlFor="">Brush Color</label>
                <input
                  type="color"
                  defaultValue={brushColor}
                  onChange={(e) => {
                    const newColor = e.target.value;
                    setBrushColor(newColor);
                    setColor(newColor);
                    setIsEraserActive(false); // Disable eraser when color changes
                  }}
                />
              </div>
              <div className="flex">
                <label htmlFor="">Brush Size</label>
                <input
                  type="range"
                  min={"1"}
                  max={"50"}
                  defaultValue="10"
                  onChange={(e) => {
                    setLineWidth(e.target.value);
                  }}
                />
              </div>
              <button
                className="eraser-button"
                onClick={() => handleEraserToggle(setColor)}
              >
                {isEraserActive ? "Switch to Brush" : "Eraser"}
              </button>
            </div>
            <div className="canvas">{canvas}</div>
          </div>
        )}
      />
    </div>
  );
}

export default Canvas;
