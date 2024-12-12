import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
} from "@mui/material";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <AppBar position="static" className="bg-black">
      <Toolbar>
        {/* Logo or Title */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Tesla Dashboard
        </Typography>

        {/* Hamburger Icon for Mobile */}
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={toggleMenu}
          className="xs:hidden sm:hidden " // Show only on medium screens and above
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>

        {/* Drawer Menu for Mobile */}
        <Drawer anchor="right" open={menuOpen} onClose={toggleMenu}>
          <List>
            <ListItem button>
              <Link href="/" passHref>
                <Typography color="inherit">Home</Typography>
              </Link>
            </ListItem>
            <ListItem button>
              <Link href="/vehicles" passHref>
                <Typography color="inherit">Vehicles</Typography>
              </Link>
            </ListItem>
            <ListItem button>
              <Link href="/profile" passHref>
                <Typography color="inherit">Profile</Typography>
              </Link>
            </ListItem>
            <ListItem button>
              <Link href="/logout" passHref>
                <Typography color="inherit">Logout</Typography>
              </Link>
            </ListItem>
          </List>
        </Drawer>

        <div className="hidden sm:block">
          <Button color="inherit">
            <Link href="/" passHref>
              <Typography>Home</Typography>
            </Link>
          </Button>
          <Button color="inherit">
            <Link href="/vehicles" passHref>
              <Typography>Vehicles</Typography>
            </Link>
          </Button>
          <Button color="inherit">
            <Link href="/profile" passHref>
              <Typography>Profile</Typography>
            </Link>
          </Button>
          <Button color="inherit">
            <Link href="/logout" passHref>
              <Typography>Logout</Typography>
            </Link>
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
