// @flow

import React, { memo } from "react"
import SidebarBoxContainer from "../SidebarBoxContainer"
import DescriptionIcon from "@mui/icons-material/Description"
import { styled } from "@mui/material/styles"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { grey } from "@mui/material/colors"
import { Box, Typography } from "@mui/material"
import CircleIcon from "@mui/icons-material/Circle"
import { useEffect, useState } from "react"
import NoDescriptionInfo from "../NoDescriptionInfo"
import TrashIcon from "@mui/icons-material/Delete"

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
  const [hasDescription, setHasDescription] = useState(null)

  useEffect(() => {
    if (selectedImage.regions?.length) {
      const anyDescription = selectedImage?.regions?.filter((region) => {
        if (!region.comment) {
          return region
        }
      })
      // console.log(anyDescription.length)
      setHasDescription(anyDescription?.length)
    } else {
      setHasDescription(null)
    }
  }, [selectedImage])

  useEffect(() => {
    // console.log(hasDescription)
  }, [hasDescription])

  return (
    <ThemeProvider theme={theme}>
      <SidebarBoxContainer
        info={
          hasDescription > 0 ? (
            <NoDescriptionInfo
              selectedImage={selectedImage}
              dispatch={dispatch}
            />
          ) : null
        }
        title="Descriptions"
        icon={<DescriptionIcon style={{ color: grey[700] }} />}
        expandedByDefault={true}
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
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <CircleIcon
                    sx={{
                      color: region.color,
                    }}
                    fontSize="small"
                  />
                  <Typography>{region.comment}</Typography>
                  <TrashIcon
                    fontSize="small"
                    onClick={() => {
                      const regionIndex = selectedImage.regions.findIndex(
                        (r) => r.id === region.id
                      )
                      const newRegion = {
                        ...selectedImage.regions[regionIndex],
                        comment: "",
                      }
                      dispatch({
                        type: "CHANGE_REGION",
                        region: newRegion,
                      })
                    }}
                    sx={{
                      ml: "auto",
                      position: "absolute",
                      right: "6px",
                    }}
                  />
                </Box>
              )
          )}
        </MarkdownContainer>
      </SidebarBoxContainer>
    </ThemeProvider>
  )
}

export default memo(TaskDescriptionSidebarBox)
