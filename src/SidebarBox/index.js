import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  Typography,
} from "@mui/material"
import RegionIcon from "@mui/icons-material/PictureInPicture"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import React from "react"
import { useState } from "react"
import PreventScrollToParents from "../PreventScrollToParents"

const SidebarBox = ({ children, icon, title, info, expandedByDefault }) => {
  const [expanded, setExpanded] = useState(expandedByDefault)

  return (
    <Box
      sx={{
        borderTop: "1px solid #a8a8a8",
        // borderRight: "1px solid #a8a8a8",
        // minHeight: expanded ? 350 : 0,
        // borderBottom: "1px solid #a8a8a8",
        // borderRadius: "4px",
        // mt: "8px",
        // ml: "8px",
        // m: "8px",
        height: "100%",
      }}
    >
      <Accordion
        expanded={expanded}
        elevation={0}
        sx={{
          height: "100%",
          // borderBottom: "1px solid #A8A8A8",
          // borderTop: "1px solid #A8A8A8",
          "& .MuiCollapse-root": {
            maxHeight: "90%",
            overflow: "auto",

            "&::-webkit-scrollbar-thumb:hover": { backgroundColor: "#555" },
            "&::-webkit-scrollbar-track": {
              // borderRadius: "4px",
              backgroundColor: "#f5f5f5",
              WebkitBoxShadow: "inset 0 0 12px rgba(0,0,0,0.3)",
            },
            "&::-webkit-scrollbar": {
              width: "12px",
              backgroundColor: "#f5f5f5",
            },
            "&::-webkit-scrollbar-thumb": {
              // borderRadius: "4px",
              backgroundColor: "#afb5b8",
              WebkitBoxShadow: "inset 0 0 12px rgba(0,0,0,0.3)",
            },
          },
        }}
      >
        <AccordionSummary
          sx={{
            pointerEvents: "none",
            "& .MuiAccordionSummary-content": {
              display: "flex",
              alignItems: "center",
              gap: "6px",
              margin: 0,
            },
            "& .MuiAccordionSummary-content.Mui-expanded": {
              margin: 0,
            },
          }}
          // expandIcon={
          //   <IconButton
          //     sx={{ pointerEvents: "auto" }}
          //     onClick={() => setExpanded((prev) => !prev)}
          //   >
          //     <ExpandMoreIcon style={{ cursor: "pointer" }} />
          //   </IconButton>
          // }
        >
          {icon}
          <span style={{ fontSize: "15px", fontWeight: "bold" }}>{title}</span>
          {info}
        </AccordionSummary>
        <AccordionDetails
          sx={{
            p: 0,
            maxHeight: "100%",
            overflow: "auto",
            pb: "100px",
          }}
        >
          {children}
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default SidebarBox
