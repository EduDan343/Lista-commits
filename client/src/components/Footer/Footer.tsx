import { Mail, ContactPhone, GitHub } from "@mui/icons-material";
import footerStyles from "./Footer.module.css";

export const Footer = () => {
    return (
        <footer className={footerStyles.footerContainer}>
            <div className={footerStyles.iconContainer}>
                <Mail
                    sx={{ color: "white", fontSize: "2.5rem", marginRight: "1rem" }}
                />
                <span>eduardogonzalezh196@gmail.com</span>
            </div>
            <div className={footerStyles.iconContainer}>
                <ContactPhone
                    sx={{ color: "white", fontSize: "2.5rem", marginRight: "1rem" }}
                />
                <span>+522382759390</span>
            </div>
            <div className={footerStyles.iconContainer}>
                <GitHub
                    sx={{ color: "white", fontSize: "2.5rem", marginRight: "1rem" }}
                />
                <span>https://github.com/EduDan343</span>
            </div>
        </footer>
    );
};