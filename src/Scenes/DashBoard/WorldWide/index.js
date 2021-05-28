import React, { useEffect, useLayoutEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import NumberFormat from "react-number-format";

const useStyles = makeStyles({
  root: {
    // minWidth: 275,
  },
  title: {
    fontSize: "20",
    color: "#334c62",
    fontWeight: "500",
  },
  progressChart: {
    display: "flex",
    width: "100%",
    height: "8px",
  },
  Active: {
    backgroundColor: "#9c73d5",
    // width: "60%",
    borderRadius: "5px 0px 0px 5px",
  },
  Recovered: {
    backgroundColor: "#58dda5",
    // width: "20%",
    borderRadius: 0
  },
  Deaths: {
    backgroundColor: "#ff8fa2",
    // width: "20%",
    borderRadius: "0px 5px 5px 0px",
  },
  progressNotification: {
    display: "flex",

    "& .MuiGrid-grid-xs-true": {
      display: "flex",
      alignItems: "center",
      marginTop: "15px",
      "& .MuiTypography-body2": {
        marginLeft: "15px",
      },
    },
    "& .MuiTypography-caption": {
      paddingTop: "16px",
    },
  },
  activeDot: {
    backgroundColor: "#9c73d5",
    width: 14,
    height: 14,
    borderRadius: 3,
  },
  recoveredDot: {
    backgroundColor: "#58dda5",
    width: 14,
    height: 14,
    borderRadius: 3,
  },
  deathsDot: {
    backgroundColor: "#ff8fa2",
    width: 14,
    height: 14,
    borderRadius: 3,
  },

  count: {
    display: "flex",
    alignItems: "center",
    width: "-webkit-fill-available",
    justifyContent: "space-between",
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
  ratio: {
    textAlign: "left",
    paddingTop: 8,
  },
});

export default function WorldCases() {
  const classes = useStyles();
  const [count, setCount] = useState();
  const [active, setActive] = useState();
  const [recovered, setRecovered] = useState();
  const [death, setDeath] = useState();

  const getAll = async () => {
    const res = await axios.get("https://corona.lmao.ninja/v2/all");
    setCount(res.data.cases);
    setActive(res.data.active);
    setRecovered(res.data.recovered);
    setDeath(res.data.deaths);
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Grid item className={classes.cardTitle}>
          <Typography className={classes.title} gutterBottom>
            Coronavirus Cases -{" "}
          </Typography>
          <Typography variant="caption" component="p">
            &nbsp; Worldwide
          </Typography>
        </Grid>
        <Grid item className={classes.totalCount}>
          <Typography variant="caption">TOTAL CONFIRMED CASES</Typography>
          <Typography variant="h4" gutterBottom>
            <NumberFormat
              value={count}
              displayType={"text"}
              thousandSeparator={true}
              renderText={(value) => <div>{value}</div>}
            />
          </Typography>
        </Grid>
        <Grid item className={classes.progressChart}>
          <div
            className={classes.Active}
            style={{ width: `${(active / count) * 100}%` }}
          ></div>
          <div
            className={classes.Recovered}
            style={{ width: `${(recovered / count) * 100}%` }}
          ></div>
          <div
            className={classes.Deaths}
            style={{ width: `${(death / count) * 100}%` }}
          ></div>
        </Grid>
        <Grid item className={classes.progressNotification}>
          <Grid container direction="column">
            <Grid item xs>
              <Grid item className={classes.activeDot}></Grid>
              <Grid item className={classes.count}>
                <Typography variant="body2">Active Cases</Typography>
                <Typography variant="subtitle2">
                  <NumberFormat
                    value={active}
                    displayType={"text"}
                    thousandSeparator={true}
                    renderText={(value) => <div>{value}</div>}
                  />
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs>
              <Grid item className={classes.recoveredDot}></Grid>
              <Grid item className={classes.count}>
                <Typography variant="body2">Recovered</Typography>
                <Typography variant="subtitle2">
                  <NumberFormat
                    value={recovered}
                    displayType={"text"}
                    thousandSeparator={true}
                    renderText={(value) => <div>{value}</div>}
                  />
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs>
              <Grid item className={classes.deathsDot}></Grid>
              <Grid item className={classes.count}>
                <Typography variant="body2">Deaths</Typography>
                <Typography variant="subtitle2">
                  <NumberFormat
                    value={death}
                    displayType={"text"}
                    thousandSeparator={true}
                    renderText={(value) => <div>{value}</div>}
                  />
                </Typography>
              </Grid>
            </Grid>
            <Grid item className={classes.ratio}>
              <Typography variant="caption" component="p">
                The ratio of Recovery ({Math.round((recovered / count) * 100)}%)
                & Deaths ({Math.round((death / count) * 100)}%) globally.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
