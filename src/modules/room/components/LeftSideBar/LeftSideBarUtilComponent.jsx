import { makeStyles } from "@mui/styles";

const useStyle = makeStyles({
    cssStyle1: {
        width: "100%",
        padding: "0 12px"
    },
    cssStyle2: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "12px 8px",
        gap: 10,
        borderRadius: "50%",
        fontFamily: 'Inter',
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: 14
    },
    cssStyle3: {
        backgroundColor:"rgba(227, 242, 253, 0.5)",
        color:"#1E88E5"
    },
    cssStyle4: {

    },
    cssStyle5: {
        
    }
});

const MenuItem = ({label, Icon, hasNew, isSelected, onClick}) => {
    const classes = useStyle();

    return (<div className = {classes.cssStyle1} onClick={onClick}>
        <div className = {(isSelected?classes.cssStyle3:"")+" "+classes.cssStyle2}>
            <Icon className={hasNew ? classes.cssStyle4 : classes.cssStyle5}/>
            {label}
        </div>
    </div>);
};

export default MenuItem