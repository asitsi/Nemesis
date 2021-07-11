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
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { Link } from "react-router-dom";
import { getPost } from "./Api";

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

const AllPosts = (props) => {
  const Id = props.match.params.id;
  //   console.log(Id);
  const [data, setData] = useState([]);
  const getData = async () => {
    const value = await getPost(Id);
    setData(value);
    // console.log(value);
  };
  useEffect(() => {
    getData();
  }, []);

  const classes = useStyles();
  return (
    <Wrap>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>TITLE</StyledTableCell>
              <StyledTableCell>BODY</StyledTableCell>
              <StyledTableCell align="right">Edit Post</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {row.title}
                </StyledTableCell>
                <StyledTableCell>{row.body}</StyledTableCell>

                <StyledTableCell align="right" listid={row.id}>
                  <Link to={`/Update/${row.id}`}>
                    <BorderColorIcon />
                  </Link>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Wrap>
  );
};

export default AllPosts;

const Wrap = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  width: 95%;
  height: inherit;
`;
