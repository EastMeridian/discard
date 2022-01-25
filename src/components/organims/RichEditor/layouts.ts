import { ToggleButtonGroup } from "@mui/material";
import Paper from "@mui/material/Paper";
import ToggleButton from "@mui/material/ToggleButton";

import styled from "styled-components";

export const RichEditorPaper = styled(Paper)`
  padding: 0.5rem 0.75rem;
  display: flex;
  flex-direction: column;
  background-color: white;
  cursor: text;
`;

export const RichEditorContainer = styled.div`
  padding: 0.6rem 0;
  flex: 1;
`;

export const RichEditorLayout = styled.div`
  display: flex;
  align-items: center;
`;

export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const FormatContainer = styled.div`
  display: flex;
  & > *:not(:last-child) {
    margin-right: 0.25rem;
  }
`;

export const InsertContainer = styled.div`
  display: flex;
  & > *:not(:first-child) {
    margin-left: 0.25rem;
  }
`;

export const FileContainer = styled.div`
  display: flex;
  padding: 0.5rem 0;
  gap: 0.5rem;
`;

export const StyledToggleButton = styled(ToggleButton)({
  border: 0,
});

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)({
  "& .MuiToggleButtonGroup-grouped": {
    border: 0,
  },
});
