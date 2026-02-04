import React, { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { Menu } from "lucide-react";
import { Sidebar, Tab } from "./Sidebar";

const drawerWidth = 280;

interface AppShellProps {
  children: React.ReactNode;
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export const AppShell = ({ children, activeTab, onTabChange }: AppShellProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          display: { sm: 'none' }, // Only show on mobile
          bgcolor: 'background.paper',
          color: 'text.primary',
          boxShadow: 1
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <Menu />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={onTabChange}
        mobileOpen={mobileOpen}
        onDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{ 
            flexGrow: 1, 
            p: { xs: 2, sm: 3 }, // Reduce padding on mobile
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            mt: { xs: '56px', sm: 0 }, // Add margin top for AppBar on mobile
            minWidth: 0, // Prevent flex item from overflowing
            overflowX: 'hidden' // Prevent horizontal scroll
        }}
      >
        <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
            {children}
        </Box>
      </Box>
    </Box>
  );
};
