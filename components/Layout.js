import React from "react";
import MethodsUI from "./Methods";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import ServiceUI from "./services/Services";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import ResponseUI from "./Response";

export default function Layout() {
  const [loading, setLoading] = React.useState(false);
  const [method, setMethod] = React.useState("get");
  const [url, setUrl] = React.useState("");
  const [params, setParams] = React.useState({});

  const [response, setResponse] = React.useState(false);
  const [rows, setRows] = React.useState([]);

  const requestTheAddress = async () => {
    try {
      setLoading(true);
      await axios({
        method: method,
        url: url,
        data: {},
      })
        .then((u) => {
          console.log("the response");
          console.log(u);
        })
        .catch((err) => {
          console.log("error happened");
          console.log(err.message);
        });
    } catch (err) {
      console.log("something went wrong");
      console.log(err);
    } finally {
      setLoading(false);
      setResponse(true);
    }
  };

  const paramsHandler = (type, payload) => {
    if (type == "key" || type == "value" || type == "description") {
      const temp = rows.map((item, index) => {
        if (index == payload[0]) {
          return {
            ...item,
            [type]: payload[1],
          };
        }

        return item;
      });

      const refe2 = {};

      temp.map((item) => {
        if (item["selected"]) refe2[item["key"].trim()] = item["value"].trim();
      });

      setParams(refe2);
      setRows(temp);
    } else if (type == "checkbox") {
      const temp = rows.map((item, index) => {
        if (index == payload[0]) {
          return {
            ...item,
            selected: !item["selected"],
          };
        }

        return item;
      });

      const refe2 = {};

      temp.map((item) => {
        if (item["selected"]) refe2[item["key"].trim()] = item["value"].trim();
      });

      setParams(refe2);
      setRows(temp);
    } else if (type == "delete") {
      const temp = [];

      for (var i = 0; i < rows.length; i++) {
        if (i == payload[0]) continue;
        temp.push(rows[i]);
      }

      const refe2 = {};

      temp.map((item) => {
        if (item["selected"]) refe2[item["key"].trim()] = item["value"].trim();
      });

      setParams(refe2);
      setRows(temp);
    } else {
      const temp = rows;
      temp.push({
        selected: true,
        key: "",
        value: "",
        description: "",
      });

      setRows(temp);
    }

    console.log("in params handler");
    console.log(params);
  };

  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          fontSize: "70px",
          color: "#1976D2",
        }}
      >
        Postman Lite
      </h1>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ marginTop: "-8px" }}>
          <MethodsUI method={method} setMethod={setMethod} />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Address"
            variant="outlined"
            placeholder="https://google.com"
            sx={{
              minWidth: "550px",
            }}
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          />
        </div>
        <div style={{ paddingLeft: "10px" }}>
          <Button
            variant="contained"
            endIcon={loading ? null : <SendIcon />}
            style={{ height: "54px", width: "180px" }}
            onClick={!loading ? requestTheAddress : null}
          >
            {loading ? "Requesting..." : "Send"}
          </Button>
        </div>
      </div>
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ServiceUI rows={rows} paramsHandler={paramsHandler} />
      </div>

      <ResponseUI response={response} setResponse={setResponse} />
    </div>
  );
}
