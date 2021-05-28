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
  combined: {
    border: "1px solid lightgrey",
  },
}));
const DashboardTest = () => {
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
          <Grid container direction="row" className={classes.firstContent}>
            <Grid
              item
              xs={12}
              lg={4}
              md={4}
              className={classes.firstContentGrid}
            >
              <Grid container direction="column">
                <Grid item xs={12}>
                  <WorldCases />
                </Grid>
                <Grid item xs={12}>
                  <CountryWide />
                </Grid>
                <Grid item xs={12}>
                  <WorldGraph />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              lg={8}
              md={8}
              className={classes.secondContentGrid}
            >
              <Grid container direction="column">
                <Grid item xs={12}>
                  <Grid container direction="row">
                    <Grid item xs={12} lg={4} md={4}>
                      <CountryCases />
                    </Grid>
                    <Grid item xs={12} lg={8} md={8}>
                      <Grid container>
                        <Grid item className={classes.combined}>
                          <Grid container>
                            <Grid item lg={12}>
                              <WorldMap />
                            </Grid>
                            <Grid item lg={12}>
                              <ChartData />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container direction="row">
                    <Grid item xs={12} lg={6} md={6}>
                      <MostAffected />
                    </Grid>
                    <Grid item xs={12} lg={6} md={6}>
                      <TopStories />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default DashboardTest;
