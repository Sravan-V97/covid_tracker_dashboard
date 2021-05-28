import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { fetchDailyData } from "../../../Components/api/index";
import ApexChart from "../../../Components/ApexChart";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Grid item style={{ overflow: "hidden", width: "100%" }}>
          {children}
        </Grid>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: "20",
    color: "#334c62",
    fontWeight: "500",
  },

  cardTitle: {
    display: "flex",
    alignItems: "baseline",
    "& .MuiTypography-caption": {
      color: "#547796",
    },
  },

  totalCount: {
    textAlign: "left",
    "& .MuiTypography-caption": {
      color: "#547796",
    },
    "& .MuiTypography-h4": {
      color: "#334c62",
      fontWeight: 500,
    },
  },

  Appbar: {
    backgroundColor: "#ffffff",
    borderBottom: "1px solid lightgrey",
    boxShadow: "none",

    "& .MuiButtonBase-root": {
      "& .MuiTab-wrapper": {
        textTransform: "capitalize",
      },
    },
  },

  apexChart: {
    "& .MuiGrid-root": {
      // height: 200,
    },
  },
});

export default function WorldGraph(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };
    fetchAPI();
  });
  // console.log(dailyData);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  // console.log(dailyData);

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Grid item className={classes.cardTitle}>
          <Typography className={classes.title} gutterBottom>
            Cases Over Time -{" "}
          </Typography>
          <Typography variant="caption" component="p">
            &nbsp; Worldwide
          </Typography>
        </Grid>
        <Grid item className={classes.totalCount}>
          <Typography variant="caption" color="#bac2fb">
            The charts below show daily and total case trends
          </Typography>
        </Grid>
        <Grid item>
          <AppBar position="static" className={classes.Appbar}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              //   variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Confirmed Cases" />
              <Tab label="Daily Increase" />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel
              value={value}
              index={0}
              dir={theme.direction}
              classname={classes.apexChart}
            >
              <Grid item classname={classes.apexChartGrid}>
                <Typography
                  variant="caption"
                  style={{ color: "#334c62", fontWeight: "500" }}
                >
                  Flow of cases
                </Typography>
                <ApexChart chartValues={dailyData} />
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              Item Two
            </TabPanel>
          </SwipeableViews>
        </Grid>
      </CardContent>
    </Card>
  );
}
