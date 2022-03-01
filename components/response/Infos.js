import * as React from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: "200px",
  elevation: 3,
  border: "2px solid #1976D2",
}));

export default function Infos(props) {
  return (
    <div>
      <Stack direction="row" spacing={10}>
        <Item>
          <b>Status :</b> {props.status}
        </Item>
        <Item>
          {" "}
          <b>Time Taken : </b>
          {props.timeTaken} ms
        </Item>
        <Item>
          {" "}
          <b>Size :</b> {props.size}
        </Item>
      </Stack>
    </div>
  );
}
