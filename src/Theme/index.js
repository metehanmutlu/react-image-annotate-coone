// @flow

import React from "react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles((theme) => ({
  container: {
    fontFamily: [
      "Quicksand",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
}))

const theme = createTheme({
  typography: {
    fontFamily: [
      "Quicksand",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: "none",
      },
    },
  },
})

export const Theme = ({ children }: any) => {
  const classes = useStyles()
  return (
    <ThemeProvider theme={theme}>
      {/* <div className={classes.container}>{children}</div> */}
      <div>{children}</div>
    </ThemeProvider>
  )
}

export default Theme
