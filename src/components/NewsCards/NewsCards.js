import React from "react";
import { Grid, Grow, Typography } from "@material-ui/core";

import NewsCard from "./NewsCard/NewsCard";
import useStyles from "./styles";

const NewsCards = (props) => {
  const classes = useStyles();

  return (
    <Grow in>
      <Grid
        className={classes.container}
        container
        alignItems="stretch"
        spacing={3}
      >
        {props.articles.map((article, i) => (
          <Grid
            key={i}
            item
            xs={12}
            sm={6}
            md={3}
            lg={4}
            style={{ display: "flex" }}
          >
            {" "}
            <NewsCard article={article} index={i} />{" "}
          </Grid>
        ))}
      </Grid>
    </Grow>
  );
};

export default NewsCards;
