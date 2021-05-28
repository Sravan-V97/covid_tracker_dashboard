import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactTooltip from "react-tooltip";
import axios from "axios";
import MapChart from "./MapChart";
import { Divider, Grid, makeStyles } from "@material-ui/core";
import NumberFormat from "react-number-format";

const useStyles = makeStyles({
  strong: {
    alignSelf: "right",
    float: "right",
  },
});

export default function WorldMap() {
  const classes = useStyles();
  const [content, setContent] = useState("");
  const [country, setCountry] = useState(null);
  const [active, setActive] = useState(null);
  const [recovered, setRecovered] = useState(null);
  const [death, setDeath] = useState(null);
  const [cases, setCases] = useState(null);

  const setSelectedCountry = (country) => {
    axios
      .get(`https://corona.lmao.ninja/v2/countries/${country}`)
      .then((res) => {
        setCases(res.data.cases);
        setActive(res.data.active);
        setRecovered(res.data.recovered);
        setDeath(res.data.deaths);
        setCountry(res.data.country);
      });
  };

  useEffect(() => {
    setSelectedCountry(content);
  }, [content]);

  return (
    <div>
      <MapChart setTooltipContent={setContent} />
      <ReactTooltip type="light" multiline="true">
        {
          <Grid
            container
            direction="column"
            // spacing={3}
          >
            <Grid item>
              <Grid
                container
                direction="row"
                justify="space-between"
                style={{ width: 150 }}
              >
                <Grid item>{country}</Grid>
                <Grid item>
                  {
                    <strong>
                      {
                        <NumberFormat
                          value={cases}
                          displayType={"text"}
                          thousandSeparator={true}
                          renderText={(value) => <div>{value}</div>}
                        />
                      }
                    </strong>
                  }
                </Grid>
              </Grid>
            </Grid>
            <br />
            <Divider />
            <br />
            <Grid item>
              <Grid
                container
                direction="row"
                justify="space-between"
                style={{ width: 150 }}
              >
                <Grid item>Active</Grid>
                <Grid item>
                  {
                    <strong>
                      {
                        <NumberFormat
                          value={active}
                          displayType={"text"}
                          thousandSeparator={true}
                          renderText={(value) => <div>{value}</div>}
                        />
                      }
                    </strong>
                  }
                </Grid>
              </Grid>
            </Grid>
            <br />
            <Grid item>
              <Grid
                container
                direction="row"
                justify="space-between"
                style={{ width: 150 }}
              >
                <Grid item>Recovered</Grid>
                <Grid item>
                  {
                    <strong>
                      {
                        <NumberFormat
                          value={recovered}
                          displayType={"text"}
                          thousandSeparator={true}
                          renderText={(value) => <div>{value}</div>}
                        />
                      }
                    </strong>
                  }
                </Grid>
              </Grid>
            </Grid>
            <br />
            <Grid item>
              <Grid
                container
                direction="row"
                justify="space-between"
                style={{ width: 150 }}
              >
                <Grid item>Deaths</Grid>
                <Grid item>
                  {
                    <strong>
                      {
                        <NumberFormat
                          value={death}
                          displayType={"text"}
                          thousandSeparator={true}
                          renderText={(value) => <div>{value}</div>}
                        />
                      }
                    </strong>
                  }
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        }
      </ReactTooltip>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<WorldMap />, rootElement);
