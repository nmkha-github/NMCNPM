import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Fade,
  makeStyles,
  MenuItem,
  Popover,
  TextField,
  Typography,
} from "@material-ui/core";
import { useUser } from "../../lib/provider/UserProvider";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import LoadingButton from "../../lib/components/LoadingButton/LoadingButton";

const useStyle = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    width: 820,
    marginLeft: "15%",
    marginBottom: 40,
    padding: "32px 24px",
    borderRadius: 4,
    border: "1px solid #E7E8EF",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  },
  sectionText: {
    margin: "16px 0px 8px 0px",
  },
  textFieldLabel: {
    marginTop: 12,
    textWeight: "bold",
  },
  avatarContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContains: "center",
    alignItems: "center",
  },
  avatar: {
    width: 240,
    height: 240,
  },
  avatarEditButton: {
    textTransform: "none",
    fontSize: 12,
    fontWeight: "bold",
    width: 112,
    borderRadius: 4,
    border: "1px solid #1E88E5",
    background: "#FFFFFF",
  },
}));

const SettingPage = () => {
  const classes = useStyle();
  const { user, loadingUser, editUser, editingUser } = useUser();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <Box className={classes.container}>
      <Typography variant="h4">Cài đặt</Typography>

      <Typography variant="h5" className={classes.sectionText}>
        Thông tin cá nhân
      </Typography>

      <Divider />

      <Box className={classes.avatarContainer}>
        <Typography className={classes.textFieldLabel}>
          Ảnh đại diện:
        </Typography>

        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <Button
              startIcon={<EditIcon />}
              className={classes.avatarEditButton}
              id="edit-avatar-button"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                setAnchorEl(event.currentTarget)
              }
              aria-controls={!!anchorEl ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={!!anchorEl ? "true" : undefined}
            >
              Chỉnh sửa
            </Button>
          }
        >
          <Avatar
            src={user?.avatar}
            alt="User's avatar"
            className={classes.avatar}
          />
        </Badge>
      </Box>

      <Typography className={classes.textFieldLabel}>Họ và tên:</Typography>
      <TextField
        autoFocus
        variant="outlined"
        onChange={(event) => {
          setName(event.target.value);
        }}
        style={{ width: 320 }}
        size="small"
      />

      <Typography className={classes.textFieldLabel}>Email:</Typography>
      <TextField
        autoFocus
        variant="outlined"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        style={{ width: 320 }}
        size="small"
      />

      <Typography className={classes.textFieldLabel}>Company:</Typography>
      <TextField
        autoFocus
        variant="outlined"
        style={{ width: 320 }}
        size="small"
      />

      <Typography className={classes.textFieldLabel}>Bio:</Typography>
      <TextField autoFocus multiline maxRows={5} variant="outlined" fullWidth />

      <LoadingButton
        onClick={async () => {}}
        variant="contained"
        loading={editingUser || loadingUser}
        style={{
          padding: "8px 16px",
          marginTop: 16,
          alignSelf: "flex-end",
        }}
        disabled={loadingUser || editingUser}
      >
        Cập nhật
      </LoadingButton>

      <Popover
        id="edit-avatar-menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        aria-labelledby="edit-avatar-button"
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={() => setAnchorEl(null)}>Tải ảnh lên</MenuItem>

        <MenuItem onClick={() => setAnchorEl(null)}>Xóa ảnh</MenuItem>
      </Popover>
    </Box>
  );
};

export default SettingPage;
