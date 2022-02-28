import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

export default function Authorization() {
  const [type, setType] = React.useState("");
  const [desc, setDesc] = React.useState("Select a Type");

  function BasicAuth() {
    return (
      <div style={{ paddingTop: "50px" }}>
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          type="name"
        />
        <br />
        <br />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
        />
      </div>
    );
  }

  function BearerToken() {
    return (
      <div style={{ paddingTop: "90px" }}>
        <TextField
          id="outlined-basic"
          label="Bearer Token"
          variant="outlined"
          type="token"
        />
      </div>
    );
  }

  function NoAuth() {
    return (
      <div style={{ paddingTop: "80px" }}>
        <h3>This request does not use any authorization.</h3>
      </div>
    );
  }

  return (
    <div style={{ marginTop: "-20px" }}>
      <Paper
        style={{ height: "300px", width: "840px", padding: "25px" }}
        elevation={1}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "200px" }}>
            <Typography
              sx={{ flex: "1 1 100%", color: "#1976D2" }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              Authorization
            </Typography>
            <br />
            <br />
            <FormControl sx={{ m: 1, minWidth: 230, maxWidth: 230 }}>
              <InputLabel id="demo-simple-select-helper-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={type}
                label="Type"
                onChange={(e) => {
                  setType(e.target.value);
                  const temp = e.target.value;

                  if (temp <= 20)
                    setDesc(
                      "The authorization header will be automatically generated when you send the request. "
                    );
                  else setDesc("This request does not use any authorization.");
                }}
              >
                <MenuItem value={10}>Basic Auth</MenuItem>
                <MenuItem value={20}>Bearer Token</MenuItem>
                <MenuItem value={30}>No Auth</MenuItem>
              </Select>
              <FormHelperText>{desc}</FormHelperText>
            </FormControl>
          </div>
          <div
            style={{
              width: "20px",
              display: "flex",
              justifyContent: "center",
              paddingLeft: "100px",
            }}
          >
            <div
              style={{
                height: "260px",
                borderLeft: "10px dotted #1976D2",
              }}
            ></div>
          </div>

          <div
            style={{
              width: "570px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {type == 10 ? (
              <BasicAuth />
            ) : type == 20 ? (
              <BearerToken />
            ) : (
              <NoAuth />
            )}
          </div>
        </div>
      </Paper>
    </div>
  );
}
