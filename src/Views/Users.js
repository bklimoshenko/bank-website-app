import React, {useState} from 'react'
import {Button, 
        Container,
        TextField,
        Typography} from '@material-ui/core'

import AddUserModal from '../Components/AddUserModal'

const initialLoginValues = {
    emailLogin: "",
    passwordLogin: "",
}

const Users = ({users, currentUser, currentUserHandler, newUserHandler}) => {
    
    const [values, setValues] = useState(initialLoginValues);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setValues({
            ...values, 
            [name]: value,
        })
    }

    const handleLogin = (e) => {
        if (values.emailLogin && values.passwordLogin){
            e.preventDefault();

            let index = users.findIndex(function(item){
                return item.email === values.emailLogin;
            })

            if (values.passwordLogin === users[index].password){
                let userID = users[index].id;
                currentUserHandler(userID);
            }
        }
    }
    const handleReset = () => {
        setValues(initialLoginValues);
    }

    const addUserHandler = (data) => {
        newUserHandler(data);
    }

    const userLogOutHandler = () => {
        setValues(initialLoginValues)
        currentUserHandler(-1)
    }

    if (currentUser === -1)
    {
        return (
            <div>
                <Container maxWidth="sm">
                    <TextField 
                        required
                        margin="dense"
                        id="emailLogin"
                        label="Email"
                        type="email"
                        fullWidth
                        value={values.emailLogin}
                        onChange={handleInputChange}
                        name="emailLogin"
                    />
                    <TextField 
                        required
                        margin="dense"
                        id="passwordLogin"
                        label="Password"
                        type="password"
                        fullWidth
                        onChange={handleInputChange}
                        value={values.passwordLogin}
                        name="passwordLogin"
                    />
                    <Button type="reset" color="secondary" onClick={handleReset}> 
                        Reset
                    </Button>
                    <Button type="submit" color="primary" variant="outlined" onClick={handleLogin}>
                        Login
                    </Button>

                    <AddUserModal addUserHandler={addUserHandler}/>

                </Container>


            </div>
        )
    } else {
        return (
            <div>
                <Container maxWidth="sm">
                    <Typography>Hello</Typography>
                    {/* <Divider/> */}
                    <Button fullWidth={true} variant="outlined" color="secondary" onClick={userLogOutHandler}>
                        Log Out
                    </Button>
                </Container>

            </div>
        )
    }
    
}

export default Users;