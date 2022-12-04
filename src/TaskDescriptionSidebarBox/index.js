// @flow

import React, { memo } from "react"
import SidebarBoxContainer from "../SidebarBoxContainer"
import DescriptionIcon from "@mui/icons-material/Description"
import { styled } from "@mui/material/styles"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { grey } from "@mui/material/colors"
import Markdown from "react-markdown"
import { Box, Typography } from "@mui/material"
import CircleIcon from "@mui/icons-material/Circle"

const theme = createTheme()
const MarkdownContainer = styled("div")(({ theme }) => ({
  paddingLeft: 16,
  paddingRight: 16,
  fontSize: 12,
  "& h1": { fontSize: 18 },
  "& h2": { fontSize: 14 },
  "& h3": { fontSize: 12 },
  "& h4": { fontSize: 12 },
  "& h5": { fontSize: 12 },
  "& h6": { fontSize: 12 },
  "& p": { fontSize: 12 },
  "& a": {},
  "& img": { width: "100%" },
}))

export const TaskDescriptionSidebarBox = ({ description }) => {
  return (
    <ThemeProvider theme={theme}>
      <SidebarBoxContainer
        title="Comments"
        icon={<DescriptionIcon style={{ color: grey[700] }} />}
        expandedByDefault={description && description !== "" ? false : true}
      >
        <MarkdownContainer>
          {/* <Markdown source={description} /> */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              p: "5px",
              cursor: "pointer",
              "&:hover": {
                bgcolor: "#e3f2fd",
                color: "#424242",
              },
            }}
          >
            <CircleIcon
              sx={{
                color: "blueviolet",
              }}
              fontSize="small"
            />
            <Typography>This is comment 1</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              p: "5px",
              cursor: "pointer",
              "&:hover": {
                bgcolor: "#e3f2fd",
                color: "#424242",
              },
            }}
          >
            <CircleIcon
              sx={{
                color: "blueviolet",
              }}
              fontSize="small"
            />
            <Typography>This is comment 1</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              p: "5px",
              cursor: "pointer",
              "&:hover": {
                bgcolor: "#e3f2fd",
                color: "#424242",
              },
            }}
          >
            <CircleIcon
              sx={{
                color: "blueviolet",
              }}
              fontSize="small"
            />
            <Typography>This is comment 1</Typography>
          </Box>
        </MarkdownContainer>
      </SidebarBoxContainer>
    </ThemeProvider>
  )
}

export default memo(TaskDescriptionSidebarBox)
