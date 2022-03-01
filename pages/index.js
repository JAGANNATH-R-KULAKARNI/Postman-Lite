import LayoutUI from "../components/Layout";
import React from "react";
import axios from "axios";
import prettyBytes from "pretty-bytes";
import Footer from "../components/Footer";
import Welcome from "../components/Welcome";

export default function Home() {
  const [welcome, setWelcome] = React.useState(true);
  const [timeTaken, setTimeTaken] = React.useState(-1);
  const [size, setSize] = React.useState(0);
  let t = 0;

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
      {welcome ? <Welcome setWelcome={setWelcome} /> : null}
      <LayoutUI timeTaken={timeTaken} size={size} />
      <br />
      <br />
      <br />
      <div style={{ paddingLeft: "90px" }}>
        <Footer />
      </div>
    </div>
  );
}
