import * as React from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList } from "react-window";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListSubheader from "@mui/material/ListSubheader";
import Switch from "@mui/material/Switch";
import WifiIcon from "@mui/icons-material/Wifi";
import BluetoothIcon from "@mui/icons-material/Bluetooth";
import SnackbarContent from "@mui/material/SnackbarContent";
import Button from "@mui/material/Button";
import MuiAlert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function Settings(props) {
  return (
    <div style={{ marginTop: "-30px" }}>
      <Paper
        sx={{
          width: "840px",
          height: "300px",

          padding: "25px",
        }}
      >
        <Typography
          sx={{ flex: "1 1 100%", color: "#1976D2" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Settings
        </Typography>
        <br />
        <div
          style={{
            width: "840px",
            height: "200px",
            maxHeight: "200px",
            overflow: "auto",
          }}
        >
          {props.settings &&
            props.settings.map((item, index) => {
              return (
                <div
                  key={index}
                  style={{
                    paddingBottom: "7px",
                    display: "flex",
                    justifyContent: "center",
                    marginLeft: index == 4 ? "-20px" : "0px",
                  }}
                >
                  <Alert
                    severity={item["enable"] ? "success" : "info"}
                    style={{
                      backgroundColor: item["enable"] ? "#1976D2" : "white",
                      color: item["enable"] ? "white" : "#1976D2",
                      minWidth: index == 4 ? "650px" : "750px",
                      maxHeight: "60px",
                    }}
                  >
                    {item["p"]}
                    <h6 style={{ marginTop: "0px" }}>{item["s"]}</h6>
                  </Alert>
                  <div
                    style={{
                      marginTop: "10px",
                      paddingLeft: index == 4 ? "15px" : "0px",
                    }}
                  >
                    {index != 4 ? (
                      <Switch
                        {...label}
                        checked={item["enable"]}
                        onChange={() => props.settingsHandler(index)}
                      />
                    ) : (
                      <TextField
                        id="outlined-basic"
                        label="Redirects"
                        variant="outlined"
                        size="small"
                        type="number"
                        style={{ maxWidth: "120px" }}
                        value={props.maxRedirects}
                        onChange={(e) => {
                          props.settingsHandler2(e.target.value);
                        }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </Paper>
    </div>
  );
}
