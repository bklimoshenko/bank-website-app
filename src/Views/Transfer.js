import React, {useState} from 'react';

import {Button,
        TextField,
        Container,
        Select,
        Divider,
        MenuItem,
        InputLabel,
        FormControl,
    } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'

import {Redirect, Route} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    formControl: {
      minWidth: 350,
      maxWidth: 350
    },
  }));

const initialFormValues = {
    transferFrom: "",
    transferTo: "",
    amount: 0,
}

const Transfer = ({currentUserID, openAccounts, transferInputHandler}) => {
    const classes = useStyles();
    
    const [values, setValues] = useState(initialFormValues);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]: value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (values.transferFrom && values.transferTo && values.amount ){
            let indexFromAccount = openAccounts.findIndex(function(item, i){
                return item.id === values.transferFrom;
            });
        
            let fromBal = ((parseInt(openAccounts[indexFromAccount].balance)) - parseInt(values.amount));

            if (fromBal < 0){
                alert("There is too little money in the first account")
            } else {
                transferInputHandler(values);
            }
        }
    }

    const handleReset = () => {
        setValues(initialFormValues);
    }


    var cardsCurrentUser = openAccounts.map(card => card.boundAccountID == currentUserID ? (
        <MenuItem key={card.id} value={card.id}>{card.cardNumber}</MenuItem>
    ) : (
        null
    ))

    var cards = openAccounts.map((card) => 
        <MenuItem key={card.id} value={card.id}>{card.cardNumber}</MenuItem>
    );


    if (currentUserID === -1) {
        return (
            <Route>
                <Redirect to='/'/>
            </Route>
        )
    } else {
        return (
            <div>
                <Container maxWidth="sm">
                    <FormControl className={classes.formControl}>
                        <InputLabel>From:</InputLabel>
                        <Select
                            required
                            margin="dense"
                            name="transferFrom"
                            fullWidth
                            value={values.transferFrom}
                            onChange={handleInputChange}>
                            {cardsCurrentUser}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel>To:</InputLabel>
                        <Select
                            required
                            margin="dense"
                            name="transferTo"
                            fullWidth
                            value={values.transferTo}
                            onChange={handleInputChange}>
                            {cards}
                        </Select>
                    </FormControl>
                    <TextField
                        className={classes.formControl}
                        required
                        margin="dense"
                        id="amount"
                        label="Transfer Amount"
                        type="number"
                        InputLabelProps={{shrink: true}}
                        fullWidth
                        value={values.amount}
                        onChange={handleInputChange}
                        name="amount"/>
                    <Divider className={classes.formControl}/>
                    <Button type="reset" onClick={handleReset} color="secondary">
                        Reset
                    </Button>
                    <Button type="submit"  onClick={handleSubmit} color="primary">
                        Transfer Money
                    </Button>
                </Container>
            </div>
        )
    }
}

export default Transfer;