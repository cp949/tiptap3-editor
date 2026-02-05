"use client";

import "@cp949/tiptap3-editor/style.css";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { ExternalLink, Code } from "lucide-react";

import { AppShell } from "../components/layout/AppShell";
import { CustomToolbarExample } from "../components/examples/CustomToolbarExample";
import { BasicEditorExample } from "../components/examples/BasicEditorExample";
import { SaveButtonExample } from "../components/examples/SaveButtonExample";
import { RichEditorExample } from "../components/examples/RichEditorExample";
import { NotionStyleExample } from "../components/examples/styles/NotionStyleExample";
import { DarkThemeExample } from "../components/examples/styles/DarkThemeExample";
import { PastelThemeExample } from "../components/examples/styles/PastelThemeExample";
import { UncontrolledEditorExample } from "../components/examples/UncontrolledEditorExample";
import { ResizingExample } from "../components/examples/ResizingExample";
import type { Tab } from "../components/layout/Sidebar";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("rich");

  const tabInfo: Record<Tab, { title: string; description: string; componentName: string; color: "primary" | "secondary" | "success" | "warning" | "error" | "info" | "default" }> = {
    rich: {
      title: "Rich Editor",
      description: "A fully loaded editor with all available extensions and features enabled by default.",
      componentName: "<RichEditor />",
      color: "primary",
    },
    basic: {
      title: "Basic Editor",
      description: "A lightweight version with essential formatting tools, perfect for comments or simple posts.",
      componentName: "<BasicEditor />",
      color: "success",
    },
    uncontrolled: {
        title: "Uncontrolled Editor",
        description: "Optimized for performance using initialContent. No React re-render overhead on typing.",
        componentName: "<TiptapEditor />",
        color: "secondary",
    },
    custom: {
      title: "Custom Toolbar",
      description: "Demonstrates how to completely customize the toolbar layout and available tools.",
      componentName: "<TiptapEditor.Toolbar />",
      color: "secondary",
    },
    notion: {
      title: "Notion Style",
      description: "A minimalist design inspired by Notion with sticky toolbar and backdrop blur.",
      componentName: "<TiptapEditor />",
      color: "default",
    },
    save: {
      title: "Save Button Example",
      description: "Demonstrates how to access the editor content externally when a button is clicked.",
      componentName: "<SaveButtonExample />",
      color: "info",
    },
    resizing: {
      title: "Resizing Example",
      description: "Demonstrates how to toggle editor height between different sizes using the height prop.",
      componentName: "<RichEditor height={...} />",
      color: "primary",
    },
    dark: {
      title: "Dark Mode",
      description: "Full dark mode support using CSS variable overrides.",
      componentName: "<RichEditor />",
      color: "default",
    },
    pastel: {
      title: "Pastel Theme",
      description: "A playful theme showing how to drastically change the look with just CSS variables.",
      componentName: "<RichEditor />",
      color: "warning",
    },
  };

  const currentInfo = tabInfo[activeTab];

  return (
    <AppShell activeTab={activeTab} onTabChange={setActiveTab}>
      <Stack spacing={4} sx={{ mb: 4 }}>
        <Grid container justifyContent="space-between" alignItems="flex-start" spacing={2}>
            <Grid size={{ xs: 12, md: 8 }}>
                <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
                    {currentInfo.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {currentInfo.description}
                </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
                <Stack direction="row" spacing={1} justifyContent={{ md: 'flex-end' }}>
                     <Button variant="outlined" startIcon={<Code size={16} />}>
                        View Code
                     </Button>
                     <Button variant="outlined" startIcon={<ExternalLink size={16} />}>
                        Docs
                     </Button>
                </Stack>
            </Grid>
        </Grid>

        <Stack direction="row" spacing={1} alignItems="center">
            <Chip 
                label={currentInfo.componentName} 
                color={currentInfo.color} 
                variant="filled" 
                size="small" 
                sx={{ borderRadius: 1 }}
            />
            <Typography variant="caption" color="text.disabled">|</Typography>
            <Typography variant="caption" color="text.secondary">TypeScript Support</Typography>
            <Typography variant="caption" color="text.disabled">|</Typography>
            <Typography variant="caption" color="text.secondary">Tailwind Styled</Typography>
        </Stack>

        <Card variant="outlined" sx={{ minHeight: 500 }}>
            <CardContent>
                {activeTab === "rich" && <RichEditorExample />}
                {activeTab === "basic" && <BasicEditorExample />}
                {activeTab === "uncontrolled" && <UncontrolledEditorExample />}
                {activeTab === "custom" && <CustomToolbarExample />}
                {activeTab === "notion" && <NotionStyleExample />}
                {activeTab === "save" && <SaveButtonExample />}
                {activeTab === "resizing" && <ResizingExample />}
                {activeTab === "dark" && <DarkThemeExample />}
                {activeTab === "pastel" && <PastelThemeExample />}
            </CardContent>
        </Card>
      </Stack>
    </AppShell>
  );
}
