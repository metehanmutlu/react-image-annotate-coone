import React, { useState, memo } from "react"
import {
  Box,
  ButtonBase,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import UploadIcon from "@mui/icons-material/FileUpload"
import PdfIcon from "@mui/icons-material/PictureAsPdf"
import SaveIcon from "@mui/icons-material/Save"
import UndoIcon from "@mui/icons-material/Undo"
import FullscreenIcon from "@mui/icons-material/Fullscreen"
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit"
import CloudIcon from "@mui/icons-material/CloudOutlined"

const Header = ({
  history,
  onRestoreHistory,
  dispatch,
  onExit,
  state,
  fullScreenHandle,
  onUploadImage,
  hideFullScreen,
}) => {
  const menuItems = [
    { icon: UploadIcon, label: "Upload Image" },
    { icon: PdfIcon, label: "Show as PDF", disabled: true },
  ]

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const getSubString = (text, max) =>
    text.length > max ? text.slice(0, max) + "..." : text

  return (
    <>
      <Box
        id="headerBar"
        sx={{
          borderBottom: "1px solid #a8a8a8",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <IconButton onClick={handleClick} sx={{ ml: "4px" }}>
          <MenuIcon />
        </IconButton>
        <Menu
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
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
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              disabled={item.disabled}
              onClick={() => {
                onUploadImage()
                handleClose()
              }}
              sx={{
                fontSize: "15px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {/* <IconButton> */}
              <item.icon sx={{ color: "#757575" }} />
              {/* </IconButton> */}
              {item.label}
            </MenuItem>
          ))}
        </Menu>

        <Tooltip title="Save">
          <IconButton
            onClick={() => {
              onExit(state)
            }}
          >
            <SaveIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Undo">
          <IconButton
            disabled={history.length === 0}
            onClick={() => onRestoreHistory()}
          >
            <UndoIcon />
          </IconButton>
        </Tooltip>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontWeight: "bold",
            mx: "auto",
          }}
        >
          <CloudIcon sx={{ color: "#757575" }} />
          {state.images[state.selectedImage]?.name}
        </Box>

        {!hideFullScreen && (
          <Tooltip title={state.fullScreen ? "Window" : "Fullscreen"}>
            <IconButton
              sx={{
                ml: "auto",
                mr: "10px",
              }}
              onClick={() => {
                if (state.fullScreen) {
                  fullScreenHandle.exit()
                  dispatch({
                    type: "HEADER_BUTTON_CLICKED",
                    buttonName: "window",
                  })
                } else {
                  fullScreenHandle.enter()
                  dispatch({
                    type: "HEADER_BUTTON_CLICKED",
                    buttonName: "fullscreen",
                  })
                }
              }}
            >
              {state.fullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <Box
        sx={{
          ml: "50px",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          overflowX: "auto",
          // borderRight: "1px solid #a8a8a8",

          "&::-webkit-scrollbar-thumb:hover": { backgroundColor: "#555" },
          "&::-webkit-scrollbar-track": {
            borderRadius: "4px",
            backgroundColor: "#f5f5f5",
            WebkitBoxShadow: "inset 0 0 4px rgba(0,0,0,0.3)",
          },
          "&::-webkit-scrollbar": {
            height: "12px",
            backgroundColor: "#f5f5f5",
          },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: "4px",
            backgroundColor: "#afb5b8",
            WebkitBoxShadow: "inset 0 0 4px rgba(0,0,0,0.3)",
          },
        }}
      >
        {state.images.map((img, i) => (
          <ButtonBase
            onClick={() => {
              dispatch({
                type: "SELECT_IMAGE",
                imageIndex: i,
                image: state.images[i],
              })
            }}
            key={i}
            sx={{
              // borderRadius: "2px",
              borderBottom: "4px solid #a8a8a8",
              borderLeft: "1px solid #a8a8a8",
              borderRight: "1px solid #a8a8a8",
              borderBottomColor: state.selectedImage === i && "#2c88d9",
              p: "12px",
              boxShadow:
                state.selectedImage === i &&
                "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",

              transition: "all 0.4s ease",
            }}
          >
            {getSubString(img.name, "12")}
          </ButtonBase>
        ))}
      </Box>
    </>
  )
}

export default memo(Header)
