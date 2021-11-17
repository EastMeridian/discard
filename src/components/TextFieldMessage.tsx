import { Paper } from "@mui/material";
import { useState } from "react";

interface Props {
  onSendMessage: (value: string) => void;
}

const TextFieldMessage = ({ onSendMessage }: Props) => {
  const [formValue, setFormValue] = useState("");

  const handleOnSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    onSendMessage(formValue);
    setFormValue("");
  };

  return (
    <form
      onSubmit={handleOnSendMessage}
      style={{ padding: "0 0.5rem 1rem 0.5rem" }}
    >
      <Paper
        style={{
          padding: "0.5rem 1rem",
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#EAEDEF",
        }}
      >
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="say something nice"
          style={{
            border: "none",
            outline: "none",
            flex: 1,
            backgroundColor: "#EAEDEF",
          }}
        />

        <button type="submit" disabled={!formValue}>
          🕊️
        </button>
      </Paper>
    </form>
  );
};

export default TextFieldMessage;
