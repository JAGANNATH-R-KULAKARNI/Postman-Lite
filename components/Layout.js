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
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";

export default function Layout() {
  const [loading, setLoading] = React.useState(false);
  const [method, setMethod] = React.useState("get");
  const [url, setUrl] = React.useState("");
  const [params, setParams] = React.useState("");
  const [tout, setTout] = React.useState(10000);
  const [data, setData] = React.useState({});
  const [headers, setHeaders] = React.useState({});

  const [response, setResponse] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [rowsD, setRowsD] = React.useState([]);
  const [rowsH, setRowsH] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;

  const requestTheAddress = async () => {
    try {
      setLoading(true);
      await axios({
        method: method,
        url: url + params,
        data: data,
        timeout: tout,
        headers: headers,
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

      const refe2 = "";
      var flag = 0;

      temp.map((item, index) => {
        if (item["selected"]) {
          if (flag == 0) {
            refe2 = refe2 + `?${item["key"].trim()}=${item["value"].trim()}`;
            flag = 1;
          } else
            refe2 = refe2 + `&${item["key"].trim()}=${item["value"].trim()}`;
        }
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

      const refe2 = "";

      var flag = 0;

      temp.map((item, index) => {
        if (item["selected"]) {
          if (flag == 0) {
            refe2 = refe2 + `?${item["key"].trim()}=${item["value"].trim()}`;
            flag = 1;
          } else
            refe2 = refe2 + `&${item["key"].trim()}=${item["value"].trim()}`;
        }
      });

      setParams(refe2);
      setRows(temp);
    } else if (type == "delete") {
      const temp = [];

      for (var i = 0; i < rows.length; i++) {
        if (i == payload[0]) continue;
        temp.push(rows[i]);
      }

      const refe2 = "";
      var flag = 0;

      temp.map((item, index) => {
        if (item["selected"]) {
          if (flag == 0) {
            refe2 = refe2 + `?${item["key"].trim()}=${item["value"].trim()}`;
            flag = 1;
          } else
            refe2 = refe2 + `&${item["key"].trim()}=${item["value"].trim()}`;
        }
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

  const dataHandler = (type, payload) => {
    if (type == "key" || type == "value" || type == "description") {
      const temp = rowsD.map((item, index) => {
        if (index == payload[0]) {
          return {
            ...item,
            [type]: payload[1],
          };
        }

        return item;
      });

      const refe2 = {};

      temp.map((item, index) => {
        if (item["selected"] && item["key"].trim().length > 0)
          refe2[item["key"].trim()] = item["value"].trim();
      });

      setData(refe2);
      setRowsD(temp);
    } else if (type == "checkbox") {
      const temp = rowsD.map((item, index) => {
        if (index == payload[0]) {
          return {
            ...item,
            selected: !item["selected"],
          };
        }

        return item;
      });

      const refe2 = {};

      temp.map((item, index) => {
        if (item["selected"] && item["key"].trim().length > 0)
          refe2[item["key"].trim()] = item["value"].trim();
      });

      setData(refe2);
      setRowsD(temp);
    } else if (type == "delete") {
      const temp = [];

      for (var i = 0; i < rowsD.length; i++) {
        if (i == payload[0]) continue;
        temp.push(rowsD[i]);
      }

      const refe2 = {};

      temp.map((item, index) => {
        if (item["selected"] && item["key"].trim().length > 0)
          refe2[item["key"].trim()] = item["value"].trim();
      });

      setData(refe2);
      setRowsD(temp);
    } else {
      const temp = rowsD;
      temp.push({
        selected: true,
        key: "",
        value: "",
        description: "",
      });

      setRowsD(temp);
    }

    console.log("in data handler");
    console.log(data);
  };

  const headersHandler = (type, payload) => {
    if (type == "key" || type == "value" || type == "description") {
      const temp = rowsH.map((item, index) => {
        if (index == payload[0]) {
          return {
            ...item,
            [type]: payload[1],
          };
        }

        return item;
      });

      const refe2 = {};

      temp.map((item, index) => {
        if (item["selected"] && item["key"].trim().length > 0)
          refe2[item["key"].trim()] = item["value"].trim();
      });

      setHeaders(refe2);
      setRowsH(temp);
    } else if (type == "checkbox") {
      const temp = rowsH.map((item, index) => {
        if (index == payload[0]) {
          return {
            ...item,
            selected: !item["selected"],
          };
        }

        return item;
      });

      const refe2 = {};

      temp.map((item, index) => {
        if (item["selected"] && item["key"].trim().length > 0)
          refe2[item["key"].trim()] = item["value"].trim();
      });

      setHeaders(refe2);
      setRowsH(temp);
    } else if (type == "delete") {
      const temp = [];

      for (var i = 0; i < rowsH.length; i++) {
        if (i == payload[0]) continue;
        temp.push(rowsH[i]);
      }

      const refe2 = {};

      temp.map((item, index) => {
        if (item["selected"] && item["key"].trim().length > 0)
          refe2[item["key"].trim()] = item["value"].trim();
      });

      setHeaders(refe2);
      setRowsH(temp);
    } else {
      const temp = rowsH;
      temp.push({
        selected: true,
        key: "",
        value: "",
        description: "",
      });

      setRowsH(temp);
    }

    console.log("in headers handler");
    console.log(headers);
  };

  const timeOutHandler = (event) => {
    if (tout <= 0) {
      alert("Timeout should be greater than 0");
      return;
    }

    handleClick(event);
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
              minWidth: "650px",
            }}
            value={url + params}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          />
        </div>
        <div style={{ paddingLeft: "10px" }}>
          <ButtonGroup
            variant="contained"
            // ref={anchorRef}
            aria-label="split button"
          >
            <Tooltip title="Set Timeout" placement="top">
              <Button
                size="small"
                // aria-controls={open ? "split-button-menu" : undefined}
                // aria-expanded={open ? "true" : undefined}
                aria-label="select merge strategy"
                aria-haspopup="menu"
                onClick={handleClick}
              >
                <ArrowDropDownIcon />
              </Button>
            </Tooltip>
            <Popper id={id} open={open} anchorEl={anchorEl} transition>
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
                    <TextField
                      id="outlined-number"
                      label="Timeout (in ms)"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      size="small"
                      value={tout}
                      onChange={(e) => {
                        setTout(e.target.value);
                      }}
                    />
                    <Button
                      style={{ height: "38px" }}
                      onClick={(e) => timeOutHandler(e)}
                    >
                      Ok
                    </Button>
                  </Box>
                </Fade>
              )}
            </Popper>
            <Tooltip title="Make The Request" placement="top">
              <Button
                variant="contained"
                endIcon={loading ? null : <SendIcon />}
                style={{ height: "54px", width: "140px", marginLeft: "0.5px" }}
                onClick={!loading ? requestTheAddress : null}
              >
                {loading ? "Requesting..." : "Send"}
              </Button>
            </Tooltip>
          </ButtonGroup>
          <FormHelperText
            id="outlined-weight-helper-text"
            style={{ textAlign: "center" }}
          >
            <b>Timeout : {tout} ms</b>
          </FormHelperText>
        </div>
      </div>
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ServiceUI
          rows={rows}
          paramsHandler={paramsHandler}
          rowsD={rowsD}
          dataHandler={dataHandler}
          rowsH={rowsH}
          headersHandler={headersHandler}
        />
      </div>

      <ResponseUI response={response} setResponse={setResponse} />
    </div>
  );
}
