import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import LayoutUI from "../components/Layout";
import React from "react";
import axios from "axios";
import prettyBytes from "pretty-bytes";

export default function Home() {
  let t = 0;
  const [timeTaken, setTimeTaken] = React.useState(-1);
  const [size, setSize] = React.useState(0);

  axios.interceptors.request.use((request) => {
    t = new Date().getTime();
    return request;
  });

  function updateEndTime(response) {
    if (timeTaken == -1) {
      setTimeTaken(new Date().getTime() - t);
      setSize(
        prettyBytes(
          JSON.stringify(response.data).length +
            JSON.stringify(response.headers).length
        )
      );
    }

    return response;
  }

  axios.interceptors.response.use(updateEndTime, (e) => {
    return Promise.reject(updateEndTime(e.response));
  });

  return (
    <div>
      <LayoutUI timeTaken={timeTaken} size={size} />
    </div>
  );
}
