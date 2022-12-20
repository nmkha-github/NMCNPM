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
  Popover,
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
import { useEffect, useState } from "react";
import { useTasks } from "../../../../lib/provider/TasksProvider";
import { useUser } from "../../../../lib/provider/UserProvider";
import truncate from "../../../../lib/util/truncate";
import UploadFile from "../../../../lib/components/UploadFile/UploadFile";
import { useNavigate } from "react-router-dom";

interface TaskDetailDialogProps {
  task?: TaskData;
}

const useStyle = makeStyles((theme) => ({
  dialog: {
    padding: "16px 24px",
  },
  dialog_header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  dialog_header_actions: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  dialog_body: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 48,
  },
  dialog_body_left: {
    flexGrow: 24,
  },
  dialog_body_right: {
    flexGrow: 7,
  },
  body_actions: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: 8,
    margin: "8px 0px 20px",
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
  field_title: {
    fontFamily:
      "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,'Fira Sans','Droid Sans','Helvetica Neue',sans-serif",
    fontWeight: 600,
    fontSize: 14,
    lineHeight: "24px",
    color: "#666666",
  },
}));

const TaskDetailDialog = ({
  task,
  ...dialogProps
}: TaskDetailDialogProps & DialogProps) => {
  const classes = useStyle();
  const navigate = useNavigate();

  const { currentRoom, loadingCurrentRoom } = useRooms();
  const { updateTask, deleteTask } = useTasks();
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

  const [moreActionsAnchorEl, setMoreActionsAnchorEl] =
    useState<null | HTMLElement>(null);

  const statusOptions = ["TODO", "DOING", "REVIEWING", "DONE"]; // for test; get from provider later

  const [statusAnchorEl, setStatusAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [statusSelectedIndex, setStatusSelectedIndex] = useState(0);

  const memberOptions = [user, user, user, user, user]; // for test; get from provider later (?create new provider: membersProvider)
  memberOptions.push({
    id: "",
    auth_id: "",
    email: "",
    name: "Chưa xác định",
    avatar: "",
    created_at: "",
  }); // For undefined assignee

  const [memberAnchorEl, setMemberAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [memberSelectedIndex, setMemberSelectedIndex] = useState(0);

  useEffect(() => {
    task && setEditTask({ ...task });
    setStatusSelectedIndex(statusOptions.indexOf(task?.status || "TODO"));
    setMemberSelectedIndex(
      memberOptions.findIndex(
        (member) => member && member.id === (task?.assignee_id || "")
      )
    );
  }, [task]);

  return (
    <Dialog
      {...dialogProps}
      fullScreen={fullScreen}
      fullWidth={true}
      maxWidth="lg"
    >
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
              TransitionProps={{ timeout: 800 }}
              title="Theo dõi"
              placement="top"
              TransitionComponent={Fade}
              arrow
              onClick={() => {
                setWatches(!watches);
              }}
            >
              <IconButton>
                {watches ? <VisibilityIcon /> : <VisibilityOutlinedIcon />}
              </IconButton>
            </Tooltip>

            <Tooltip
              TransitionProps={{ timeout: 800 }}
              title="Thích"
              placement="top"
              TransitionComponent={Fade}
              arrow
              onClick={() => {
                setVoted(!voted);
              }}
            >
              <IconButton>
                {voted ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
              </IconButton>
            </Tooltip>

            <Tooltip
              TransitionProps={{ timeout: 800 }}
              title="Chia sẻ"
              placement="top"
              TransitionComponent={Fade}
              arrow
              onClick={() => {}}
            >
              <IconButton>
                <ShareIcon />
              </IconButton>
            </Tooltip>

            <Tooltip
              TransitionProps={{ timeout: 800 }}
              title="Khác"
              placement="top"
              TransitionComponent={Fade}
              arrow
            >
              <IconButton
                id="more-actions-button"
                aria-controls={
                  !!moreActionsAnchorEl ? "more-actions-menu" : undefined
                }
                aria-haspopup="true"
                aria-expanded={!!moreActionsAnchorEl ? "true" : undefined}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                  setMoreActionsAnchorEl(event.currentTarget)
                }
              >
                <MoreHorizIcon />
              </IconButton>
            </Tooltip>

            <Tooltip
              TransitionProps={{ timeout: 800 }}
              title="Thoát"
              placement="top"
              TransitionComponent={Fade}
              arrow
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
              onClickAway={async () => {
                if (isEditingTitle) {
                  setIsEditingTitle(false);
                  await updateTask({
                    room_id: currentRoom.id,
                    id: editTask.id,
                    updateData: { title: editTask.title },
                  });
                }
              }}
            >
              {isEditingTitle ? (
                <TextField
                  autoFocus
                  fullWidth
                  size="small"
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
                  {truncate(editTask.title, 20)}
                </Typography>
              )}
            </ClickAwayListener>

            <Box className={classes.body_actions}>
              <Tooltip
                TransitionProps={{ timeout: 800 }}
                title="Đính kèm tập tin"
                placement="bottom"
                TransitionComponent={Fade}
                arrow
              >
                <UploadFile
                  onSuccess={async (file) => {
                    console.log(file.url);
                    // chưa có hàm add file trong provider. (updateTask ko có attach_files)
                  }}
                >
                  <Button
                    startIcon={<AttachFileIcon />}
                    className={classes.body_action}
                    onClick={() => {}}
                  >
                    Đính kèm
                  </Button>
                </UploadFile>
              </Tooltip>

              <Tooltip
                title="Thêm công việc con"
                TransitionProps={{ timeout: 800 }}
                placement="bottom"
                TransitionComponent={Fade}
                arrow
              >
                <Button
                  startIcon={<AccountTreeIcon />}
                  className={classes.body_action}
                  onClick={() => {}}
                >
                  Thêm việc con
                </Button>
              </Tooltip>

              <Tooltip
                TransitionProps={{ timeout: 800 }}
                title="Liên kết công việc khác"
                placement="bottom"
                TransitionComponent={Fade}
                arrow
              >
                <Button
                  startIcon={<AddLinkIcon />}
                  className={classes.body_action}
                  onClick={() => {}}
                >
                  Liên kết việc
                </Button>
              </Tooltip>

              <Tooltip
                TransitionProps={{ timeout: 800 }}
                title="Hành động khác"
                placement="bottom"
                TransitionComponent={Fade}
                arrow
              >
                <Button
                  startIcon={<MoreHorizIcon />}
                  className={classes.body_action}
                  onClick={() => {}}
                >
                  Khác
                </Button>
              </Tooltip>
            </Box>

            <Typography className={classes.field_title}>
              Mô tả công việc:
            </Typography>
            <ClickAwayListener
              onClickAway={async () => {
                if (isEditingContent) {
                  setIsEditingContent(false);
                  await updateTask({
                    room_id: currentRoom.id,
                    id: editTask.id,
                    updateData: { content: editTask.content },
                  });
                }
              }}
            >
              {isEditingContent ? (
                <TextField
                  autoFocus
                  variant="outlined"
                  fullWidth
                  size="small"
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

            <Divider style={{ margin: "24px 0px 16px" }} />

            <Typography
              className={classes.field_title}
              style={{ marginBottom: "8px" }}
            >
              Bình luận
            </Typography>

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
                id="status-button"
                aria-haspopup="listbox"
                aria-controls="status-menu"
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

            {/* Detail table */}
            <TableContainer component={Paper}>
              <Table style={{ minWidth: 350 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <b>Thông tin chi tiết</b>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  <TableRow>
                    <TableCell className={classes.field_title}>
                      Người đảm nhận:
                    </TableCell>
                    <TableCell>
                      <List component="nav">
                        <ListItem
                          button
                          id="assignee-button"
                          aria-haspopup="listbox"
                          aria-controls="assignee-menu"
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
                              memberOptions[memberSelectedIndex]?.name || "N/A",
                              18
                            )}
                          />
                        </ListItem>
                      </List>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className={classes.field_title}>Nhãn:</TableCell>
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
                    <TableCell className={classes.field_title}>
                      Ngày tạo:
                    </TableCell>
                    <TableCell>{editTask.created_at.toString()}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className={classes.field_title}>
                      Ngày đến hạn:
                    </TableCell>
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
                            <Box
                              style={{ display: "flex", alignItems: "center" }}
                            >
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

      {/* Menu of header-more-actions-list */}
      <Popover
        id="more-actions-menu"
        anchorEl={moreActionsAnchorEl}
        open={!!moreActionsAnchorEl}
        onClose={() => setMoreActionsAnchorEl(null)}
        aria-labelledby="more-action-button"
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        TransitionComponent={Fade}
        style={{ marginTop: 4 }}
      >
        <MenuItem
          onClick={async () => {
            setMoreActionsAnchorEl(null);
            await deleteTask({ room_id: currentRoom.id, id: task?.id || "" });
            dialogProps.onClose?.({}, "backdropClick");
          }}
          style={{ display: "block", padding: "8px 12px" }}
        >
          Xóa công việc
        </MenuItem>

        <MenuItem
          onClick={() => setMoreActionsAnchorEl(null)}
          style={{ display: "block", padding: "8px 12px" }}
        >
          Nhân bản công việc
        </MenuItem>

        <MenuItem
          onClick={() => {
            navigate(`/room/${currentRoom.id}/task/${task?.id || ""}`);
          }}
          style={{ display: "block", padding: "8px 12px" }}
        >
          Xem ở trang khác
        </MenuItem>

        <MenuItem
          onClick={() => setMoreActionsAnchorEl(null)}
          style={{ display: "block", padding: "8px 12px" }}
        >
          In
        </MenuItem>
      </Popover>

      {/* Menu of status-list */}
      <Menu
        id="status-menu"
        anchorEl={statusAnchorEl}
        open={!!statusAnchorEl}
        onClose={() => setStatusAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "status-button",
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        TransitionComponent={Fade}
      >
        {statusOptions.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === statusSelectedIndex}
            onClick={async (event) => {
              setStatusSelectedIndex(index);
              setStatusAnchorEl(null);
              await updateTask({
                room_id: currentRoom.id,
                id: editTask.id,
                updateData: { status: option },
              });
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>

      {/* Menu of member-list (assignee) */}
      <Menu
        id="assignee-menu"
        anchorEl={memberAnchorEl}
        open={!!memberAnchorEl}
        onClose={() => setMemberAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "assignee-button",
        }}
        TransitionComponent={Fade}
        transformOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom",
        }}
      >
        {memberOptions.map((member, index) => (
          <MenuItem
            key={member?.id || ""}
            selected={index === memberSelectedIndex}
            onClick={async () => {
              setMemberSelectedIndex(index);
              setMemberAnchorEl(null);
              await updateTask({
                room_id: currentRoom.id,
                id: editTask.id,
                updateData: { assignee_id: member?.id || "" },
              });
            }}
          >
            <Avatar
              src={member?.avatar}
              alt="Avatar of assignee"
              style={{ marginRight: 12 }}
            />

            {truncate(member?.name || "N/A")}
          </MenuItem>
        ))}
      </Menu>
    </Dialog>
  );
};

export default TaskDetailDialog;