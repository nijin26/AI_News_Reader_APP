import React, { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import wordsTonumbers from "words-to-numbers";

import NewsCards from "./components/NewsCards/NewsCards";
import useStyles from "./App-Styles";
import image from "./assets/logo.jpg";

const alanKey =
  "d212f8d4b7452ad8c5382f691062f1d12e956eca572e1d8b807a3e2338fdd0dc/stage";

const App = () => {
  const classes = useStyles();

  const [articles, setArticles] = useState([]);
  const [activeArticles, setActiveArticles] = useState(-1);

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === "newHeadlines") {
          setArticles(articles);
          setActiveArticles(-1);
        } else if (command === "highlight") {
          setActiveArticles((prevState) => prevState + 1);
        } else if (command === "open") {
          const parsedNumber =
            number.length > 2 ? wordsTonumbers(number) : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > 20) {
            alanBtn().playText("Please try that again");
          } else if (article) {
            window.open(article.url, "_blank");
            alanBtn().playText(`Opening article number ${parsedNumber}`);
          }
        }
      },
    });
  }, []);

  return (
    <div>
      <div className={classes.logoContainer}>
        <img src={image} className={classes.logo} alt="Logo" />
      </div>
      <NewsCards articles={articles} activeArticles={activeArticles} />
    </div>
  );
};

export default App;
