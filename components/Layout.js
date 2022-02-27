import React from "react";
import MethodsUI from "./Methods";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import ServiceUI from "./services/Services";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

export default function Layout() {
  const [loading, setLoading] = React.useState(false);
  const [method, setMethod] = React.useState("get");
  const [url, setUrl] = React.useState("");

  const requestTheAddress = async () => {
    try {
      setLoading(true);
      await axios({
        method: method,
        url: url,
      })
        .then((u) => {
          alert("here");
          console.log("the response");
          console.log(u);
        })
        .catch((err) => {
          console.log("error happened");
          console.log(err);
        });
    } catch (err) {
      console.log("something went wrong");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h1 style={{ textAlign: "center", fontSize: "70px" }}>Postman Lite</h1>
      <br />
      <br />
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
        <ServiceUI />
      </div>
    </div>
  );
}
