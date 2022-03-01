import React from "react";
import Grid from "@mui/material/Grid";
import * as c from "../utils/Colors";
import styles from "../styles/Footer.module.css";
import Link from "next/link";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import useMediaQuery from "@mui/material/useMediaQuery";

function Footer() {
  const m1 = useMediaQuery("(min-width:430px)");
  const m2 = useMediaQuery("(min-width:700px)");
  const m3 = useMediaQuery("(min-width:1000px)");
  const m4 = useMediaQuery("(min-width:1300px)");
  const m5 = useMediaQuery("(min-width:1700px)");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingLeft: m1 ? "10%" : "0%",
        paddingRight: "10%",
      }}
    >
      <Grid container spacing={0}>
        <Grid
          item
          xs={m1 ? 4 : 12}
          style={{
            display: "flex",
            justifyContent: m1 ? "center" : "left",
            paddingLeft: m1 ? "0%" : "12%",
          }}
        >
          <div>
            <h3 style={{ fontSize: m1 ? "20px" : "15px", color: "#1976D2" }}>
              About
            </h3>
            <p style={{ fontSize: m1 ? "15px" : "10px" }}>
              {
                '"Postman-Lite" is an application used for API testing. This Appication is a HTTP client which tests HTTP requests. It was created by Jagannath R Kulakarni'
              }
            </p>
          </div>
        </Grid>
        <Grid
          item
          xs={m1 ? 4 : 6}
          style={{ display: "flex", justifyContent: m1 ? "center" : "left" }}
        >
          <div>
            <ul
              style={{ listStyleType: "none", fontSize: m1 ? "15px" : "10px" }}
            >
              <h3
                style={{
                  fontSize: m1 ? "20px" : "15px",
                  color: "#1976D2",
                  textAlign: "center",
                }}
              >
                {" "}
                Me
              </h3>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src="assets/jagannath.png"
                  style={{ width: "80px", height: "auto" }}
                />
              </div>
            </ul>
          </div>
        </Grid>

        <Grid
          item
          xs={m1 ? 4 : 6}
          style={{ display: "flex", justifyContent: m1 ? "center" : "left" }}
        >
          <div>
            <ul
              style={{ listStyleType: "none", fontSize: m1 ? "15px" : "10px" }}
            >
              <h3
                style={{
                  fontSize: m1 ? "20px" : "15px",
                  color: "#1976D2",
                }}
              >
                {" "}
                {"My Details"}
              </h3>
              <li className={styles.footer}>
                <a
                  href="https://www.linkedin.com/in/jagannath-r-kulakarni-a465841a7/"
                  passHref={true}
                  target="_blank"
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  Jagannath R Kulakarni
                </a>
              </li>
              <li>jrk123@gmail.com</li>

              <li>(+91) 9353739401</li>
              <li>Office - Bannur Ring road</li>
            </ul>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div style={{ display: "flex", paddingLeft: m1 ? "0%" : "12%" }}>
            <h4 className={styles.footer}>
              <a
                href="https://www.linkedin.com/in/jagannath-r-kulakarni-a465841a7/"
                passHref={true}
                target="_blank"
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontWeight: "lighter",
                  fontSize: m1 ? "15px" : "12px",
                }}
              >
                Copyright© Postman-Lite
              </a>
            </h4>
            <div style={{ paddingLeft: "1%" }} className={styles.linkedinIcon}>
              <a
                href="https://www.linkedin.com/in/jagannath-r-kulakarni-a465841a7/"
                passHref={true}
                target="_blank"
                style={{ textDecoration: "none", color: "#1976D2" }}
              >
                <LinkedInIcon
                  style={{
                    fontSize: "30px",
                    marginTop: "18px",
                  }}
                />
              </a>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Footer;
