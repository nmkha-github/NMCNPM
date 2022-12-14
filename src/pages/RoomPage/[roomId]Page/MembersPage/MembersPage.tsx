import { Box } from "@mui/material";
import React from "react";
import MemberStatisticItem from "../../../../modules/member/components/MemberStatisticItem/MemberStatisticItem";
import MEMBER_AVATAR_DEFAULT from "../../../../modules/member/constants/member-avatar-default";

const MembersPage = () => {
  return (
    <Box>
      <MemberStatisticItem
        memberData={{
          id: "1dafs",
          name: "phong",
          avatar: MEMBER_AVATAR_DEFAULT,
          taskToDoCount: 1,
          taskDoingCount: 1,
          taskDoneCount: 1,
          taskReviewingCount: 1,
          joinedDate: "",
        }}
      />
      <MemberStatisticItem
        memberData={{
          id: "1dafs",
          name: "phong",
          avatar: MEMBER_AVATAR_DEFAULT,
          taskToDoCount: 1,
          taskDoingCount: 1,
          taskDoneCount: 1,
          taskReviewingCount: 1,
          joinedDate: "",
        }}
      />
    </Box>
  );
};

export default MembersPage;
