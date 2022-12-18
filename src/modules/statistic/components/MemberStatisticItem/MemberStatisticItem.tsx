import { Box, Avatar, Typography, makeStyles } from "@material-ui/core";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate, useParams } from "react-router-dom";
import MEMBER_AVATAR_DEFAULT from "../../constants/member-avatar-default";
import MemberData from "../../interface/member-data";

interface MemberStatisticItemProps {
  memberData: MemberData;
}

const useStyle = makeStyles((theme) => ({
  container: {
    display: "flex",
    padding: "4px 8px",
    background: "#ffffff",
    "&:hover": {
      background: "#f1f1f1",
    },
  },
  item: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: "0 12px",
  },
  item1: {
    flexGrow: 5,
  },
  item2: {
    flexBasis: "50px",
    textAlign: "center",
  },
  item3: {
    flexGrow: 1,
    textAlign: "center",
  },
}));

const MemberStatisticItem = ({ memberData }: MemberStatisticItemProps) => {
  let navigate = useNavigate();
  let { roomId } = useParams();

  const classes = useStyle();
  return (
    <Box className={classes.container}>
      <Avatar
        className={classes.item}
        alt="Member Avatar"
        src={memberData.avatar ? memberData.avatar : MEMBER_AVATAR_DEFAULT}
      />

      <Typography className={classes.item + " " + classes.item1}>
        {memberData.name}
      </Typography>

      <Typography className={classes.item + " " + classes.item3}>
        {String(memberData.joined_at ? memberData.joined_at : 0)}
      </Typography>

      <Typography className={classes.item + " " + classes.item2}>
        {memberData.toDo}
      </Typography>

      <Typography className={classes.item + " " + classes.item2}>
        {memberData.doing}
      </Typography>

      <Typography className={classes.item + " " + classes.item2}>
        {memberData.reviewing}
      </Typography>

      <Typography className={classes.item + " " + classes.item2}>
        {memberData.done}
      </Typography>

      <Box className={classes.item + " " + classes.item2}>
        <MoreVertIcon
          onClick={() =>
            navigate("/room/" + roomId + "/member/" + memberData.id)
          }
        />
      </Box>
    </Box>
  );
};

export default MemberStatisticItem;
