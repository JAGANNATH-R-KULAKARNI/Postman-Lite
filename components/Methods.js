import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectLabels(props) {
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 180 }}>
        <InputLabel id="demo-simple-select-helper-label">Method</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={props.method}
          label="Method"
          onChange={(e) => {
            props.setMethod(e.target.value);
          }}
        >
          <MenuItem value="get">Get</MenuItem>
          <MenuItem value="post">Post</MenuItem>
          <MenuItem value="put">Put</MenuItem>
          <MenuItem value="patch">Patch</MenuItem>
          <MenuItem value="delete">Delete</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
