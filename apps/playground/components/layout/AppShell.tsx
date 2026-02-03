"use client";

import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Sidebar, Tab } from "./Sidebar";

interface AppShellProps {
  children: React.ReactNode;
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export const AppShell = ({ children, activeTab, onTabChange }: AppShellProps) => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Sidebar activeTab={activeTab} onTabChange={onTabChange} />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
            {children}
        </Box>
      </Box>
    </Box>
  );
};
