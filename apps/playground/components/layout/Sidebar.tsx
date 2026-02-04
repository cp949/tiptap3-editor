"use client";

import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import { 
  Layout, 
  Type, 
  Settings, 
  Github, 
  BookOpen 
} from "lucide-react";

const drawerWidth = 280;

export type Tab = "rich" | "basic" | "custom" | "notion" | "save" | "dark" | "pastel";

interface SidebarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  mobileOpen: boolean;
  onDrawerToggle: () => void;
}

export const Sidebar = ({ activeTab, onTabChange, mobileOpen, onDrawerToggle }: SidebarProps) => {
  const menuItems = [
    {
      id: "rich",
      label: "Rich Editor",
      icon: Layout,
      description: "Full-featured editor"
    },
    {
      id: "basic",
      label: "Basic Editor",
      icon: Type,
      description: "Minimal configuration"
    },
    {
      id: "custom",
      label: "Custom Toolbar",
      icon: Settings,
      description: "Advanced customization"
    },
    {
      id: "notion",
      label: "Notion Style",
      icon: BookOpen,
      description: "Minimalist & Sticky"
    },
    {
      id: "save",
      label: "Save Button",
      icon: Layout,
      description: "External save action"
    },
    {
        id: "dark",
        label: "Dark Mode",
        icon: Layout, 
        description: "Dark theme support"
    },
    {
        id: "pastel",
        label: "Pastel Theme",
        icon: Settings,
        description: "Custom colors & radius"
    }
  ] as const;

  const drawer = (
    <div>
      <Toolbar>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
            @cp949/tiptap3
            </Typography>
            <Typography variant="caption" color="text.secondary">
            Playground & Examples
            </Typography>
        </Box>
      </Toolbar>
      <Divider />
      <Box sx={{ overflow: "auto", flex: 1, py: 2 }}>
        <Typography
            variant="overline"
            display="block"
            sx={{ px: 3, mb: 1, color: "text.secondary", fontWeight: 600 }}
        >
            Examples
        </Typography>
        <List>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <ListItem key={item.id} disablePadding sx={{ px: 2, mb: 0.5 }}>
                <ListItemButton
                  selected={isActive}
                  onClick={() => {
                    onTabChange(item.id);
                    if (mobileOpen) {
                        onDrawerToggle();
                    }
                  }}
                  sx={{
                    borderRadius: 2,
                    '&.Mui-selected': {
                        backgroundColor: 'primary.soft', // Adjust if using customization
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: isActive ? 'primary.main' : 'inherit' }}>
                    <Icon size={20} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.label} 
                    secondary={item.description}
                    primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                    secondaryTypographyProps={{ variant: 'caption', noWrap: true }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
      <Divider />
      <List sx={{ px: 2, pb: 2 }}>
         <ListItem disablePadding>
            <ListItemButton component="a" href="#" sx={{ borderRadius: 2 }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                    <BookOpen size={18} />
                </ListItemIcon>
                <ListItemText primary="Documentation" primaryTypographyProps={{ variant: 'body2' }} />
            </ListItemButton>
         </ListItem>
         <ListItem disablePadding>
            <ListItemButton component="a" href="#" sx={{ borderRadius: 2 }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                    <Github size={18} />
                </ListItemIcon>
                <ListItemText primary="GitHub Repository" primaryTypographyProps={{ variant: 'body2' }} />
            </ListItemButton>
         </ListItem>
      </List>
    </div>
  );

  return (
    <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
    >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={onDrawerToggle}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
        >
            {drawer}
        </Drawer>
        <Drawer
            variant="permanent"
            sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
        >
            {drawer}
        </Drawer>
    </Box>
  );
};
