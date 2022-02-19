import { styled } from "@mui/material";
import React from "react";

interface Props {
  value?: string;
  onChange?: (text: string) => void;
  placeholder?: string;
  style?: React.CSSProperties;
  autoFocus?: boolean;
}

const StyledTextInput = styled("input")(({ theme }) => ({
  border: "none",
  outline: "none",
  flex: 1,
  backgroundColor: theme.colors.surface.dark,
  color: theme.colors.text.main,
  padding: "0.75rem",
  borderRadius: "6px",
}));

const TextInput = ({
  value,
  onChange,
  placeholder,
  style,
  autoFocus,
}: Props) => (
  <StyledTextInput
    value={value}
    onChange={(e) => onChange?.(e.target.value)}
    placeholder={placeholder}
    style={style}
    autoFocus={autoFocus}
  />
);

export default TextInput;
