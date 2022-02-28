import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ParamsUI from "./Params";
import DataUI from "./Data";
import HeadersUI from "./Headers";
import AuthorizationUI from "./Authorization";
import SettingUI from "./Settings";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function Services(props) {
  const [value, setValue] = React.useState(0);
  const [status, setStatus] = React.useState(false);
  const [statusD, setStatusD] = React.useState(false);
  const [statusH, setStatusH] = React.useState(false);
  const [statusA, setStatusA] = React.useState(false);
  const [statusS, setStatusS] = React.useState(false);

  const handleStatusParams = (type, payload) => {
    setStatus(!status);
    props.paramsHandler(type, payload);
  };

  const handleStatusData = (type, payload) => {
    setStatusD(!statusD);
    props.dataHandler(type, payload);
  };

  const handleStatusHeaders = (type, payload) => {
    setStatusH(!statusH);
    props.headersHandler(type, payload);
  };

  const handleStatusAuthorization = (type, payload) => {
    setStatusA(!statusA);
    props.authHandler(type, payload);
  };

  const handleStatusSettings = (index) => {
    setStatusS(!statusS);
    props.settingsHandler(index);
  };
  const handleStatusSettings2 = (num) => {
    setStatusS(!statusS);
    props.settingsHandler2(num);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: 300,
          minWidth: "910px",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Tab label="Params" {...a11yProps(0)} />
          <Tab label="Authorization" {...a11yProps(1)} />
          <Tab label="Headers" {...a11yProps(2)} />
          <Tab label="Body" {...a11yProps(3)} />
          <Tab label="Settings" {...a11yProps(4)} />
          <Tab label="Cookies" {...a11yProps(5)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <div style={{ marginTop: "-25px", minWidth: "840px" }}>
            {status ? (
              <ParamsUI rows={props.rows} paramsHandler={handleStatusParams} />
            ) : (
              <ParamsUI rows={props.rows} paramsHandler={handleStatusParams} />
            )}
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div style={{ marginTop: "-25px", minWidth: "840px" }}>
            <AuthorizationUI
              authHandler={handleStatusAuthorization}
              auth={props.auth}
              token={props.token}
            />
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div style={{ marginTop: "-25px", minWidth: "840px" }}>
            {statusH ? (
              <HeadersUI
                rows={props.rowsH}
                headersHandler={handleStatusHeaders}
              />
            ) : (
              <HeadersUI
                rows={props.rowsH}
                headersHandler={handleStatusHeaders}
              />
            )}
          </div>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <div style={{ marginTop: "-25px", minWidth: "840px" }}>
            {statusD ? (
              <DataUI rows={props.rowsD} dataHandler={handleStatusData} />
            ) : (
              <DataUI rows={props.rowsD} dataHandler={handleStatusData} />
            )}
          </div>
        </TabPanel>
        <TabPanel value={value} index={4}>
          <div style={{ minWidth: "840px" }}>
            {statusS ? (
              <SettingUI
                settings={props.settings}
                settingsHandler={handleStatusSettings}
                settingsHandler2={handleStatusSettings2}
                maxRedirects={props.maxRedirects}
              />
            ) : (
              <SettingUI
                settings={props.settings}
                settingsHandler={handleStatusSettings}
                settingsHandler2={handleStatusSettings2}
                maxRedirects={props.maxRedirects}
              />
            )}
          </div>
        </TabPanel>
        <TabPanel value={value} index={5}>
          Cookies
        </TabPanel>
      </Box>
    </div>
  );
}
