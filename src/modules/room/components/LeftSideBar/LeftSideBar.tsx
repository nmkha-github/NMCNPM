import React, {useEffect, useRef, useState} from "react";
import MenuItem from "./LeftSideBarUtilComponent";
import NewspaperIcon from '@mui/icons-material/Newspaper';
import HomeRepairServiceOutlinedIcon from '@mui/icons-material/HomeRepairServiceOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";

const useStyle = makeStyles({
    cssStyle1: {
        position:"fixed",
        width: "232px",
        height: "100%",
        left: 0,
        background: "white",
        borderRight: "1px solid #E7E8EF"
    },
});

const LeftSideBar = () => {
    const [selection, setSelection] = useState(-1);
    const items = [{"label":"Bản tin", "icon":<NewspaperIcon/>}, {"label":"Nơi làm việc", "icon":<HomeRepairServiceOutlinedIcon/>}, {"label":"Thống kê", "icon":<AssessmentOutlinedIcon/>}, {"label":"Thành viên", "icon":<PeopleAltOutlinedIcon/>}];
    const classes = useStyle();

    return (<Box  className = {classes.cssStyle1}>
        <Box>
            {
            items.map((item, index) => {
                return (
                    <MenuItem 
                        label = {item.label} 
                        icon = {item.icon} 
                        isSelected = {selection==index}
                        onClick = {()=>setSelection(index==selection?-1:index)}
                        />);
                })
            }
        </Box>
    </Box>);
};

export default LeftSideBar;
