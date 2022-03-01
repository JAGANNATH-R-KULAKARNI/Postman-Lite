import React from "react";
import MethodsUI from "./Methods";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import ServiceUI from "./services/Services";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import ResponseUI from "./response/Response";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import https from "https";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import Fab from "@mui/material/Fab";

export default function Layout(props) {
  const [loading, setLoading] = React.useState(false);
  const [method, setMethod] = React.useState("get");
  const [url, setUrl] = React.useState("");
  const [params, setParams] = React.useState("");
  const [tout, setTout] = React.useState(10000);
  const [data, setData] = React.useState({});
  const [headers, setHeaders] = React.useState({});
  const [auth, setAuth] = React.useState({});
  const [token, setToken] = React.useState(null);
  const [maxRedirects, setMaxRedirects] = React.useState(5);
  const [resData, setResData] = React.useState(null);
  const [status, setStatus] = React.useState(-1);
  const [cookief, setCookieF] = React.useState(null);
  const [cookieset, setCookieSet] = React.useState(false);
  const [resHeaders, setResHeaders] = React.useState([]);

  const [settings, setSettings] = React.useState([
    {
      p: "Enable SSL certificate verification",
      s: "Verify SSL certificates when sending a request. Verification failures will result in the request being aborted.",
      enable: true,
    },
    {
      p: "Encode URL automatically",
      s: "Encode the URL's path, query parameters, and authentication fields.",
      enable: true,
    },
    {
      p: "Disable cookie jar",
      s: "Existing cookies in the cookie jar will not be added as headers for this request.",
      enable: false,
    },
    {
      p: "Decompress the response body",
      s: "Indicates whether or not the response body should be decompressed",
      enable: false,
    },
    {
      p: "Maximum number of redirects",
      s: "Set a cap on the maximum number of redirects to follow.",
      enable: true,
    },
  ]);

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

  const resetIt = () => {
    setLoading(false);
    setMethod("get");
    setUrl("");
    setParams("");
    setTout(10000);
    setData({});
    setHeaders({});
    setAuth({});
    setToken(null);
    setMaxRedirects(5);
    setResData(null);
    setStatus(-1);
    setCookieF(null);
    setCookieSet(false);
    setResHeaders([]);
    setSettings([
      {
        p: "Enable SSL certificate verification",
        s: "Verify SSL certificates when sending a request. Verification failures will result in the request being aborted.",
        enable: true,
      },
      {
        p: "Encode URL automatically",
        s: "Encode the URL's path, query parameters, and authentication fields.",
        enable: true,
      },
      {
        p: "Disable cookie jar",
        s: "Existing cookies in the cookie jar will not be added as headers for this request.",
        enable: false,
      },
      {
        p: "Decompress the response body",
        s: "Indicates whether or not the response body should be decompressed",
        enable: false,
      },
      {
        p: "Maximum number of redirects",
        s: "Set a cap on the maximum number of redirects to follow.",
        enable: true,
      },
    ]);

    setResponse(false);
    setRows([]);
    setRowsD([]);
    setRowsH([]);

    alert("All are set to default");
  };
  const requestTheAddress = async () => {
    try {
      setLoading(true);
      const httpsAgent = new https.Agent({
        rejectUnauthorized: settings[0]["enable"],
      });
      let URL = url;

      if (
        settings[1]["enable"] &&
        URL.substr(0, 7) != "http://" &&
        URL.substr(0, 8) != "https://"
      ) {
        URL = "https://" + URL;
      }

      let cookielen = document.cookie.length;

      await axios({
        method: method,
        url: URL + params,
        data: data,
        timeout: tout,
        headers: headers,
        httpsAgent,
        withCredentials: settings[2]["enable"],
        decompress: settings[3]["enable"],
        maxRedirects: maxRedirects,
      })
        .then((u) => {
          console.log("the response");
          console.log(u);
          setStatus(u["status"]);
          setResData(u);
          if (document.cookie.length > cookielen) {
            var refe = "";
            console.log(document.cookie);
            console.log(document.cookie.length);
            let factor;

            if (cookielen == 0) factor = 0;
            else factor = 1;

            cookielen = cookielen + factor;

            for (var i = cookielen; i < document.cookie.length; i++) {
              refe = refe + document.cookie[i];
            }

            setCookieF(refe);
            setCookieSet(true);
          } else setCookieSet(false);

          setResHeaders([
            {
              key: <h2 style={{ color: "#1976D2" }}>Key</h2>,
              value: <h2 style={{ color: "#1976D2" }}>Value</h2>,
            },
            {
              key: "Date",
              value: new Date().toUTCString(),
            },
            {
              key: "Method",
              value: u["config"]["method"],
            },
            {
              key: "Timeout",
              value: u["config"]["timeout"] + " ms",
            },
            {
              key: "URL",
              value: u["config"]["url"],
            },
            {
              key: "Decompress",
              value: u["config"]["decompress"] ? "True" : "False",
            },
            {
              key: "With Credentials",
              value: u["config"]["withCredentials"] ? "True" : "False",
            },
            {
              key: "Content-Type",
              value: u["headers"]["content-type"],
            },
            {
              key: "Accept",
              value: u["config"]["headers"]["Accept"],
            },
            {
              key: "Cache-control",
              value: u["headers"]["cache-control"],
            },
          ]);
          console.log(u["data"]);
        })
        .catch((err) => {
          setStatus(-1);
          console.log("error happened");
          console.log(err.message);
          setCookieSet(false);
          return err;
        });
    } catch (err) {
      setStatus(-1);
      console.log("something went wrong");
      console.log(err.message);
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

  const authHandler = (type, payload) => {
    console.log("auth handler");
    console.log(payload);
    if (type == "basicAuth") {
      const temp = headers;
      delete temp["Authorization"];

      setHeaders(temp);
      setToken("");

      setAuth({
        username: payload[0],
        password: payload[1],
      });

      console.log("basic auth");
      console.log(auth);
      console.log(headers);
    } else if (type == "bearerAuth") {
      setToken(payload);
      setAuth({});

      setHeaders({
        ...headers,
        Authorization: `Bearer ${payload}`,
      });
      console.log("bearer auth");
      console.log(auth);
      console.log(headers);
    } else {
      const temp = headers;
      delete temp["Authorization"];

      setHeaders(temp);
      setAuth({});
      setToken("");
      console.log("no auth");
      console.log(auth);
      console.log(headers);
    }
  };

  const settingsHandler = (index) => {
    const temp = settings;
    temp[index]["enable"] = !temp[index]["enable"];

    setSettings(temp);
  };

  const settingsHandler2 = (number) => {
    setMaxRedirects(number);
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
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1
          style={{
            textAlign: "center",
            fontSize: "70px",
            color: "#1976D2",
          }}
        >
          Postman Lite
        </h1>
      </div>

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
            disableElevation
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
            <div style={{ paddingLeft: "5px" }} onClick={resetIt}>
              <Tooltip title="Reset">
                <Fab
                  color="primary"
                  aria-label="add"
                  style={{
                    fontSize: "54px",
                    maxHeight: "54px",
                  }}
                >
                  <RotateLeftIcon />
                </Fab>
              </Tooltip>
            </div>
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
          auth={auth}
          token={token}
          authHandler={authHandler}
          settings={settings}
          settingsHandler={settingsHandler}
          settingsHandler2={settingsHandler2}
          maxRedirects={maxRedirects}
        />
      </div>

      <ResponseUI
        response={response}
        setResponse={setResponse}
        size={props.size}
        timeTaken={props.timeTaken}
        info={resData}
        status={status}
        cookief={cookief}
        cookieset={cookieset}
        resHeaders={resHeaders}
      />
    </div>
  );
}
