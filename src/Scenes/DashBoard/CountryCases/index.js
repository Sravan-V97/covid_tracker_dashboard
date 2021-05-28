import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NumberFormat from "react-number-format";

const useStyles = makeStyles({
  root: {
    borderLeft: "1px solid lightgrey",
    borderTop: "1px solid lightgrey",
    borderBottom: "1px solid lightgrey",
    borderRadius: 5,
  },
  table: {
    "& .MuiTableCell-body": {
      borderBottom: "none",
    },
  },
  heading: {
    margin: 0,
    width: "auto",
    justifyContent: "space-between",
    alignItems: "center",
    "& .MuiTypography-body2": {
      fontWeight: "500",
    },
    "& .bx-search": {
      fontSize: "1.2rem",
    },
  },
  tableContainer: {
    height: "88vh",
    overflowY: "scroll",
    //   "&::-webkit-scrollbar": {
    //     width: "5px",
    //   },

    //   "& ::-webkit-scrollbar-track": {
    //     background: "#f1f1f1",
    //   },

    //   "& ::-webkit-scrollbar-thumb": {
    //     background: "#888 ",
    //   },

    //   "& ::-webkit-scrollbar-thumb:hover": {
    //     background: "#555",
    //   },
  },
  button: {
    "& .MuiButton-label": {
      fontSize: 12,
      color: "#3f51b5",
      textTransform: "none",
    },

    border: "1px solid #80808080",
    borderRadius: 30,
    padding: "7px 36px",
    margin: "20px 0px 16px 0px",
  },
});

function CountryCases() {
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
  console.log(tableData);

  return (
    <div className={classes.root}>
      <Grid container direction="row" spacing={4} className={classes.heading}>
        <Grid item>
          <Typography variant="body2" gutterBottom>
            Cases by Country
          </Typography>{" "}
        </Grid>
        <Grid item>
          <IconButton>
            <i class="bx bx-search"></i>
          </IconButton>
        </Grid>
      </Grid>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <div>
          <Table className={classes.table}>
            {tableData.map(({ country, cases }) => (
              <TableBody>
                <TableRow>
                  <TableCell align="left">{country}</TableCell>
                  <TableCell align="right">
                    <NumberFormat
                      value={cases}
                      displayType={"text"}
                      thousandSeparator={true}
                      renderText={(value) => <strong>{value}</strong>}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </div>
      </TableContainer>
      <Button className={classes.button}>Country wise statistics </Button>
    </div>
  );
}

export default CountryCases;
