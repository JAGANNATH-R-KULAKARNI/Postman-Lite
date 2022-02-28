import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import styles from "../../styles/Hover.module.css";

const headCells = [
  {
    id: "Key",

    label: "Key",
  },
  {
    id: "Value",

    label: "Value",
  },
  {
    id: "Description",

    label: "Description",
  },
];

function EnhancedTableHead(props) {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  return (
    <Toolbar>
      <Typography
        sx={{ flex: "1 1 100%", color: "#1976D2" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Body
      </Typography>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function Data(props) {
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead />
            <div style={{ height: "7px" }}></div>
            <TableBody>
              {/* stableSort(rows, getComparator(order, orderBy)) */}
              {props.rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      style={{ height: "50px" }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={row["selected"]}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                          onClick={() =>
                            props.dataHandler("checkbox", [index, "dummy"])
                          }
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        <TextField
                          label=""
                          id={"key" + index}
                          size="small"
                          value={row["key"]}
                          onChange={(e) =>
                            props.dataHandler("key", [index, e.target.value])
                          }
                        />
                      </TableCell>
                      <TableCell align="right">
                        {" "}
                        <TextField
                          label=""
                          id={"value" + index}
                          size="small"
                          value={row["value"]}
                          onChange={(e) =>
                            props.dataHandler("value", [index, e.target.value])
                          }
                        />
                      </TableCell>
                      <TableCell align="right">
                        {" "}
                        <TextField
                          label=""
                          id={"value" + index}
                          size="small"
                          value={row["description"]}
                          onChange={(e) =>
                            props.dataHandler("description", [
                              index,
                              e.target.value,
                            ])
                          }
                        />
                      </TableCell>
                      <TableCell align="right">
                        <div
                          className={styles.hovering}
                          onClick={() =>
                            props.dataHandler("delete", [index, "dummy"])
                          }
                        >
                          <CloseIcon />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}

              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ height: "10px" }}></div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => props.dataHandler("add", [])}
          >
            <AddIcon />
          </Fab>
        </div>

        <div style={{ height: "10px" }}></div>
      </Paper>
    </Box>
  );
}
