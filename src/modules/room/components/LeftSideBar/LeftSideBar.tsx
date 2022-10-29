import React, {useEffect, useRef, useState} from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MenuItem from "./LeftSideBarUtilComponent";
import NewspaperIcon from '@mui/icons-material/Newspaper';
const useStyle = makeStyles({
    
});

const LeftSideBar = () => {
    const [selection, setSelection] = useState(-1);
    const items = [{"label":"Bảng tin", "icon":<NewspaperIcon/>}];

    return (<Box>
        <Box>
            {
            items.map((item, index) => {
                return (
                    <MenuItem 
                        label = {item.label} 
                        Icon = {item.icon} 
                        hasNew = {true} 
                        isSelected = {selection==index}
                        onClick = {()=>setSelection(index)}
                        />);
                })
            }
        </Box>
    </Box>);
};

export default LeftSideBar;
