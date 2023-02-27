import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Cpp from "../images/Cpp.svg";
import C from "../images/C.svg";
import Python from "../images/Python.svg";
import Java from "../images/Java.svg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { createSearchParams, useSearchParams } from "react-router-dom";
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function LanguageSelector() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [searchParams, setSearchParams] = useSearchParams();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (value) => {
    setAnchorEl(null);
    if (typeof value === "string") {
      setSearchParams(createSearchParams({ lang: value }));
    }
  };
  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="outlined"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {searchParams.has("lang") ? searchParams.get("lang") : "cpp"}
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          selected={
            searchParams.has("lang") && searchParams.get("lang") == "cpp"
              ? true
              : undefined
          }
          onClick={() => handleClose("cpp")}
          disableRipple
        >
          <img src={Cpp} />
          Cpp
        </MenuItem>
        <MenuItem
          selected={
            searchParams.has("lang") && searchParams.get("lang") == "c"
              ? true
              : undefined
          }
          onClick={() => handleClose("c")}
          disableRipple
        >
          <img src={C} />C
        </MenuItem>
        <MenuItem
          selected={
            searchParams.has("lang") && searchParams.get("lang") == "python3"
              ? true
              : undefined
          }
          onClick={() => handleClose("python3")}
          disableRipple
        >
          <img src={Python} />
          Python3
        </MenuItem>
        <MenuItem
          selected={
            searchParams.has("lang") && searchParams.get("lang") == "java"
              ? true
              : undefined
          }
          onClick={() => handleClose("java")}
          disableRipple
        >
          <img src={Java} />
          Java
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
