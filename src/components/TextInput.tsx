import React from "react";

interface Props {
  value?: string;
  onChange?: (text: string) => void;
  placeholder?: string;
  style?: React.CSSProperties;
}

const TextInput = ({ value, onChange, placeholder, style }: Props) => (
  <input
    value={value}
    onChange={(e) => onChange?.(e.target.value)}
    placeholder={placeholder}
    style={{
      border: "none",
      outline: "none",
      flex: 1,
      backgroundColor: "#EAEDEF",
      padding: "0.75rem",
      borderRadius: "6px",
      ...style,
    }}
  />
);

export default TextInput;
