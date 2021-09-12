import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Table, TableHead, TableRow } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import { useHistory } from "react-router";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const columns = [
  { field: "id", headerName: "ID" },
  {
    field: "status",
    headerName: "Status",
  },
];

const useStyles = makeStyles({
  table: {
    maxWidth: "650px",
    position: "absolute",
    top: "100px",
    left: "300px",
    "@media (max-width: 600px)": {
      left: "10px",
      maxWidth: "300px",
    },
  },
});

const RidesPage = () => {
  const user = firebase.auth().currentUser;
  const history = useHistory();
  const [ridesList, setRidesList] = useState(null);
  const classes = useStyles();
  useEffect(() => {
    let unmounted = false;
    const ridesRef = firebase.database().ref(`rides/${user.uid}/tripStatus`);
    ridesRef.on("value", (snapshot) => {
      const ridesList = [];
      const rides = snapshot.val();
      for (let id in rides) {
        ridesList.push({ id, ...rides[id] });
      }
      if (!unmounted) {
        setRidesList(ridesList);
      }
    });
    return () => {
      unmounted = true;
    };
  }, [user.uid]);
  console.log(ridesList);
  return (
    <div>
      {ridesList && ridesList.length !== 0 ? (
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>RIDE ID</StyledTableCell>
              <StyledTableCell>STATUS</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ridesList.map((ride, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell
                  component="th"
                  scope="row"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    history.push(`/ride/${ride.id}`);
                  }}
                >
                  {ride.id}
                </StyledTableCell>
                <StyledTableCell>{ride.status}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>RIDE ID</StyledTableCell>
              <StyledTableCell>STATUS</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                No rides booked
              </StyledTableCell>
              <StyledTableCell>N/A</StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default RidesPage;
