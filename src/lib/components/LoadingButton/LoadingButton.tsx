import { Button, ButtonProps, CircularProgress } from "@mui/material";
import React, { ReactNode } from "react";

const LoadingButton = ({
  children,
  loading,
  ...buttonProps
}: {
  children: ReactNode;
  loading: boolean;
} & ButtonProps) => {
  return (
    <Button
      disabled={loading || buttonProps.disabled}
      style={{ textTransform: "none", padding: "12px 16px 12px 16px" }}
      {...buttonProps}
      startIcon={
        loading ? (
          <CircularProgress size="20px" color="inherit" />
        ) : (
          buttonProps.startIcon
        )
      }
    >
      {children}
    </Button>
  );
};

export default LoadingButton;
