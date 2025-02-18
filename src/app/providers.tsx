"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SnackbarProvider } from "notistack";
import Icon from "./_utils/Icon";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <SnackbarProvider
   
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        autoHideDuration={3000}
        transitionDuration={300}
        maxSnack={3}
        dense
        style={{
          zIndex: 9999,
          margin: "10px",
          lineHeight: "1.5",
          padding: "10px",
          borderRadius: "10px",
          flexDirection: "row",
            fontSize: "16px",
            
        }}
      >
        {children}
      </SnackbarProvider>
    </NextUIProvider>
  );
}
