import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import navbarStyles from "./Navbar.module.css";

export const Navbar = () => {
    return (
        <nav className={navbarStyles.navbar}>
            <AccountCircleIcon
                // fontSize=""
                sx={{
                    // bgcolor: "green",
                    // boxShadow: 1,
                    // borderRadius: 2,
                    p: 0,
                    // minWidth: 300,
                    fontSize: "4rem",
                    color: "white",
                    marginRight: "1rem",
                }}
            />
            <h2>Agenda telefonica</h2>
        </nav>
    );
};