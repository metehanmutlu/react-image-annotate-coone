// @flow

import React, { Fragment, useState, memo } from "react"
import SidebarBoxContainer from "../SidebarBoxContainer"
import { makeStyles } from "@mui/styles"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { styled } from "@mui/material/styles"
import { grey } from "@mui/material/colors"
import RegionIcon from "@mui/icons-material/PictureInPicture"
import Grid from "@mui/material/Grid"
import ReorderIcon from "@mui/icons-material/SwapVert"
import PieChartIcon from "@mui/icons-material/PieChart"
import TrashIcon from "@mui/icons-material/Delete"
import LockIcon from "@mui/icons-material/Lock"
import UnlockIcon from "@mui/icons-material/LockOpen"
import VisibleIcon from "@mui/icons-material/Visibility"
import VisibleOffIcon from "@mui/icons-material/VisibilityOff"
import styles from "./styles"
import classnames from "classnames"
import isEqual from "lodash/isEqual"
import LabelFilterMenu from "../LabelFilterMenu"
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp"
import LabelIcon from "@mui/icons-material/Label"
import CommentIcon from "@mui/icons-material/Comment"
import DisabledCommentIcon from "@mui/icons-material/CommentsDisabled"
import FileIcon from "@mui/icons-material/InsertDriveFile"
import LaunchIcon from "@mui/icons-material/Launch"
import MuiAccordion from "@mui/material/Accordion"
import MuiAccordionSummary from "@mui/material/AccordionSummary"
import MuiAccordionDetails from "@mui/material/AccordionDetails"
import { colors } from "../colors"
import { useEffect } from "react"
import SidebarBox from "../SidebarBox"
import {
  Autocomplete,
  Box,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material"
import Select from "react-select"
import { asMutable } from "seamless-immutable"

const theme = createTheme()
const useStyles = makeStyles((theme) => styles)

const HeaderSep = styled("div")(({ theme }) => ({
  borderTop: `1px solid ${grey[200]}`,
  marginTop: 2,
  marginBottom: 2,
}))

const Chip = ({ color, text }) => {
  const classes = useStyles()
  return (
    <span className={classes.chip}>
      <div className="color" style={{ backgroundColor: color }} />
      <div className="text">{text}</div>
    </span>
  )
}

const RowLayout = ({
  header,
  highlighted,
  order,
  classification,
  area,
  tags,
  trash,
  lock,
  comment,
  visible,
  onClick,
  regionClsList,
  cls,
  onChangeRegion,
  region,
  allowComments,
}) => {
  const classes = useStyles()
  const [mouseOver, changeMouseOver] = useState(false)
  // console.log(region)
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => changeMouseOver(true)}
      onMouseLeave={() => changeMouseOver(false)}
      className={classnames(classes.row, { header, highlighted })}
      style={{
        paddingLeft: "10px",
      }}
    >
      <Grid container alignItems="center">
        <Grid item xs={2}>
          <div style={{ textAlign: "right", paddingRight: 10 }}>{order}</div>
        </Grid>
        <Grid item xs={5}>
          {classification}
          {/* <Select
            placeholder="Select"
            onChange={(e, actionMeta) => {
              onChangeRegion({ ...region, cls: e.value })
            }}
            value={{ label: cls, value: cls }}
            options={asMutable(
              regionClsList.map((cls) => ({
                value: cls,
                label: cls,
              }))
            )}
            maxMenuHeight={150}
          /> */}
        </Grid>
        <Grid item xs={2}>
          <div style={{ textAlign: "right", paddingRight: 6 }}>{area}</div>
        </Grid>
        <Grid item xs={1}>
          {trash}
        </Grid>
        {allowComments ? (
          <Grid item xs={1}>
            {comment}
          </Grid>
        ) : (
          <Grid item xs={1}>
            {lock}
          </Grid>
        )}
        <Grid item xs={1}>
          {visible}
        </Grid>
      </Grid>
      {region.showComment && (
        <Box
          sx={{
            display: "flex",
            border: "1px solid #a8a8a8",
            borderRadius: "2px",
            maxHeight: "3rem",
            overflow: "hidden",
            m: "6px",
            p: "6px",
          }}
        >
          {region.comment}
        </Box>
      )}
    </div>
  )
}

const RowHeader = () => {
  return (
    <RowLayout
      header
      highlighted={false}
      order={<ReorderIcon className="icon" />}
      classification={<div style={{ paddingLeft: 10 }}>Class</div>}
      area={<PieChartIcon className="icon" />}
      trash={<TrashIcon className="icon" />}
      lock={<LockIcon className="icon" />}
      visible={<VisibleIcon className="icon" />}
      comment={<CommentIcon className="icon" />}
    />
  )
}

