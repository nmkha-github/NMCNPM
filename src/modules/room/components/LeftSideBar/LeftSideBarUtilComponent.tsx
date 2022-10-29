import { makeStyles } from "@mui/styles";
import React, { ReactNode } from "react"
interface MenuItemProps {
    label: string;
    icon: ReactNode;
    isSelected: boolean;
    onClick: ()=>void;
}

const useStyle = makeStyles({
    cssStyle1: {
        padding: "0 12px"
    },
    cssStyle2: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "12px 8px",
        gap: 10,
        borderRadius: "4px",
        fontFamily: 'Inter',
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: 14
    },
    cssStyle3: {
        backgroundColor:"rgba(227, 242, 253, 0.5)",
        color:"#1E88E5"
    },
});

const MenuItem = ({label, icon, isSelected, onClick}:MenuItemProps) => {
    const classes = useStyle();

    return (<div className = {classes.cssStyle1} onClick={()=>onClick()}>
        <div className = {(isSelected?classes.cssStyle3:"")+" "+classes.cssStyle2}>
            {icon}
            {label}
        </div>
    </div>);
};

export default MenuItem