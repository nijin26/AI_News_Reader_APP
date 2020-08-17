import React, { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";

import NewsCards from "./components/NewsCards/NewsCards";

const alanKey =
  "d212f8d4b7452ad8c5382f691062f1d12e956eca572e1d8b807a3e2338fdd0dc/stage";

const App = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles }) => {
        if (command === "newHeadlines") {
          setArticles(articles);
        }
      },
    });
  }, []);

  return (
    <div>
      <h1> Nijin's AI News Application </h1>
      <NewsCards articles={articles} />
    </div>
  );
};

export default App;
