import { Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ResponsiveDrawer from "../../Components/Navigation";
import CountryCases from "./CountryCases";
import CountryWide from "./CountryWide";
import ChartData from "./DailyInfectedGraph";
import WorldGraph from "./LineChart";
import MostAffected from "./MostAffected";
import TopStories from "./TopStories";
import WorldMap from "./WorldMap";
import WorldCases from "./WorldWide";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    padding: 0,
    margin: 0,
    height: "100%",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  MainHeading: {
    padding: "15px 0px 15px 0px",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  firstContent: {
    [theme.breakpoints.down("sm")]: {
      paddingTop: 80,
    },
  },
  firstContentGrid: {
    "& .MuiGrid-grid-xs-12": {
      padding: "0px 20px 48px 0px",
    },
  },
  secondContentGrid: {
    "& .MuiGrid-grid-xs-12": {
      padding: "0px 15px 23px 0px",
    },
  },
  firstSection: {
    boxShadow: "none",
    "& .MuiGrid-container": {
      "& .MuiGrid-item": {
        "& .MuiPaper-elevation1": {
          boxShadow: "none",
        },
      },
    },
  },
  secondSection: {
    boxShadow: "none",
    "& .MuiGrid-container": {
      "& .MuiGrid-item": {
        "& .MuiPaper-elevation1": {
          boxShadow: "none",
        },
      },
    },
  },
  combinedGraph: {
    border: "1px solid lightgrey",
    "& .MuiGrid-item": {
      "& .MuiPaper-elevation1": {
        padding: 0,
      },
    },
  },
  combinedParent: {
    paddingTop: 16,
  },
  chartData: {
    padding: "16px 16px 16px 16px",
  },

  mapData: {
    padding: "8px 16px 8px 16px",
  },
  countrycaseSection: {
    padding: "16px 0px 16px 16px",
    textAlign: "center",
    color: theme.palette.text.secondary,
  },

  worldWide: {
    paddingBottom: 18,
  },
  countryWide: {
    paddingTop: 18,
  },
  secondContent: {
    "& .MuiGrid-item": {
      "& .MuiPaper-elevation1": {
        boxShadow: "none",
      },
    },
  },
}));
const DashboardToTest = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container direction="row">
        <Grid item xs={0} lg={1} md={1}>
          <ResponsiveDrawer />
        </Grid>
        <Grid item xs={12} lg={11} md={11}>
          <Typography variant="h6" className={classes.MainHeading}>
            COVID-19 Coronavirus Tracker
          </Typography>
          <Grid container direction="column">
            <Grid item xs={12} lg={12} md={12}>
              <Grid container direction="row" className={classes.firstContent}>
                <Grid
                  item
                  xs={12}
                  lg={4}
                  md={4}
                  className={classes.firstSection}
                >
                  <Grid container direction="column">
                    <Grid
                      item
                      xs={12}
                      lg={12}
                      md={12}
                      className={classes.worldWide}
                    >
                      <Paper className={classes.paper}>
                        <WorldCases />
                      </Paper>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      lg={12}
                      md={12}
                      className={classes.countryWide}
                    >
                      <Paper className={classes.paper}>
                        <CountryWide />
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  lg={8}
                  md={8}
                  className={classes.secondSection}
                >
                  <Grid container direction="row">
                    <Grid item xs={12} lg={4} md={4}>
                      <Paper className={classes.countrycaseSection}>
                        <CountryCases />
                      </Paper>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      lg={8}
                      md={8}
                      className={classes.combinedParent}
                    >
                      <Grid container className={classes.combinedGraph}>
                        <Grid
                          item
                          xs={12}
                          lg={12}
                          md={12}
                          className={classes.mapData}
                        >
                          <Paper className={classes.paper}>
                            <WorldMap />
                          </Paper>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          lg={12}
                          md={12}
                          className={classes.chartData}
                        >
                          <Paper className={classes.paper}>
                            <ChartData />
                          </Paper>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={12} md={12}>
              <Grid container direction="row" className={classes.secondContent}>
                <Grid item xs={12} lg={4} md={4}>
                  <Paper className={classes.paper}>
                    <WorldGraph />
                  </Paper>
                </Grid>
                <Grid item xs={12} lg={4} md={4}>
                  <Paper className={classes.paper}>
                    <MostAffected />
                  </Paper>
                </Grid>
                <Grid item xs={12} lg={4} md={4}>
                  <Paper className={classes.paper}>
                    <TopStories />
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default DashboardToTest;
