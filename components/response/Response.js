import * as React from "react";
import PropTypes from "prop-types";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import RecordUI from "./Records";
import Infos from "./Infos";

const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(60% - 15px)",
}));

function SwipeableEdgeDrawer(props) {
  const { window } = props;
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // This is used only for the example
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(80% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />

      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={props.response}
        onClose={() => props.setResponse(false)}
        onOpen={() => props.setResponse(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        // ModalProps={{
        //   keepMounted: true,
        // }}
      >
        {props.status != -1 ? (
          <div>
            <StyledBox
              sx={{
                position: "absolute",
                top: -drawerBleeding,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                visibility: "visible",
                right: 0,
                left: 0,
              }}
            >
              <Puller />
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: "25px",
                  }}
                >
                  <Infos
                    status={props.status}
                    timeTaken={props.timeTaken}
                    size={props.size}
                  />
                </div>
              </div>
            </StyledBox>
            <br />

            <div style={{ width: "100%" }}>
              <RecordUI
                info={props.info}
                cookief={props.cookief}
                cookieset={props.cookieset}
                resHeaders={props.resHeaders}
              />
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div>
              <h1 style={{ paddingTop: "20px", color: "#1976D2" }}>
                Something Went Wrong, Check your Details!
              </h1>
              <img
                src={"https://media.giphy.com/media/OiC5BKaPVLl60/giphy.gif"}
                width="700px"
                height="auto"
              />
            </div>
          </div>
        )}
      </SwipeableDrawer>
    </Root>
  );
}

SwipeableEdgeDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default SwipeableEdgeDrawer;
