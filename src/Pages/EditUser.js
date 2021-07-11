import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { getUser, EditUserRow } from "./Api";

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
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    error: "",
  });

  const { name, username, email, phone, website, error } = user;
  const Id = props.match.params.id;

  const getData = async () => {
    const value = await getUser(Id);
    console.log(value);
    getUser(Id).then((data) => {
      //console.log(data);
      if (data.error) {
        setUser({ ...user, error: data.error });
      } else {
        setUser({
          ...user,
          name: data.name,
          username: data.username,
          email: data.email,
          phone: data.phone,
          website: data.website,
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

    EditUserRow(Id).then((data) => {
      if (data.error) {
        setUser({ ...user, error: data.error });
        console.log(data.error);
      } else {
        setUser({
          ...user,
          name: "",
          username: "",
          email: "",
          phone: "",
          website: "",
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
          <label>Name</label>
          <input
            onChange={handleChange("name")}
            name="name"
            className="form-control input"
            placeholder="Name"
            value={name}
          />
        </div>
        <div className="form-group">
          <label>User Name</label>
          <input
            onChange={handleChange("username")}
            name="username"
            className="form-control input"
            placeholder="username"
            value={username}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            onChange={handleChange("email")}
            type="text"
            className="form-control input"
            placeholder="email"
            value={email}
            name="email"
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            onChange={handleChange("phone")}
            type="text"
            className="form-control input"
            placeholder="phone"
            value={phone}
            name="phone"
          />
        </div>
        <div className="form-group">
          <label>Website</label>
          <input
            onChange={handleChange("website")}
            type="text"
            className="form-control input"
            placeholder="website"
            value={website}
            name="website"
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
