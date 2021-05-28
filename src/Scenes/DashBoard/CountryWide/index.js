import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import ReactFlagsSelect from "react-flags-select";
import NumberFormat from "react-number-format";

const useStyles = makeStyles({
  root: {
    // minWidth: 275,
    "& .MuiGrid-justify-xs-space-between": {
      alignItems: "center",
      paddingTop: 32,
      "& .MuiTypography-body2": {
        color: "#547796",
        fontSize: 12,
      },
    },
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
      display: "flex",
      alignItems: "center",
      "& .ReactFlagsSelect-module_selectBtn__19wW7": {
        border: "none",
        fontSize: "0.75rem !important",
        "&:focus": {
          outline: "none",
        },
        "& .ReactFlagsSelect-module_selectValue__152eS": {
          display: "none",
        },
      },
      "& .ReactFlagsSelect-module_selectOptions__3LNBJ": {
        maxWidth: "185px",
        width: "max-content",
      },
    },
  },

  totalCount: {
    display: "flex",
    justifyContent: "space-between",
    "& .MuiTypography-caption": {
      color: "#547796",
    },
    "& .MuiTypography-h5": {
      color: "#334c62",
      fontWeight: 500,
    },
  },

  Active: {
    "& .MuiTypography-h5": {
      color: "#9c73d5",
    },
  },

  Recovered: {
    "& .MuiTypography-h5": {
      color: "#58dda5",
    },
  },

  Deaths: {
    "& .MuiTypography-h5": {
      color: "#ff8fa2",
    },
  },

  Infected: {
    "& .MuiTypography-h5": {
      color: "#334c62",
      fontWeight: 500,
    },
  },

  mildDot: {
    backgroundColor: "#9babff",
    width: 14,
    height: 14,
    borderRadius: 3,
  },

  criticalDot: {
    backgroundColor: "#f5ca3d",
    width: 14,
    height: 14,
    borderRadius: 3,
  },

  infectedStats: {
    alignSelf: "center",
    padding: 8,
    border: "1px solid lightgrey",
    borderRadius: 10,
    "& .MuiGrid-grid-xs-true": {
      display: "flex",
      alignItems: "center",
      padding: 8,
    },
  },

  count: {
    display: "flex",
    alignItems: "center",
    width: "-webkit-fill-available",
    justifyContent: "space-between",
    marginLeft: 16,
    "& .MuiTypography-subtitle2": {
      paddingLeft: 32,
    },
  },
  ratio: {
    textAlign: "left",
    paddingTop: 8,
  },
});
function numFormatter(num) {
  if (num > 999 && num < 1000000) {
    return (num / 1000).toFixed(1) + "K";
  } else if (num > 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num < 900) {
    return num;
  }
}
export default function CountryWide() {
  const classes = useStyles();
  const [country, setCountry] = useState(null);
  const [countries, setCountries] = useState([]);
  const [defaultCountry, setDefaultCountry] = useState(null);
  const [active, setActive] = useState(null);
  const [recovered, setRecovered] = useState(null);
  const [death, setDeath] = useState(null);
  const [infected, setInfected] = useState(null);
  const [critical, setCritical] = useState(null);
  const [cases, setCases] = useState(null);

  useEffect(() => {
    axios.get("https://corona.lmao.ninja/v2/countries").then((res) => {
      setCountries(res.data.countries);
    });

    axios.get("https://ipapi.co/country").then((res) => {
      setDefaultCountry(res.data);

      axios
        .get(`https://corona.lmao.ninja/v2/countries/${res.data}`)
        .then((res) => {
          setCases(res.data.cases);
          setActive(res.data.active);
          setRecovered(res.data.recovered);
          setDeath(res.data.deaths);
          setInfected(res.data.todayCases);
          setCritical(res.data.critical);
          setCountry(res.data.country);
        });
    });
  }, []);

  const setSelectedCountry = (country) => {
    axios
      .get(`https://corona.lmao.ninja/v2/countries/${country}`)
      .then((res) => {
        setCases(res.data.cases);
        setActive(res.data.active);
        setRecovered(res.data.recovered);
        setDeath(res.data.deaths);
        setInfected(res.data.todayCases);
        setCritical(res.data.critical);
        setCountry(res.data.country);
      });
  };

  let html = <CircularProgress />;
  if (defaultCountry !== null) {
    html = (
      <ReactFlagsSelect
        countries={countries}
        searchable={true}
        defaultCountry={defaultCountry}
        onSelect={(code) => setSelectedCountry(code)}
        selectedSize={20}
        alignOptions="center"
        className={classes.flagSelect}
      />
    );
  }

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Grid item className={classes.cardTitle}>
          <Typography className={classes.title} gutterBottom>
            Coronavirus Cases -{" "}
          </Typography>
          <Typography variant="caption" component="p">
            &nbsp; {country}
            {html}
          </Typography>
        </Grid>
        <Grid item className={classes.totalCount}>
          <Grid item className={classes.Active}>
            <Typography variant="caption">CONFIRMED</Typography>
            <Typography variant="h5" gutterBottom>
              {numFormatter(cases)}
            </Typography>
          </Grid>
          <Grid item className={classes.Recovered}>
            <Typography variant="caption">RECOVERED</Typography>
            <Typography variant="h5" gutterBottom>
              {numFormatter(recovered)}
            </Typography>
          </Grid>
          <Grid item className={classes.Deaths}>
            <Typography variant="caption">DEATHS</Typography>
            <Typography variant="h5" gutterBottom>
              {numFormatter(death)}
            </Typography>
          </Grid>
        </Grid>
        <Grid item className={classes.ratio}>
          <Typography variant="caption" component="p">
            The ratio of Recovery ({Math.round((recovered / cases) * 100)}%) &
            Deaths ({Math.round((death / cases) * 100)}%) {country}.
          </Typography>
        </Grid>
        <Grid container direction="row" justify="space-between">
          <Grid item className={classes.Infected}>
            <Typography variant="body2">
              Currently Infected <br /> Patients
            </Typography>
            <Typography variant="h5" gutterBottom>
              <NumberFormat
                value={infected}
                displayType={"text"}
                thousandSeparator={true}
                renderText={(value) => <div>{value}</div>}
              />
            </Typography>
          </Grid>
          <Grid item className={classes.infectedStats}>
            <Grid item xs>
              <Grid item className={classes.mildDot}></Grid>
              <Grid item className={classes.count}>
                <Typography variant="body2">In Mild Condition</Typography>
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
              <Grid item className={classes.criticalDot}></Grid>
              <Grid item className={classes.count}>
                <Typography variant="body2">Critical or Serious</Typography>
                <Typography variant="subtitle2">
                  <NumberFormat
                    value={critical}
                    displayType={"text"}
                    thousandSeparator={true}
                    renderText={(value) => <div>{value}</div>}
                  />
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
