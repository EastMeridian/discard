import { LinearProgress, Box } from "@mui/material";
import { useMemo, useState } from "react";
import { createGenericContext } from "utils/createGenericContext";

interface SnackbarContext {
  enqueueSnackbar: (message: string) => void;
  setLoading: (value: boolean) => void;
}

const [useSnackbar, SnackbarContextProvider] =
  createGenericContext<SnackbarContext>();

interface SnackbarContextProviderProviderProps {
  children: React.ReactNode;
}

const SnackbarProvider = ({
  children,
}: SnackbarContextProviderProviderProps) => {
  const [isLoading, setLoading] = useState(false);

  const enqueueSnackbar = (message: string) => {};

  const value = useMemo(() => ({ enqueueSnackbar, setLoading }), []);
  return (
    <SnackbarContextProvider value={value}>
      {isLoading && (
        <Box sx={{ width: "100%", position: "fixed", zIndex: 99999 }}>
          <LinearProgress />
        </Box>
      )}
      {children}
    </SnackbarContextProvider>
  );
};

export { useSnackbar, SnackbarProvider };
