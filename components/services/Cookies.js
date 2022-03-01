import React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Switch from "@mui/material/Switch";
import styles from "../../styles/Hover.module.css";
import Tooltip from "@mui/material/Tooltip";

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function Tokens(props) {
  const [key, setKey] = React.useState("");
  const [value, setValue] = React.useState("");

  const setCookieHandler = () => {
    document.cookie = `${key}=${value}; expires=${new Date(
      9999,
      0,
      1
    ).toUTCString()}`;

    if (key.length > 0 && value.length > 0) alert("cookies has been set :)");
    setKey("");
    setValue("");

    console.log(document.cookie);
  };

  return (
    <div>
      <Paper
        elevation={1}
        style={{ width: "840px", height: "300px", padding: "25px" }}
      >
        <Typography
          sx={{ flex: "1 1 100%", color: "#1976D2" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Cookies
        </Typography>
        <br />
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: "420px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div style={{ marginTop: "-25px" }}>
              <TextField
                id="cookie-key"
                label="Key"
                variant="outlined"
                value={key}
                onChange={(e) => {
                  setKey(e.target.value);
                }}
              />
              <div style={{ height: "10px" }}></div>
              <TextField
                id="cookie-value"
                label="Value"
                variant="outlined"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
              <div style={{ height: "10px" }}></div>

              <ButtonGroup
                orientation="vertical"
                aria-label="vertical contained button group"
                variant="contained"
              >
                <Button
                  variant="contained"
                  style={{ height: "50px", width: "220px" }}
                  onClick={setCookieHandler}
                >
                  Set The Cookie
                </Button>
              </ButtonGroup>
            </div>
          </div>
          <div
            style={{
              width: "420px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div style={{ marginTop: "-60px" }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <h5 style={{ color: "#1976D2" }}>Send Cookies to server ? </h5>
                <div style={{ marginTop: "10px", paddingLeft: "15px" }}>
                  <Switch
                    {...label}
                    checked={props.settings[2]["enable"]}
                    onChange={() => props.settingsHandler(2)}
                  />
                </div>
              </div>

              <div className={styles.hovering}>
                <Tooltip title={`Cookies : {${document.cookie}}`} followCursor>
                  <img
                    src="/assets/cookie.jpg"
                    style={{ width: "300px", height: "auto", marginTop: "0px" }}
                  />
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
}
