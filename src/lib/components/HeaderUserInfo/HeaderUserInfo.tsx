import {
  Avatar,
  Box,
  Divider,
  Fade,
  IconButton,
  ListItemIcon,
  makeStyles,
  MenuItem,
  Popover,
  Tooltip,
  Typography,
} from "@material-ui/core";
import PortraitIcon from "@mui/icons-material/Portrait";
import Settings from "@mui/icons-material/Settings";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import Logout from "@mui/icons-material/Logout";
import { useState } from "react";
import { useUser } from "../../provider/UserProvider";
import { useAuth } from "../../provider/AuthProvider";

const useStyle = makeStyles((theme) => ({
  button: {
    width: 120,
    background: "#ffffff",
    borderRadius: 90,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1px 2px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
    border: "none",
    verticalAlign: "middle",
    transition: "box-shadow 0.4s ease",
  },
  menu: {
    "&::before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: "#ffffff",
      transform: "translateY(-50%) rotate(45deg)",
      zIndex: 0,
    },
  },
  accountContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "12px",
    padding: 8,
  },
  userName: {
    marginLeft: "8px",
    flexGrow: 2,
  },
}));

const HeaderUserInfo = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const classes = useStyle();
  const { user } = useUser();
  const { logOut } = useAuth();

  return (
    <>
      <Tooltip title="Account">
        <Box className={classes.button}>
          <Typography>User</Typography>
          <IconButton
            size="small"
            id="user-info-button"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
              setAnchorEl(event.currentTarget)
            }
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar src={user?.avatar} alt="User avatar" />
          </IconButton>
        </Box>
      </Tooltip>

      <Popover
        id="user-info-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        aria-labelledby="user-info-button"
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        TransitionComponent={Fade}
        className={classes.menu}
      >
        <Box className={classes.accountContainer}>
          <Avatar
            src={user?.avatar}
            alt="User avatar"
            style={{ marginRight: "8px" }}
          />

          <Typography>{user?.name}</Typography>
        </Box>

        <Divider />

        <MenuItem onClick={() => setAnchorEl(null)}>
          <ListItemIcon>
            <PortraitIcon fontSize="small" />
          </ListItemIcon>
          Hồ sơ của bạn
        </MenuItem>

        <MenuItem onClick={() => setAnchorEl(null)}>
          <ListItemIcon>
            <ContactSupportIcon fontSize="small" />
          </ListItemIcon>
          Trợ giúp
        </MenuItem>

        <MenuItem onClick={() => setAnchorEl(null)}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Cài đặt
        </MenuItem>

        <MenuItem onClick={async () => await logOut()}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Đăng xuất
        </MenuItem>
      </Popover>
    </>
  );
};

export default HeaderUserInfo;
