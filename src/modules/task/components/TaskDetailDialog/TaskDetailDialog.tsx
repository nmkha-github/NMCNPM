import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  ClickAwayListener,
  Dialog,
  DialogProps,
  Divider,
  Fade,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { useRooms } from "../../../../lib/provider/RoomsProvider";
import TaskData from "../../interface/task-data";
import ClearIcon from "@mui/icons-material/Clear";
import ShareIcon from "@mui/icons-material/Share";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AddLinkIcon from "@mui/icons-material/AddLink";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { useTasks } from "../../../../lib/provider/TasksProvider";
import { useUser } from "../../../../lib/provider/UserProvider";
import truncate from "../../../../lib/util/truncate";

interface TaskDetailDialogProps {
  task?: TaskData;
}

const useStyle = makeStyles((theme) => ({
  dialog: {
    padding: 16,
    maxHeight: 500,
  },
  dialog_header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  dialog_header_actions: {},
  dialog_body: {
    display: "flex",
    flexDirection: "row",
    gap: 32,
  },
  dialog_body_left: {},
  dialog_body_right: {},
  body_actions: {
    display: "flex",
    justifyContent: "flex-start",
    gap: 8,
    margin: "8px 0px 12px",
  },
  body_action: {
    textTransform: "none",
    background: "#DDD",
  },
  edit_field: {
    transition: "background 0.4s ease",
    "&:hover": {
      background: "#EBECF0",
    },
  },
}));

