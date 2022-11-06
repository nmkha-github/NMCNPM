import { makeStyles } from "@mui/styles";
import React, { ReactNode } from "react";

interface MenuItemProps {
  label: string;
  icon: ReactNode;
  filledIcon: ReactNode;
  isSelected: boolean;
  onClick: () => void;
}

const useStyle = makeStyles({
  cssStyle1: {
    padding: "0 12px",
  },
  cssStyle2: {
    padding: "12px 8px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: "8px",
    fontFamily: "Inter",
    fontStyle: "normal",
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "144%",
    letterSpacing: "0.1px",
    color: "#373A43",
  },
  cssStyle3: {
    backgroundColor: "rgba(227, 242, 253, 0.5)",
    color: "#1E88E5",
  },
});

const MenuItem = ({
  label,
  icon,
  filledIcon,
  isSelected,
  onClick,
}: MenuItemProps) => {
  const classes = useStyle();

  return (
    <div className={classes.cssStyle1} onClick={() => onClick()}>
      <div
        className={
          (isSelected ? classes.cssStyle3 : "") + " " + classes.cssStyle2
        }
      >
        {isSelected ? filledIcon : icon}
        {label}
      </div>
    </div>
  );
};

export default MenuItem;
