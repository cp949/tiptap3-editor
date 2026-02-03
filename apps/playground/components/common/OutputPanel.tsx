import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

interface OutputPanelProps {
  title: string;
  count?: number;
  children: React.ReactNode;
}

export const OutputPanel = ({ title, count, children }: OutputPanelProps) => {
  return (
    <Card variant="outlined" sx={{ mt: 4, bgcolor: "grey.50" }}>
      <CardHeader
        title={
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant="subtitle2" fontWeight="bold">
              {title}
            </Typography>
            {count !== undefined && (
              <Chip label={`${count} chars`} size="small" variant="outlined" />
            )}
          </Box>
        }
        sx={{ py: 1.5, px: 2, borderBottom: 1, borderColor: "divider", bgcolor: "white" }}
      />
      <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
        <Box
          component="pre"
          sx={{
            p: 2,
            m: 0,
            overflow: "auto",
            fontSize: "0.875rem",
            fontFamily: "monospace",
            color: "grey.800",
            bgcolor: "grey.50",
            maxHeight: 300,
          }}
        >
          {children}
        </Box>
      </CardContent>
    </Card>
  );
};
