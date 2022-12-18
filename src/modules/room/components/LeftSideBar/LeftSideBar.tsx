import React, { useMemo } from "react";
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
  cssStyle1: {
    width: "232px",
    left: 0,
    top: 64,
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
    gap: "4px",
  },
  cssStyle5: {
    padding: "16px 20px 8px",
    fontSize: "14px",
    fontWeight: 700,
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
    width: "100%",
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
  const { user } = useUser();
  const navigate = useNavigate();
  const { currentRoom, loadingCurrentRoom } = useRooms();
  const location = useLocation();

  const items = useMemo(
    () => [
      {
        label: "Bản tin",
        icon: <FeedOutlinedIcon />,
        filledIcon: <FeedIcon />,
        href: `/room/${currentRoom.id}/newsfeed`,
      },
      {
        label: "Nơi làm việc",
        icon: <HomeRepairServiceOutlinedIcon />,
        filledIcon: <HomeRepairServiceIcon />,
        href: `/room/${currentRoom.id}/work`,
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
    <Box className={classes.cssStyle1}>
      <Box>
        {loadingCurrentRoom ? (
          <CircularProgress />
        ) : (
          <Box style={{ padding: "8px 16px" }}>
            <Box className={classes.cssStyle2}>
              <Typography variant="h6">
                {currentRoom.name ? currentRoom.name : "N/A"}
              </Typography>

              <Typography variant="subtitle2">
                {"Mã phòng: " + (currentRoom.id ? currentRoom.id : "N/A")}
              </Typography>
            </Box>
            <Divider />
            <Box style={{ height: 16 }} />

            <CopyToClipboardBox text={currentRoom.id} />
          </Box>
        )}

        <Typography className={classes.cssStyle5}>Danh mục</Typography>
        <Divider />
        <MenuList>
          {items.map((item, index) => {
            return (
              <MenuItem
                key={`left-side-bar-${index}`}
                className={classes.cssStyle7}
                onClick={() => navigate(item.href)}
                style={{ display: "block", padding: 8 }}
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
            onClick={() =>
              navigate("/room/" + currentRoom.id + "/setting-room")
            }
            style={{ display: "block", padding: 8 }}
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
