import React, { useState } from "react";
import MenuItem from "./LeftSideBarUtilComponent";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import FeedIcon from "@mui/icons-material/Feed";
import HomeRepairServiceOutlinedIcon from "@mui/icons-material/HomeRepairServiceOutlined";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";

const useStyle = makeStyles({
  cssStyle1: {
    width: "232px",
    position: "fixed",
    left: 0,
    top: 0,
    bottom: 0,
    borderRight: "1.5px solid rgba(231, 232, 239, 0.8)",
    fontFamily: "Inter",
    fontStyle: "normal",
    background: "white",
  },
  cssStyle2: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "16px 20px 8px",
    gap: "4px",
    borderBottom: "1px solid #E7E8EF",
  },
  cssStyle3: {
    margin: 0,
    fontSize: "16px",
    fontWeight: 600,
    lineHeight: "150%",
    letterSpacing: "0.15px",
    color: "#202227",
  },
  cssStyle4: {
    fontSize: "12px",
    fontWeight: 400,
    lineHeight: "130%",
    letterSpacing: "0.4px",
    color: "#4E525F",
  },
  cssStyle5: {
    padding: "16px 20px 8px",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "130%",
    letterSpacing: "0.4px",
    color: "#373A43",
  },
  cssStyle6: {
    width: "100%",
    paddingTop: "8px",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTop: "1px solid #E7E8EF",
  },
});

const LeftSideBar = () => {
  const [selection, setSelection] = useState(-1);
  const items = [
    { label: "Bản tin", icon: <FeedOutlinedIcon />, filledIcon: <FeedIcon /> },
    {
      label: "Nơi làm việc",
      icon: <HomeRepairServiceOutlinedIcon />,
      filledIcon: <HomeRepairServiceIcon />,
    },
    {
      label: "Thống kê",
      icon: <AssessmentOutlinedIcon />,
      filledIcon: <AssessmentIcon />,
    },
    {
      label: "Thành viên",
      icon: <PeopleAltOutlinedIcon />,
      filledIcon: <PeopleAltIcon />,
    },
  ];
  const classes = useStyle();
  const roomName = "Lớp tập huấn sử dụng";
  const roomID = "SUPERA";

  return (
    <Box className={classes.cssStyle1}>
      <Box>
        <Box className={classes.cssStyle2}>
          <h3 className={classes.cssStyle3}>{roomName ? roomName : "N/A"}</h3>
          <Box className={classes.cssStyle4}>
            {"Mã phòng: " + (roomID ? roomID : "N/A")}
          </Box>
        </Box>

        <Box className={classes.cssStyle5}>{"Danh mục"}</Box>
        {items.map((item, index) => {
          return (
            <MenuItem
              label={item.label}
              icon={item.icon}
              filledIcon={item.filledIcon}
              isSelected={selection === index}
              onClick={() => setSelection(index === selection ? -1 : index)}
            />
          );
        })}

        <Box className={classes.cssStyle6}>
          <MenuItem
            label="Cài đặt"
            icon={<SettingsOutlinedIcon />}
            filledIcon={<SettingsIcon />}
            isSelected={selection === items.length}
            onClick={() =>
              setSelection(selection === items.length ? -1 : items.length)
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

export default LeftSideBar;
