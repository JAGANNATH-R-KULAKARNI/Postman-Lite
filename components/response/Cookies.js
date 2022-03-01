import React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Switch from "@mui/material/Switch";
import styles from "../../styles/Hover.module.css";
import Tooltip from "@mui/material/Tooltip";
import Alert from "@mui/material/Alert";

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function Tokens(props) {
  const [key, setKey] = React.useState("");
  const [value, setValue] = React.useState("");

  return (
    <div>
      <Paper
        elevation={0}
        style={{ width: "100%", height: "300px", padding: "25px" }}
      >
        <br />
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: "50%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div style={{ paddingTop: !props.cookieset ? "80px" : "60px" }}>
              <Alert
                severity={props.cookieset ? "success" : "info"}
                style={{
                  backgroundColor: props.cookieset ? "#1976D2" : "white",
                  color: props.cookieset ? "white" : "#1976D2",
                  border: props.cookieset
                    ? "1px solid white"
                    : "1px solid #1976D2",
                }}
              >
                {props.cookieset
                  ? "A Cookie is set"
                  : "No Cookie has been found"}
              </Alert>
              <br />

              {props.cookieset ? (
                <div>
                  <TextField
                    id="cookie-key"
                    label="New Cookie"
                    variant="outlined"
                    value={props.cookief}
                    onChange={(e) => {
                      setKey(e.target.value);
                    }}
                    disabled
                    style={{ minWidth: "240px" }}
                  />
                </div>
              ) : null}
              <div style={{ height: "10px" }}></div>

              <ButtonGroup
                orientation="vertical"
                aria-label="vertical contained button group"
                variant="contained"
              ></ButtonGroup>
            </div>
          </div>
          <div
            style={{
              width: "50%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div style={{ marginTop: "0px" }}>
              <div className={styles.hovering}>
                <Tooltip title={`Cookies : {${document.cookie}}`} followCursor>
                  <img
                    src="/assets/cookie.jpg"
                    style={{
                      width: "500px",
                      height: "auto",
                      marginTop: "-50px",
                    }}
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
