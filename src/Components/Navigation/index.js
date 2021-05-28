import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Logo from "../../Images/covidLogo.png";
import { Avatar } from "@material-ui/core";
import TextsmsIcon from "@material-ui/icons/Textsms";
import InfoIcon from "@material-ui/icons/Info";

const drawerWidth = 80;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    color: "blue",
    backgroundColor: "#ffffff",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      boxShadow: "none",
    },
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    height: "auto",
  },

  topSection: {
    height: "20vh",
    display: "flex",
    alignItems: "center",
  },
  midSection: {
    height: "60vh",
    display: "flex",
    alignItems: "center",
    "& .bx": {
      fontSize: "1.5rem",
      color: "grey",
    },
    "& .MuiListItem-button": {
      margin: "8px 0px 8px 0px",
    },
  },
  bottomSection: {
    height: "20vh",
    display: "flex",
    alignItems: "center",
    "& .MuiSvgIcon-root": {
      color: "grey",
    },
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [value, setValue] = React.useState(1);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleClick = (event, newValue) => {
    setValue(newValue);
    setMobileOpen(false);
  };
  const drawer = (
    <div>
      {/* <div className={classes.toolbar} /> */}
      <Grid container direction="column" alignItems="center">
        <Grid item className={classes.topSection}>
          <Avatar alt="Covid Logo" src={Logo} />
        </Grid>
        <Grid item className={classes.midSection}>
          <List>
            <ListItem button value={value} onClick={handleClick}>
              <i class="bx bx-compass"></i>
            </ListItem>
            <ListItem button value={value} onClick={handleClick}>
              <i class="bx bx-globe"></i>{" "}
            </ListItem>
            <ListItem button value={value} onClick={handleClick}>
              <i class="bx bx-sun"></i>{" "}
            </ListItem>
            <ListItem button value={value} onClick={handleClick}>
              <i class="bx bx-shield-quarter"></i>
            </ListItem>
            <ListItem button value={value} onClick={handleClick}>
              <i class="bx bx-spreadsheet"></i>{" "}
            </ListItem>
            <ListItem button value={value} onClick={handleClick}>
              <i class="bx bx-help-circle"></i>
            </ListItem>
          </List>
        </Grid>
        <Grid item className={classes.bottomSection}>
          <List>
            <ListItem button>
              <TextsmsIcon />
            </ListItem>
            <ListItem button>
              <InfoIcon />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            COVID-19 Coronavirus Tracker
          </Typography>
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
