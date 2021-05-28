import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { CardHeader, CardMedia } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles({
  cardContainer: {
    // minWidth: 275,
    height: "55vh",
    overflowY: "scroll",
    textAlign: "left",
    "& .MuiGrid-root": {
      display: "flex",
      alignItems: "center",
    },
  },
  title: {
    fontSize: "20",
    color: "#334c62",
    fontWeight: "500",
  },
  newsTitle: {
    textDecoration: "none",
    color: "#7181d6",
    fontSize: 16,
  },
  newsSub: {
    color: "grey",
  },
  cover: {
    width: 130,
  },
});

export default function TopStories() {
  const classes = useStyles();
  const [article, setArticle] = useState([]);

  useEffect(() => {
    axios
      .get(
        "http://newsapi.org/v2/everything?q=covid19&language=en&sortBy=publishedAt&apiKey=89512655467641419958c682e537a7c7"
      )
      .then((res) => {
        setArticle(res.data.articles);
      });
  }, []);

  console.log(article);
  return (
    <Card className={classes.cardContainer} variant="outlined">
      <CardContent>
        <Grid item className={classes.cardTitle}>
          <Typography className={classes.title} gutterBottom>
            Top Stories & Updates
          </Typography>
        </Grid>
        <Grid item></Grid>
      </CardContent>
      {article.map(({ title, source, publishedAt, url, urlToImage }) => (
        <Grid Container direction="row">
          <Grid item xs={10}>
            <CardHeader
              title={
                <a className={classes.newsTitle} href={url}>
                  {title}
                </a>
              }
              subheader={
                <Typography
                  variant="caption"
                  className={classes.newsSub}
                >{`${source.name} - ${publishedAt}`}</Typography>
              }
            />
          </Grid>
          <Grid item xs={2}>
            <CardMedia
              component="img"
              alt="News Image"
              height="100 px"
              width="100 px"
              image={urlToImage}
            />
          </Grid>
        </Grid>
      ))}
    </Card>
  );
}
