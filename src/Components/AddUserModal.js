import React, {useState} from 'react';

import {Button,
        TextField,
        Dialog,
        DialogActions,
        DialogContent,
        DialogContentText,
        DialogTitle,
        Fab} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const initialFormValues = {
    name: "",
    email: "",
    password: "",
}

export default function AddUserModal({addUserHandler}) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const [values, setValues] = useState(initialFormValues);

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setValues({
        ...values, 
        [name]: value,
    })
  }

  const handleSubmit = (e) => {
      if (values.name && values.email && values.password){
        e.preventDefault();
        addUserHandler(values)
        setOpen(false);
      }
  }

  const handleReset = () => {
    setValues(initialFormValues);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Fab className={classes.fab} variant="extended" color="primary" onClick={handleClickOpen}>
        Add a new user
      </Fab>
      <Dialog open={open} onClose={handleClose} onSubmit={handleSubmit}>
        <DialogTitle id="form-dialog-title">Add New Card</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the information to create a new user: 
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={values.name}
            onChange={handleInputChange}
            name="name"
          />
          <TextField
            required
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            value={values.email}
            onChange={handleInputChange}
            name="email"
          />
          <TextField
            required
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            value={values.password}
            onChange={handleInputChange}
            name="password"
          />
        </DialogContent>
        <DialogActions>
          <Button type="reset" onClick={handleReset} color="secondary">
            Reset
          </Button>
          <Button type="submit" variant="contained" onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}