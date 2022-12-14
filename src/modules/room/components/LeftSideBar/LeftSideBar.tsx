import React from "react";
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
import { Box, MenuItem, MenuList, Typography } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";

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
  cssStyle7: {
    padding: "0 12px",
  },
  cssStyle8: {
    width: "100%",
    padding: "12px 8px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: "8px",
    fontFamily: "Inter",
    fontStyle: "normal",
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "144%",
    letterSpacing: "0.1px",
    color: "#373A43",
  },
  cssStyle9: {
    backgroundColor: "rgba(227, 242, 253, 0.5)",
    color: "#1E88E5",
  },
});

const LeftSideBar = () => {
  const classes = useStyle();
  let navigate = useNavigate();
  let { roomId } = useParams();
  let location = useLocation();

  const items = [
    {
      label: "Bản tin",
      icon: <FeedOutlinedIcon />,
      filledIcon: <FeedIcon />,
      href: "/newsfeed",
    },
    {
      label: "Nơi làm việc",
      icon: <HomeRepairServiceOutlinedIcon />,
      filledIcon: <HomeRepairServiceIcon />,
      href: "/work",
    },
    {
      label: "Thống kê",
      icon: <AssessmentOutlinedIcon />,
      filledIcon: <AssessmentIcon />,
      href: "/statistic",
    },
    {
      label: "Thành viên",
      icon: <PeopleAltOutlinedIcon />,
      filledIcon: <PeopleAltIcon />,
      href: "/member",
    },
  ];

  const room = { name: "Lớp tập huấn sử dụng", id: "SUPERA" };

  return (
    <Box className={classes.cssStyle1}>
      <Box>
        <Box className={classes.cssStyle2}>
          <Typography variant="h6">{room.name ? room.name : "N/A"}</Typography>

          <Typography variant="subtitle2">
            {"Mã phòng: " + (room.id ? room.id : "N/A")}
          </Typography>
        </Box>

        <Typography className={classes.cssStyle5}>Danh mục</Typography>
        <MenuList>
          {items.map((item, index) => {
            return (
              <MenuItem
                key={`left-side-bar-${index}`}
                className={classes.cssStyle7}
                onClick={() => navigate("/room/" + roomId + item.href)}
              >
                <Box
                  className={
                    classes.cssStyle8 +
                    " " +
                    (location.pathname.includes(item.href)
                      ? classes.cssStyle9
                      : "")
                  }
                >
                  {location.pathname.includes(item.href)
                    ? item.filledIcon
                    : item.icon}
                  <Typography variant="body1">{item.label}</Typography>
                </Box>
              </MenuItem>
            );
          })}
        </MenuList>

        <Box className={classes.cssStyle6}>
          <MenuItem
            className={classes.cssStyle7}
            onClick={() => navigate("/room/" + roomId + "/setting-room")}
          >
            <Box
              className={
                classes.cssStyle8 +
                " " +
                (location.pathname.includes("/setting-room")
                  ? classes.cssStyle9
                  : "")
              }
            >
              {location.pathname.includes("/setting-room") ? (
                <SettingsIcon />
              ) : (
                <SettingsOutlinedIcon />
              )}
              <Typography variant="body1">Cài đặt</Typography>
            </Box>
          </MenuItem>
        </Box>
      </Box>
    </Box>
  );
};

export default LeftSideBar;
