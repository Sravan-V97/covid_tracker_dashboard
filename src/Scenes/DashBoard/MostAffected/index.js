import React, { useEffect, useLayoutEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import NumberFormat from "react-number-format";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Avatar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    // minWidth: 275,
    height: "55vh",
    overflow: "scroll",
  },
  title: {
    fontSize: "20",
    color: "#334c62",
    fontWeight: "500",
  },
  flagCell: {
    display: "flex",
    alignItems: "center",
    "& .MuiTypography-body1": {
      marginLeft: 10,
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  cardTitle: {
    textAlign: "left",
  },
}));

export default function MostAffected() {
  const classes = useStyles();
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://corona.lmao.ninja/v2/countries")
        .then((response) => response.json())
        .then((data) => {
          const sortData = (data) => {
            const sortedData = [...data];
            return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
          };
          const sortedData = sortData(data);
          setTableData(sortedData);
        });
    };
    getCountriesData();
  }, []);

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Grid item className={classes.cardTitle}>
          <Typography className={classes.title} gutterBottom>
            Most Affected Countries
          </Typography>
        </Grid>
        <Grid item className={classes.totalCount}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Country</TableCell>
                  <TableCell>Confirmed</TableCell>
                  <TableCell>Recovered</TableCell>
                  <TableCell>Deaths</TableCell>
                </TableRow>
              </TableHead>
              {tableData.map(
                ({ country, cases, countryInfo, recovered, deaths }) => (
                  <TableBody>
                    <TableRow>
                      <TableCell className={classes.flagCell}>
                        <Avatar
                          src={countryInfo.flag}
                          alt="flag"
                          className={classes.small}
                        />
                        <Typography>{country}</Typography>
                      </TableCell>
                      <TableCell>
                        <NumberFormat
                          value={cases}
                          displayType={"text"}
                          thousandSeparator={true}
                          renderText={(value) => <strong>{value}</strong>}
                        />
                      </TableCell>
                      <TableCell>
                        <NumberFormat
                          value={recovered}
                          displayType={"text"}
                          thousandSeparator={true}
                          renderText={(value) => <strong>{value}</strong>}
                        />
                      </TableCell>
                      <TableCell>
                        <NumberFormat
                          value={deaths}
                          displayType={"text"}
                          thousandSeparator={true}
                          renderText={(value) => <strong>{value}</strong>}
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )
              )}
            </Table>
          </TableContainer>
        </Grid>
      </CardContent>
    </Card>
  );
}
