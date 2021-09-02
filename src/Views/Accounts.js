import { CssBaseline, Container, Grid, } from '@material-ui/core';
import React from 'react';
import UserCard from '../Components/UserCard';
import {Redirect, Route} from 'react-router-dom';
import AddCardModal from "../Components/AddCardModal";

const Accounts = ({data, currentUser, deleteCardHandler, addCardHandler}) => {

    // redirect if data not loaded in first. Will force users to log in without having react crash
    if (currentUser === -1){
        return (
            <Route>
                <Redirect to="/"/>
            </Route>
        )
    }
    var userCards = data.map(card => card.boundAccountID == currentUser ? (
        <Grid item container xs={12} md={6} lg={4} key={card.id}>
            <UserCard
                        cardNumber={card.cardNumber}
                        securityCode={card.securityCode}
                        expDate={card.expirationDate}
                        balance={card.balance}
                        cardUID={card.id}
                        deleteCardHandler={deleteCardHandler}/>
        </Grid>
    ) : (
        null
    )) 

    if (userCards === null) {
        return <div>Empty</div>
    }

    return(
        <div>
            <CssBaseline/>
            <Container maxWidth="md">
                <Grid   container direction="row" 
                        justify="center" 
                        alignItems="flex-start" 
                        spacing={3}>
                    {userCards}
                </Grid>
            </Container>
            <AddCardModal addCardHandler={addCardHandler} currentUser={currentUser}/> 
        </div>
    )
}

export default Accounts;

