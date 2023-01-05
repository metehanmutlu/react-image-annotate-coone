// @flow
import React, { useState } from "react"
import ReactDOM from "react-dom"
import Editor, { examples } from "./Editor"
import Annotator from "../Annotator"
import ErrorBoundaryDialog from "./ErrorBoundaryDialog.js"
import { Box } from "@mui/material"

export default () => {
  const [annotatorOpen, changeAnnotatorOpen] = useState(false)
  const [annotatorProps, changeAnnotatorProps] = useState(examples["Custom"]())
  const [lastOutput, changeLastOutput] = useState()

  return (
    <div>
      {annotatorOpen ? (
        <ErrorBoundaryDialog
          onClose={() => {
            changeAnnotatorOpen(false)
          }}
        >
          <Box sx={{ m: "30px" }}>
            <Annotator
              {...(annotatorProps: any)}
              onExit={(output) => {
                console.log(output)
                // delete (output: any)["lastAction"]
                // changeLastOutput(output)
                // changeAnnotatorOpen(false)
              }}
              onUploadImage={() => {
                console.log("Image Upload Clicked")
              }}
            />
          </Box>
        </ErrorBoundaryDialog>
      ) : (
        <Editor
          lastOutput={lastOutput}
          onOpenAnnotator={(props) => {
            changeAnnotatorProps(props)
            changeAnnotatorOpen(true)
          }}
        />
      )}
    </div>
  )
}
