"use client";

import React, { useEffect, useState } from "react";
import AppAxios from "@/utils/AppAxios";
import Feed, { IFeed } from "./Feed";

export default function Feeds() {
  const [isLoading, setIsLoading] = useState(true);
  const [feeds, setFeeds] = useState<IFeed[]>([]);

  useEffect(() => {
    AppAxios("/feed")
      .then((res) => {
        setFeeds(res.data.data);
      })
      .catch(() => new Error("something wrong"))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <article className="col-span-8">
      <div>
        {isLoading ? (
          <p className="text-center my-3">loading...</p>
        ) : (
          feeds.map((item, i) => <Feed key={i} {...item} />)
        )}
      </div>
    </article>
  );
}
