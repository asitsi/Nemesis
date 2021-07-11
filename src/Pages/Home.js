import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";
import EditIcon from "@material-ui/icons/Edit";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import { getAllUsers, DeleteRow } from "./Api";

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

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const Home = () => {
  const [data, setData] = useState([]);
  const getData = async () => {
    const value = await getAllUsers();
    setData(value);
  };
  useEffect(() => {
    getData();
  }, []);

  const deleteUser = (Id) => {
    DeleteRow(Id).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        getData();
      }
    });
  };
  const classes = useStyles();

  return (
    <Wrap>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>NAME</StyledTableCell>
              <StyledTableCell align="right">USERNAME</StyledTableCell>
              <StyledTableCell align="right">EMAIL</StyledTableCell>
              <StyledTableCell align="right">PHONE</StyledTableCell>
              <StyledTableCell align="right">WEBSITE</StyledTableCell>
              <StyledTableCell align="right">Edit User row</StyledTableCell>
              <StyledTableCell align="right">
                Update detail of User
              </StyledTableCell>
              <StyledTableCell align="right">Delete User row</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.username}</StyledTableCell>
                <StyledTableCell align="right">
                  <a
                    href={`mailto:${row.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {row.email}
                  </a>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <a
                    href={`tel:${row.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {row.phone}
                  </a>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <a href={row.website}>{row.website}</a>
                </StyledTableCell>
                <StyledTableCell align="right" listid={row.id}>
                  <Link to={`/EditUser/${row.id}`}>
                    <EditIcon />
                  </Link>
                </StyledTableCell>
                <StyledTableCell align="right" listid={row.id}>
                  <Link to={`/user/${row.id}/post`}>
                    <BorderColorIcon />
                  </Link>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <button
                    onClick={() => {
                      deleteUser(row.id);
                    }}
                  >
                    <DeleteIcon className="deleteButton" />
                  </button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Wrap>
  );
};

export default Home;

const Wrap = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  width: 95%;
  height: inherit;
  button {
    background: none;
    border: none;
  }
  .deleteButton {
    color: red;
    :hover {
      color: #12a4d9;
    }
  }
`;
