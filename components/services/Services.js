import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ParamsUI from "./Params";

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

  const handleStatusParams = (type, payload) => {
    setStatus(!status);
    props.paramsHandler(type, payload);
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
          <div style={{ marginTop: "-25px" }}>
            {status ? (
              <ParamsUI rows={props.rows} paramsHandler={handleStatusParams} />
            ) : (
              <ParamsUI rows={props.rows} paramsHandler={handleStatusParams} />
            )}
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Authorization
        </TabPanel>
        <TabPanel value={value} index={2}>
          Headers
        </TabPanel>
        <TabPanel value={value} index={3}>
          Body
        </TabPanel>
        <TabPanel value={value} index={4}>
          Settings
        </TabPanel>
        <TabPanel value={value} index={5}>
          Cookies
        </TabPanel>
      </Box>
    </div>
  );
}
