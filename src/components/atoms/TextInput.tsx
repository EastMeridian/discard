import React from "react";
import styled from "styled-components";

interface Props {
  value?: string;
  onChange?: (text: string) => void;
  placeholder?: string;
  style?: React.CSSProperties;
  autoFocus?: boolean;
}

const StyledTextInput = styled.input`
  border: none;
  outline: none;
  flex: 1;
  background-color: #eaedef;
  padding: 0.75rem;
  border-radius: 6px;
`;

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
