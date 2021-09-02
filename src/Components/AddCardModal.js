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
    boundAccountID: 1,
    cardNumber: "",
    securityCode: "",
    balance: 0,
    expirationDate: new Date(),
}

export default function AddCardModal({addCardHandler, currentUser}) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const [values, setValues] = useState(initialFormValues);

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setValues({
        ...values, 
        [name]: value,
        boundAccountID: currentUser
    })
  }

  const handleSubmit = (e) => {
      if (values.cardNumber && values.securityCode && values.balance && values.expirationDate){ 
        e.preventDefault();
        addCardHandler(values)
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
        Add a new card
      </Fab>
      <Dialog open={open} onClose={handleClose} onSubmit={handleSubmit}>
        <DialogTitle id="form-dialog-title">Add New Card</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the following information to add a new card to your account: 
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="cardNumber"
            label="Card Number"
            type="text"
            fullWidth
            value={values.cardNumber}
            onChange={handleInputChange}
            name="cardNumber"
          />
          <TextField
            required
            margin="dense"
            id="securityCode"
            label="Security Code"
            type="number"
            fullWidth
            value={values.securityCode}
            onChange={handleInputChange}
            name="securityCode"
          />
          <TextField
            required
            margin="dense"
            id="expirationDate"
            label="Expiration Date"
            InputLabelProps={{shrink: true}}
            type="month"
            fullWidth
            value={values.expirationDate}
            onChange={handleInputChange}
            name="expirationDate"
          />
          <TextField
            required
            margin="dense"
            id="balance"
            label="Current Balance"
            type="number"
            InputLabelProps={{shrink: true}}
            fullWidth
            value={values.balance}
            onChange={handleInputChange}
            name="balance"
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