import React from "react"
import InfoIcon from "@mui/icons-material/Info"
import { Box, Tooltip } from "@mui/material"
import { useEffect } from "react"
import { memo } from "react"
import { useState } from "react"

const NoDescriptionInfo = ({ selectedImage, dispatch }) => {
  const [regionIndex, setRegionIndex] = useState(undefined)

  useEffect(() => {
    const descriptionContainer =
      document.querySelector("div.iconContainer").nextElementSibling
    const subContent = descriptionContainer.querySelector("span")

    descriptionContainer.style.display = "flex"
    descriptionContainer.style.alignItems = "center"
    subContent.style.marginLeft = "10%"
    subContent.style.display = "flex"
    subContent.style.alignItems = "center"
    subContent.style.justifyContent = "center"
  }, [])

  useEffect(() => {
    const index = selectedImage?.regions?.findIndex(
      (region) => !region.comment && true
    )
    setRegionIndex(index)
  }, [selectedImage])

  return (
    <Box
      sx={{
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      component={"span"}
    >
      <Tooltip title="You can improve the process by adding descriptions to your annotations">
        <InfoIcon
          fontSize="small"
          sx={{ color: "orange" }}
          onClick={() => {
            dispatch({
              type: "SELECT_REGION",
              region: selectedImage.regions[regionIndex],
            })
          }}
        />
      </Tooltip>
    </Box>
  )
}

export default memo(NoDescriptionInfo)
