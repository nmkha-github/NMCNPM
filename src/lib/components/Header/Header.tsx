import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderUserInfo from "../HeaderUserInfo/HeaderUserInfo";

interface HeaderProps {
  children?: React.ReactElement;
}

const useStyle = makeStyles((theme) => ({
  header: {
    position: "fixed",
    left: 0,
    right: 0,
    top: 0,
    height: 64,
    background: "#FFFFFF",
    boxShadow: "0px 2px 4px rgba(30, 136, 229, 0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0px 8px",
  },
  logo: {},
  nav: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 0,
  },
  item: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContents: "center",
    padding: 0,
    width: 108,
    height: 64,
    flex: "none",
    order: 0,
    flexGrow: 0,
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 16,
    lineHeight: "150%",
    letterSpacing: "0.15px",
  },
  navItem: {
    cursor: "pointer",
    display: "flex",
    justifyContents: "center",
    alignItems: "center",
    padding: "12px 0px",
    width: "100%",
  },
  selection: {
    "&::before": {
      content: '""',
      position: "absolute",
      width: 28,
      height: 4,
      borderRadius: "16px 16px 0px 0px",
      bottom: 0,
      left: "calc(50% - 14px)",
      backgroundColor: "#1E88E5",
    },
  },
  textSelection: {
    color: "#F507FA !important",
  },
  rightContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 0,
    gap: 12,
  },
  children: {
    marginTop: 82,
  },
}));

const Header = ({ children }: HeaderProps) => {
  const classes = useStyle();
  let location = useLocation();
  let navigate = useNavigate();

  return (
    <>
      <Box className={classes.header}>
        <img
          className={classes.logo}
          src=""
          alt="web logo Taskment.com"
          onClick={() =>
            !location.pathname.includes("/home") && navigate("/home")
          }
        />

        <Box className={classes.nav}>
          <Box
            className={
              classes.item +
              " " +
              (location.pathname.includes("/resource") ? classes.selection : "")
            }
          >
            <Button
              className={
                classes.navItem +
                " " +
                (location.pathname.includes("/resource")
                  ? classes.selection
                  : "")
              }
              onClick={() =>
                !location.pathname.includes("/resource") &&
                navigate("/resource")
              }
            >
              Tài nguyên
            </Button>
          </Box>

          <Box
            className={
              classes.item +
              " " +
              (!location.pathname.includes("/resource") &&
              !location.pathname.includes("/schedule")
                ? classes.selection
                : "")
            }
          >
            <Button
              className={
                classes.navItem +
                " " +
                (!location.pathname.includes("/resource") &&
                !location.pathname.includes("/schedule")
                  ? classes.textSelection
                  : "")
              }
              onClick={() =>
                !location.pathname.includes("/room") && navigate("/room")
              }
            >
              Phòng ban
            </Button>
          </Box>

          <Box
            className={
              classes.item +
              " " +
              (location.pathname.includes("/schedule") ? classes.selection : "")
            }
          >
            <Button
              className={
                classes.navItem +
                " " +
                (location.pathname.includes("/schedule")
                  ? classes.textSelection
                  : "")
              }
              onClick={() =>
                !location.pathname.includes("/schedule") &&
                navigate("/resource")
              }
            >
              Lịch
            </Button>
          </Box>
        </Box>

        <Box className={classes.rightContainer}>
          <HeaderUserInfo />
        </Box>
      </Box>

      <Box className={classes.children}>{children}</Box>
    </>
  );
};

export default Header;
