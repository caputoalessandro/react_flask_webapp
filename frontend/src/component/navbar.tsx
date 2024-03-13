import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CameraIcon from "@mui/icons-material/PhotoCamera.js";
import Typography from "@mui/material/Typography";

function Navbar() {
    return (
        <AppBar position="relative">
            <Toolbar>
                <CameraIcon sx={{ mr: 2 }} />
                <Typography variant="h6" color="inherit" noWrap>
                    Book Shop
                </Typography>
            </Toolbar>
        </AppBar>

    )
}

export default Navbar;