const MemoRowHeader = memo(RowHeader)

const Row = ({
  region: r,
  highlighted,
  onSelectRegion,
  onDeleteRegion,
  onChangeRegion,
  visible,
  locked,
  color,
  cls,
  showComment,
  index,
  regionClsList,
  comment,
  allowComments,
}) => {
  return (
    <RowLayout
      allowComments={allowComments}
      region={r}
      onChangeRegion={onChangeRegion}
      cls={cls}
      regionClsList={regionClsList}
      header={false}
      highlighted={highlighted}
      onClick={() => onSelectRegion(r)}
      order={`#${index + 1}`}
      classification={<Chip text={cls || ""} color={color || "#ddd"} />}
      area=""
      trash={<TrashIcon onClick={() => onDeleteRegion(r)} className="icon2" />}
      comment={
        r.comment ? (
          r.showComment ? (
            <DisabledCommentIcon
              onClick={() => onChangeRegion({ ...r, showComment: false })}
              className="icon2"
            />
          ) : (
            <CommentIcon
              onClick={() => onChangeRegion({ ...r, showComment: true })}
              className="icon2"
            />
          )
        ) : (
          <Tooltip title="You can improve the process by adding descriptions to your annotations">
            <CommentIcon
              onClick={() => {
                setTimeout(() => {
                  const textArea = document.querySelector(
                    'textarea[placeholder="Description..."]'
                  )
                  textArea && textArea.click()
                }, 200)
              }}
              className="icon3"
            />
          </Tooltip>
        )
      }
      lock={
        r.locked ? (
          <LockIcon
            onClick={() => onChangeRegion({ ...r, locked: false })}
            className="icon2"
          />
        ) : (
          <UnlockIcon
            onClick={() => onChangeRegion({ ...r, locked: true })}
            className="icon2"
          />
        )
      }
      visible={
        r.visible || r.visible === undefined ? (
          <VisibleIcon
            onClick={() => onChangeRegion({ ...r, visible: false })}
            className="icon2"
          />
        ) : (
          <VisibleOffIcon
            onClick={() => onChangeRegion({ ...r, visible: true })}
            className="icon2"
          />
        )
      }
    />
  )
}

const MemoRow = memo(
  Row,
  (prevProps, nextProps) =>
    prevProps.highlighted === nextProps.highlighted &&
    prevProps.visible === nextProps.visible &&
    prevProps.locked === nextProps.locked &&
    prevProps.id === nextProps.id &&
    prevProps.index === nextProps.index &&
    prevProps.cls === nextProps.cls &&
    prevProps.color === nextProps.color &&
    prevProps.showComment === nextProps.showComment &&
    prevProps.comment === nextProps.comment
)

const emptyArr = []

