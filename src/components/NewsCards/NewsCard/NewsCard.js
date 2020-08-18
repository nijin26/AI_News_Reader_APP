import React, { useState, useEffect, useRef, createRef } from "react";
import {
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";

import useStyles from "./styles";
import classNames from "classnames";

const NewsCard = ({
  article: { description, publishedAt, source, title, url, urlToImage },
  index,
  activeArticles,
}) => {
  const classes = useStyles();
  const [elRef, setElRef] = useState([]);
  const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50);

  useEffect(() => {
    setElRef((refs) =>
      Array(20)
        .fill()
        .map((_, j) => refs[j] || createRef())
    );
  }, []);

  useEffect(() => {
    if (index === activeArticles && elRef[activeArticles]) {
      scrollToRef(elRef[activeArticles]);
    }
  }, [index, activeArticles, elRef]);

  return (
    <Card
      ref={elRef[index]}
      className={classNames(
        classes.card,
        activeArticles === index ? classes.activeCard : null
      )}
    >
      <CardActionArea href={url} target="_blank">
        <CardMedia
          className={classes.media}
          image={
            urlToImage ||
            "https://ma-hub.imgix.net/wp-images/2019/05/28232454/news-intro-template.jpg"
          }
        />
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">
            {" "}
            {`Published At: ${new Date(publishedAt).toDateString()}`}{" "}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="h2">
            {source.name}
          </Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant="h5">
          {" "}
          {title}{" "}
        </Typography>
        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
          ></Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" href={url} target="_blank">
          {" "}
          Read More{" "}
        </Button>
        <Typography variant="h5" color="textSecondary">
          {" "}
          {` ${index + 1}`}{" "}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default NewsCard;
