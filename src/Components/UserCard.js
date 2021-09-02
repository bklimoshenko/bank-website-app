import React from 'react'
import { Card,
        CardActions,
        CardContent,
        Button,
        Typography,
        makeStyles,
        Divider,
        } from "@material-ui/core"

const useStyles = makeStyles({
    root: {
        maxWidth: 450,
    },
    media: {
        height: 150,
    },
});

const UserCard = ({cardNumber, securityCode, expDate, balance, cardUID, deleteCardHandler}) => {
    const classes = useStyles();

    return (
        <div>
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Typography align="center" gutterBottom variant="h5" color="primary" component="h2">{cardNumber}</Typography>
                    <Typography align="center" gutterBottom variant="h5" color="textPrimary" component="h3">${balance}</Typography>
                    <Divider variant="middle"/>
                    <Typography variant="body2" color="textSecondary" component="h3">Security Code: {securityCode}</Typography>
                    <Typography variant="subtitle2" color="textSecondary" component="h3">Expires: {expDate}</Typography>
                </CardContent>
                <Divider/>
                <CardActions>
                    <Button size="small" color="secondary" variant="contained" onClick={() => deleteCardHandler(cardUID)}>Delete Card</Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default UserCard;