const TaskDetailDialog = ({
  task,
  ...dialogProps
}: TaskDetailDialogProps & DialogProps) => {
  const classes = useStyle();
  const { currentRoom, loadingCurrentRoom } = useRooms();
  const { updateTask } = useTasks();
  const { user } = useUser();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [voted, setVoted] = useState(false);
  const [watches, setWatches] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [editTask, setEditTask] = useState<TaskData>({
    id: "",
    title: "",
    content: "",
    attach_files: [],
    status: "",
    assignee_id: "",
    creator_id: "",
    created_at: "",
    deadline: "",
    last_edit: "",
    comments: [],
  });

  const statusOptions = ["TODO", "DOING", "REVIEWING", "DONE"]; // for test; get from provider later

  const [statusAnchorEl, setStatusAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [statusSelectedIndex, setStatusSelectedIndex] = useState(
    statusOptions.indexOf(task?.status || "TODO")
  );

  const memberOptions = [user, user, user]; // for test; get from provider later (?create new provider: membersProvider)
  memberOptions.push({
    id: "undefined",
    auth_id: "undefined",
    email: "",
    name: "Chưa xác định",
    avatar: "",
    created_at: "",
  }); // For undefined assignee

  const [memberAnchorEl, setMemberAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [memberSelectedIndex, setMemberSelectedIndex] = useState(
    memberOptions.findIndex(
      (member) => member && member.id === (task?.assignee_id || "undefined")
    )
  );

  useEffect(() => {
    task && setEditTask({ ...task });
  }, [task]);

  return (
    <Dialog {...dialogProps} fullScreen={fullScreen} maxWidth="md">
      <Box className={classes.dialog}>
        {/* Header of the dialog */}
        <Box className={classes.dialog_header}>
          {/* Info about room */}
          <Box>
            {loadingCurrentRoom ? (
              <CircularProgress />
            ) : (
              <Typography onClick={() => {}}>
                {"Phòng: " + currentRoom.name}
              </Typography>
            )}
          </Box>

          {/* Header action buttons */}
          <Box className={classes.dialog_header_actions}>
            <Tooltip
              title="Theo dõi"
              placement="top"
              onClick={() => {
                setWatches(!watches);
              }}
            >
              <IconButton>
                {watches ? <VisibilityIcon /> : <VisibilityOutlinedIcon />}
              </IconButton>
            </Tooltip>

            <Tooltip
              title="Thích"
              placement="top"
              onClick={() => {
                setVoted(!voted);
              }}
            >
              <IconButton>
                {voted ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
              </IconButton>
            </Tooltip>

            <Tooltip title="Chia sẻ" placement="top" onClick={() => {}}>
              <IconButton>
                <ShareIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Khác" placement="top" onClick={() => {}}>
              <IconButton>
                <MoreHorizIcon />
              </IconButton>
            </Tooltip>

            <Tooltip
              title="Thoát"
              placement="top"
              onClick={() => dialogProps.onClose?.({}, "backdropClick")}
            >
              <IconButton>
                <ClearIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Body of the dialog */}
        <Box className={classes.dialog_body}>
          {/* Left section of the dialog */}
          <Box className={classes.dialog_body_left}>
            <ClickAwayListener
              onClickAway={() => {
                setIsEditingTitle(false);
              }}
            >
              {isEditingTitle ? (
                <TextField
                  autoFocus
                  variant="outlined"
                  onChange={(event) => {
                    setEditTask({ ...editTask, title: event.target.value });
                  }}
                  value={editTask.title}
                />
              ) : (
                <Typography
                  variant="h5"
                  onClick={() => setIsEditingTitle(true)}
                  className={classes.edit_field}
                  style={{ padding: "6px 4px", fontWeight: "bold" }}
                >
                  {editTask.title}
                </Typography>
              )}
            </ClickAwayListener>

            <Box className={classes.body_actions}>
              <Tooltip title="Đính kèm tập tin" placement="bottom">
                <Button
                  startIcon={<AttachFileIcon />}
                  className={classes.body_action}
                  onClick={() => {}}
                >
                  Đính kèm
                </Button>
              </Tooltip>

              <Tooltip title="Thêm công việc con" placement="bottom">
                <Button
                  startIcon={<AccountTreeIcon />}
                  className={classes.body_action}
                  onClick={() => {}}
                >
                  Thêm việc con
                </Button>
              </Tooltip>

              <Tooltip title="Liên kết công việc khác" placement="bottom">
                <Button
                  startIcon={<AddLinkIcon />}
                  className={classes.body_action}
                  onClick={() => {}}
                >
                  Liên kết việc
                </Button>
              </Tooltip>

              <Tooltip title="Hành động khác" placement="bottom">
                <Button
                  startIcon={<MoreHorizIcon />}
                  className={classes.body_action}
                  onClick={() => {}}
                >
                  Khác
                </Button>
              </Tooltip>
            </Box>

            <Typography>Mô tả công việc:</Typography>
            <ClickAwayListener
              onClickAway={() => {
                setIsEditingContent(false);
              }}
            >
              {isEditingContent ? (
                <TextField
                  autoFocus
                  variant="outlined"
                  fullWidth
                  onChange={(event) => {
                    setEditTask({ ...editTask, content: event.target.value });
                  }}
                  value={editTask.content}
                />
              ) : (
                <Typography
                  onClick={() => setIsEditingContent(true)}
                  className={classes.edit_field}
                  style={{ padding: "6px 0px" }}
                >
                  {editTask.content && editTask.content !== ""
                    ? editTask.content
                    : "Thêm mô tả ..."}
                </Typography>
              )}
            </ClickAwayListener>

            <Divider />

            <Typography>Bình luận</Typography>

            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 12,
                alignItems: "center",
              }}
            >
              <Avatar src={user?.avatar} alt="User avatar" />

              <TextField
                type="text"
                placeholder="Thêm bình luận ..."
                fullWidth
                variant="outlined"
                size="small"
              />
            </Box>
          </Box>

          {/* Right section of the dialog */}
          <Box className={classes.dialog_body_right}>
            {/* Status List */}
            <List component="nav">
              <ListItem
                button
                id="lock-button"
                aria-haspopup="listbox"
                aria-controls="lock-menu"
                aria-expanded={!!statusAnchorEl ? "true" : undefined}
                onClick={(event) => setStatusAnchorEl(event.currentTarget)}
              >
                <ListItemText
                  primary="Trạng thái"
                  secondary={statusOptions[statusSelectedIndex]}
                />
                <ExpandMoreIcon />
              </ListItem>
            </List>

            <Menu
              id="lock-menu"
              anchorEl={statusAnchorEl}
              open={!!statusAnchorEl}
              onClose={() => setStatusAnchorEl(null)}
              MenuListProps={{
                "aria-labelledby": "lock-button",
              }}
              TransitionComponent={Fade}
            >
              {statusOptions.map((option, index) => (
                <MenuItem
                  key={option}
                  selected={index === statusSelectedIndex}
                  onClick={(event) => {
                    setStatusSelectedIndex(index);
                    setStatusAnchorEl(null);
                  }}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>

            {/* Detail table */}
            <TableContainer component={Paper}>
              <Table style={{ minWidth: 350 }}>
                <TableHead>
                  <TableRow>
                    <b>Thông tin chi tiết</b>
                  </TableRow>
                </TableHead>

                <TableBody>
                  <TableRow>
                    <TableCell>Người đảm nhận:</TableCell>
                    <TableCell>
                      <List component="nav">
                        <ListItem
                          button
                          id="assignee-button"
                          aria-haspopup="listbox"
                          aria-controls="lock-menu"
                          aria-expanded={!!memberAnchorEl ? "true" : undefined}
                          onClick={(event) =>
                            setMemberAnchorEl(event.currentTarget)
                          }
                        >
                          <Avatar
                            src={memberOptions[memberSelectedIndex]?.avatar}
                            alt="Avatar of assignee"
                            style={{ marginRight: 12 }}
                          />
                          <ListItemText
                            primary={truncate(
                              memberOptions[memberSelectedIndex]?.name || "N/A"
                            )}
                          />
                        </ListItem>
                      </List>

                      <Menu
                        id="assignee-menu"
                        anchorEl={memberAnchorEl}
                        open={!!memberAnchorEl}
                        onClose={() => setMemberAnchorEl(null)}
                        MenuListProps={{
                          "aria-labelledby": "assignee-button",
                        }}
                        TransitionComponent={Fade}
                      >
                        {memberOptions.map((member, index) => (
                          <MenuItem
                            key={member?.id || ""}
                            selected={index === memberSelectedIndex}
                            onClick={() => {
                              setMemberSelectedIndex(index);
                              setMemberAnchorEl(null);
                            }}
                          >
                            <Avatar
                              src={member?.avatar}
                              alt="Avatar of assignee"
                              style={{ marginRight: 12 }}
                            />

                            {member?.name || "N/A"}
                          </MenuItem>
                        ))}
                      </Menu>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Nhãn:</TableCell>
                    <TableCell>
                      <TextField
                        type="text"
                        placeholder="Thêm nhãn"
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Ngày tạo:</TableCell>
                    <TableCell>{editTask.created_at.toString()}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Ngày đến hạn:</TableCell>
                    <TableCell>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          value={null}
                          onChange={(newValue) => {}}
                          renderInput={({
                            inputRef,
                            inputProps,
                            InputProps,
                          }) => (
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <input ref={inputRef} {...inputProps} />
                              {InputProps?.endAdornment}
                            </Box>
                          )}
                        />
                      </LocalizationProvider>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default TaskDetailDialog;
