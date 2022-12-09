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
import dispatch from "../Annotator/reducers/general-reducer"
import { useEffect } from "react"
import { useState } from "react"

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

export const TaskDescriptionSidebarBox = ({ description, state, dispatch }) => {
  const selectedImage = state.images[state.selectedImage]
// console.log(state);
  return (
    <ThemeProvider theme={theme}>
      <SidebarBoxContainer
        title="Comments"
        icon={<DescriptionIcon style={{ color: grey[700] }} />}
        // expandedByDefault={description && description !== "" ? false : true}
      >
        <MarkdownContainer>
          {selectedImage?.regions?.map(
            (region) =>
              region.comment && (
                <Box
                  key={region.id}
                  onClick={() => {
                    const regionIndex = selectedImage.regions.findIndex(
                      (r) => r.id === region.id
                    )
                    console.log(region)
                    dispatch({
                      type: "SELECT_REGION",
                      region: selectedImage.regions[regionIndex],
                    })
                  }}
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
                    bgcolor:
                      region.editingLabels && region.highlighted
                        ? "#BBDEFB"
                        : "transparent",
                  }}
                >
                  <CircleIcon
                    sx={{
                      color: region.color,
                    }}
                    fontSize="small"
                  />
                  <Typography>{region.comment}</Typography>
                </Box>
              )
          )}
        </MarkdownContainer>
      </SidebarBoxContainer>
    </ThemeProvider>
  )
}

export default memo(TaskDescriptionSidebarBox)
