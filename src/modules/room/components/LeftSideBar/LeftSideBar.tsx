import React, { useMemo, useState } from "react";
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
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { makeStyles } from "@mui/styles";
import {
  Box,
  CircularProgress,
  Divider,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../../../lib/provider/UserProvider";
import CopyToClipboardBox from "../../../../lib/components/CopyToClipboardBox/CopyToClipboardBox";
import { useRooms } from "../../../../lib/provider/RoomsProvider";

const useStyle = makeStyles({
  container: {
    height: "calc(100vh - 66px)",
    width: "244px",
    borderRight: "1.5px solid rgba(231, 232, 239, 0.8)",
    fontFamily: "Inter",
    fontStyle: "normal",
    background: "white",
    left: 0,
    position: "relative",
    transition: "left  200ms linear 0s",
  },
  collapse: {
    left: "-232px",
  },
  collapseButton: {
    position: "absolute",
    width: 24,
    height: 24,
    borderRadius: "100%",
    right: "-12px",
    top: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#FFFFFF",
    color: "#6B778C",
    boxShadow:
      "rgb(9 30 66 / 8%) 0px 0px 0px 1px, rgb(9 30 66 / 8%) 0px 2px 4px 1px",
    cursor: "pointer",
    border: "1px solid rgba(227, 242, 253, 0.5)",
    opacity: 0,
    transition:
      "background-color 100ms linear 0s, color 100ms linear 0s, opacity 550ms cubic-bezier(0.2, 0, 0, 1) 0s",
    "&:hover": {
      background: "#4C9AFF",
      color: "#FFFFFF",
      opacity: 1,
    },
  },
  menuItem: {
    padding: "0 12px",
    width: "100%",
  },
  itemBox: {
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
  selection: {
    backgroundColor: "rgba(227, 242, 253, 0.5)",
    color: "#1E88E5",
  },
});

const LeftSideBar = () => {
  const classes = useStyle();
  const { user } = useUser();
  const navigate = useNavigate();
  const { currentRoom, loadingCurrentRoom } = useRooms();
  const location = useLocation();
  const [collapse, setCollapse] = useState(false);

  const items = useMemo(
    () => [
      {
        label: "Nơi làm việc",
        icon: <HomeRepairServiceOutlinedIcon />,
        filledIcon: <HomeRepairServiceIcon />,
        href: `/room/${currentRoom.id}/work`,
      },
      {
        label: "Bản tin",
        icon: <FeedOutlinedIcon />,
        filledIcon: <FeedIcon />,
        href: `/room/${currentRoom.id}/newsfeed`,
      },
      ...(user?.id === currentRoom.manager_id
        ? [
            {
              label: "Thống kê",
              icon: <AssessmentOutlinedIcon />,
              filledIcon: <AssessmentIcon />,
              href: `/room/${currentRoom.id}/statistic`,
            },
            {
              label: "Thành viên",
              icon: <PeopleAltOutlinedIcon />,
              filledIcon: <PeopleAltIcon />,
              href: `/room/${currentRoom.id}/member`,
            },
          ]
        : [
            {
              label: "Thống kê",
              icon: <AssessmentOutlinedIcon />,
              filledIcon: <AssessmentIcon />,
              href: `/room/${currentRoom.id}/member/${user?.id || ""}`,
            },
          ]),
    ],
    [currentRoom, user?.id]
  );

  return (
    <Box
      style={{ display: "flex", flexDirection: "column" }}
      className={classes.container + " " + (collapse ? classes.collapse : "")}
    >
      <Box
        className={classes.collapseButton}
        onClick={() => setCollapse(!collapse)}
      >
        {collapse ? <KeyboardArrowRightIcon /> : <KeyboardArrowLeftIcon />}
      </Box>

      <Box style={{ padding: "8px 16px", height: 132 }}>
        {loadingCurrentRoom ? (
          <CircularProgress />
        ) : (
          <>
            <Typography variant="h6">
              {currentRoom.name ? currentRoom.name : "N/A"}
            </Typography>

            <Typography
              style={{
                margin: "8px 0",
                fontSize: "14px",
                fontWeight: 700,
                lineHeight: "130%",
                letterSpacing: "0.4px",
                color: "#373A43",
              }}
            >
              {"Mã phòng: "}
            </Typography>
            <CopyToClipboardBox
              text={currentRoom.id ? currentRoom.id : "N/A"}
            />
          </>
        )}
      </Box>

      <Divider />

      <Typography
        style={{
          padding: "16px 20px 8px",
          fontSize: "14px",
          fontWeight: 700,
          lineHeight: "130%",
          letterSpacing: "0.4px",
          color: "#373A43",
        }}
      >
        Danh mục
      </Typography>

      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <MenuList>
          {items.map((item, index) => {
            return (
              <MenuItem
                key={`left-side-bar-${index}`}
                className={classes.menuItem}
                onClick={() => navigate(item.href)}
                style={{ display: "block" }}
              >
                <Box
                  className={
                    classes.itemBox +
                    " " +
                    (location.pathname.includes(item.href)
                      ? classes.selection
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

        <Box
          style={{
            width: "100%",
            paddingTop: "8px",
            bottom: 0,
            left: 0,
            right: 0,
            borderTop: "1px solid #E7E8EF",
          }}
        >
          <MenuItem
            className={classes.menuItem}
            onClick={() =>
              navigate("/room/" + currentRoom.id + "/setting-room")
            }
            style={{ display: "block" }}
          >
            <Box
              className={
                classes.itemBox +
                " " +
                (location.pathname.includes("/setting-room")
                  ? classes.selection
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
