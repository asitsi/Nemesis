import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { getAllPosts, UpdateDetailOfPosts } from "./Api";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
}));

const EditUser = (props) => {
  const [user, setUser] = useState({
    title: "",
    body: "",
    error: "",
  });

  const { title, body, error } = user;
  const Id = props.match.params.id;

  const getData = async () => {
    const value = await getAllPosts(Id);
    console.log(value);
    getAllPosts(Id).then((data) => {
      //console.log(data);
      if (data.error) {
        setUser({ ...user, error: data.error });
      } else {
        setUser({
          ...user,
          title: data.title,
          body: data.body,
        });
      }
    });
  };
  useEffect(() => {
    getData();
  }, []);

  const handleChange = (name) => (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setUser({ ...user, error: "", loading: true });

    UpdateDetailOfPosts(Id).then((data) => {
      if (data.error) {
        setUser({ ...user, error: data.error });
        console.log(data.error);
      } else {
        setUser({
          ...user,
          title: "",
          body: "",
          error: "",
        });
      }
    });
  };

  const classes = useStyles();
  return (
    <Wrap>
      <form className={classes.root} noValidate autoComplete="off">
        <div className="form-group">
          <label>Title</label>
          <input
            onChange={handleChange("title")}
            name="title"
            className="form-control input"
            placeholder="Name"
            value={title}
          />
        </div>
        <div className="form-group">
          <label>body</label>
          <input
            onChange={handleChange("body")}
            name="body"
            className="form-control input"
            placeholder="username"
            value={body}
          />
        </div>
        <button
          type="submit"
          onClick={onSubmit}
          className="btn btn-outline-success mb-3"
        >
          Update
        </button>
      </form>
    </Wrap>
  );
};
export default EditUser;

const Wrap = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: inherit;
  border: 1px solid #12a4d9;
  padding: 2rem;
  width: 60%;
  box-shadow: 0 0 20px #999;
  border-radius: 10px;
  .input {
    width: 100%;
    padding: 1rem;
  }
`;