export const RegionSelectorSidebarBox = ({
  state,
  dispatch,
  regions = emptyArr,
  onDeleteRegion,
  onChangeRegion,
  onSelectRegion,
}) => {
  const [expandedIndex, setExpandedIndex] = useState()
  const [regionsObject, setRegionsObject] = useState({})
  const [filterType, setFilterType] = useState(0)
  const [filteredRegionClsList, setFilteredRegionClsList] = useState(
    state.regionClsList
  )
  const classes = useStyles()

  const getRemainingLabels = () => {
    const { regionClsList } = state
    const regionClsObject = {}

    regionClsList.forEach((cls) => {
      regionClsObject[cls] = false
    })

    state.images.forEach((img) => {
      if (img.regions) {
        img.regions.forEach((region) => {
          if (region.cls) {
            regionClsObject[region.cls] = true
          }
        })
      }
    })

    setRegionsObject(regionClsObject)
    return `(${
      Object.values(regionClsObject).filter((region) => region).length
    }/${Object.keys(regionClsObject).length})`
  }

  const getRegionColorByCls = (cls) => {
    const { regionClsList } = state
    const index = regionClsList.findIndex((regionCls) => regionCls === cls)
    return colors[index]
  }

  const getSubString = (text, max) =>
    text.length > max ? text.slice(0, max) + "..." : text

  useEffect(() => {
    getRemainingLabels()
  }, [regions])

  useEffect(() => {
    const preventScroll = () => {
      const selectButton = document.querySelector('button[aria-label="Select"')
      selectButton.click()
    }
    preventScroll()
  }, [])

  useEffect(() => {
    switch (filterType) {
      case 0:
        const allRegions = state.regionClsList
        setFilteredRegionClsList(allRegions)
        break
      case 1:
        const labeledRegions = []
        for (const [key, value] of Object.entries(regionsObject)) {
          if (value) {
            labeledRegions.push(key)
          }
        }
        setFilteredRegionClsList(labeledRegions)
        break
      case 2:
        const unlabeledRegions = []
        for (const [key, value] of Object.entries(regionsObject)) {
          if (!value) {
            unlabeledRegions.push(key)
          }
        }
        setFilteredRegionClsList(unlabeledRegions)
        break
      default:
        break
    }
  }, [filterType, regionsObject])

  return (
    <ThemeProvider theme={theme}>
      <SidebarBox
        info={
          <LabelFilterMenu
            filterType={filterType}
            setFilterType={setFilterType}
          />
        }
        title={`Labels (${
          Object.values(regionsObject).filter((region) => region).length
        }/${Object.keys(regionsObject).length})`}
        subTitle=""
        icon={<RegionIcon style={{ color: grey[700] }} />}
        expandedByDefault={true}
      >
        <div className={classes.container}>
          {filteredRegionClsList.map((r, i) => (
            <Accordion key={i} disabled={!regionsObject[r]}>
              <AccordionSummary>
                <LabelIcon
                  fontSize="small"
                  sx={{
                    color: getRegionColorByCls(r),
                  }}
                />
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "14px",
                  }}
                >
                  {r}
                </span>
              </AccordionSummary>
              <AccordionDetails>
                {state.images.map((img, i) => {
                  if (img.regions) {
                    if (img.regions.find((region) => region.cls === r)) {
                      return (
                        <Accordion
                          key={i}
                          sx={{
                            "& .MuiAccordionSummary-root": {
                              p: 0,
                              pl: "30px",
                              minHeight: "40px",
                            },
                          }}
                        >
                          <AccordionSummary>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                                width: "100%",
                              }}
                            >
                              <FileIcon
                                fontSize="small"
                                sx={{ color: "#757575" }}
                              />
                              <span
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  fontSize: "12px",
                                }}
                              >
                                {getSubString(img.name, 18)}
                              </span>
                              {state.selectedImage !==
                                state.images.findIndex(
                                  (i) => i.name === img.name
                                ) && (
                                <Tooltip title="Go to image">
                                  <IconButton
                                    onClick={() => {
                                      const imageIndex = state.images.findIndex(
                                        (i) => i.name === img.name
                                      )
                                      dispatch({
                                        type: "SELECT_IMAGE",
                                        imageIndex: imageIndex,
                                        image: state.images[imageIndex],
                                      })
                                    }}
                                    sx={{ ml: "auto", mr: "18px" }}
                                  >
                                    <LaunchIcon fontSize="small" sx={{}} />
                                  </IconButton>
                                </Tooltip>
                              )}
                            </Box>
                          </AccordionSummary>
                          <AccordionDetails>
                            {img.regions
                              .filter((region) => region.cls === r)
                              .map((region, i) => (
                                <MemoRow
                                  key={region.id}
                                  {...region}
                                  region={region}
                                  index={i}
                                  onSelectRegion={onSelectRegion}
                                  onDeleteRegion={onDeleteRegion}
                                  onChangeRegion={onChangeRegion}
                                  regionClsList={state.regionClsList}
                                  allowComments={state.allowComments}
                                />
                              ))}
                          </AccordionDetails>
                        </Accordion>
                      )
                    }
                  }
                })}
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </SidebarBox>
    </ThemeProvider>
  )
}

const Accordion = styled((props) => (
  <MuiAccordion disableGutters square {...props} />
))(({ theme }) => ({
  borderTop: `1px solid #a8a8a8`,
  "&:before": {
    display: "none",
  },
  "& .MuiCollapse-vertical": {
    overflow: "hidden",
  },
}))

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  margin: 0,
  "& .MuiAccordionSummary-content": {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    margin: 0,
  },
  "& .MuiAccordionSummary-content.Mui-expanded": {
    margin: 0,
  },
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  borderTop: "1px solid rgba(0, 0, 0, .125)",
  padding: 0,
}))

const mapUsedRegionProperties = (r) => [
  r.id,
  r.color,
  r.locked,
  r.visible,
  r.highlighted,
  r.showComment,
  r.comment,
]

export default memo(RegionSelectorSidebarBox, (prevProps, nextProps) =>
  isEqual(
    (prevProps.regions || emptyArr).map(mapUsedRegionProperties),
    (nextProps.regions || emptyArr).map(mapUsedRegionProperties)
  )
)
