import { Badge, Box, IconButton, Menu, MenuItem } from "@mui/material"
import React, { useEffect, useState } from "react"
import FilterIcon from "@mui/icons-material/FilterList"
import DoneIcon from "@mui/icons-material/Done"
import { styled, experimental_sx as sx } from "@mui/system"

const LabelFilterMenu = ({ filterType, setFilterType }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const filterMenuItems = ["All", "Labeled", "Unlabeled"]

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box sx={{ ml: "auto", pointerEvents: "auto" }}>
      <IconButton onClick={handleClick}>
        {filterType !== 0 ? (
          <Badge color="primary" variant="dot">
            <FilterIcon fontSize="small" />
          </Badge>
        ) : (
          <FilterIcon fontSize="small" />
        )}
      </IconButton>

      <FilterMenu
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            // backgroundColor: "#e9e9e9",
          },
        }}
        MenuListProps={{
          style: {
            display: "flex",
            flexDirection: "column",
            flex: 1,
          },
        }}
      >
        {filterMenuItems.map((item, index) => (
          <FilterMenuItem
            onClick={() => {
              setFilterType(index)
              handleClose()
            }}
          >
            <DoneIcon
              sx={{
                color: filterType !== index && "transparent",
                transition: "all 0.2s ease",
              }}
              fontSize="small"
            />
            {item}
          </FilterMenuItem>
        ))}
      </FilterMenu>
    </Box>
  )
}
const FilterMenu = styled(Menu)(sx({}))
const FilterMenuItem = styled(MenuItem)(
  sx({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    transition: "all 0.2s ease",
  })
)

export default LabelFilterMenu
