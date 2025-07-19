import React from "react";
import { MultiSelectExampleType } from "../../../../types/ComponentsType";

const MultiSelectExample: React.FC<MultiSelectExampleType> = ({ options, value, onChange, label }) => {

  const toggleOption = (option: string, e: React.MouseEvent) => {
    const isCtrlOrAlt = e.ctrlKey || e.altKey;

    if (isCtrlOrAlt) {
      if (value.includes(option)) {
        onChange(value.filter(v => v !== option));
      } else {
        onChange([...value, option]);
      }
    } else {
      onChange([option]);
    }
  };

  return (
    <div>
      <p>{label}</p>
      <ul style={{ listStyle: "none", padding: 0, border: "1px solid #ccc", maxWidth: 200, userSelect: "none" }}>
        {options.map((option) => (
          <li
            key={option}
            onClick={(e) => toggleOption(option, e)}
            style={{
              padding: "4px 8px",
              margin: "2px 0",
              cursor: "pointer",
              backgroundColor: value.includes(option) ? "#3399ff" : "white",
              color: value.includes(option) ? "white" : "black",
              borderRadius: 4,
              userSelect: "none",
            }}
          >
            {option}
          </li>
        ))}
      </ul>
      <p>Selected: {value.join(", ") || "None"}</p>
    </div>
  );
};

export default MultiSelectExample;