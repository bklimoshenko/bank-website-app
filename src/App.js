import React,
        { useEffect,
          useState,} from 'react'

import {BrowserRouter,
          Route,
          Switch} from 'react-router-dom'

import {Toolbar,
        CssBaseline} from "@material-ui/core"

import Accounts from './Views/Accounts'
import Transfer from './Views/Transfer'
import NavDrawer from './Components/NavDrawer'
import Users from './Views/Users'

function App() {
  const [users, setUsers] = useState([]);
  const [openAccounts, setOpenAccounts] = useState([]);
  const [currentUserID, setCurrentUser] = useState(0);

  useEffect(() => {
    fetchUsers();
    fetchAccounts();
    setCurrentUser(-1);
  }, [])

  async function fetchUsers(){
    const result = await (await fetch('http://localhost:3004/users')).json();
    setUsers(result);
  }

  async function fetchAccounts(){
    const result = await (await fetch('http://localhost:3004/openaccounts')).json();
    setOpenAccounts(result)
  }

  const currentUserHandler = (newUser) => {
    setCurrentUser(newUser);
  }

  const addUserHandler = async (newUser) => {
    await fetch('http://localhost:3004/users', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json"
      }
    }).catch((error) => {
      console.log(error)
    })
    fetchUsers();
  }

  const deleteCardHandler = async (cardID) => {
    let newAccountsState = Array.from(openAccounts)
    let index = newAccountsState.findIndex(function(item, i){
      return item.id === cardID;
    });
    newAccountsState.splice(index, 1);
    setOpenAccounts(newAccountsState);

    await fetch('http://localhost:3004/openaccounts/' + cardID, {
      method: 'DELETE',
    }).catch((error) => {
      console.log(error);
    })
    fetchAccounts();
  }

  const addCardHandler = async (data) => {
    await fetch('http://localhost:3004/openaccounts',{
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).catch((error) => {
      console.log(error);
    })
    await fetchAccounts();
  }

  const transferInputHandler = async (data) => {
    let indexToAccount = openAccounts.findIndex(function(item, i){
      return item.id === data.transferTo;
    });
    let indexFromAccount = openAccounts.findIndex(function(item, i){
      return item.id === data.transferFrom;
    });

    let fromBal = ((parseInt(openAccounts[indexFromAccount].balance)) - parseInt(data.amount));
    let toBal = ((parseInt(openAccounts[indexToAccount].balance)) + parseInt(data.amount));

    console.log(data)

    await fetch('http://localhost:3004/openaccounts/' + data.transferFrom, {
      method: 'PATCH',
      body: JSON.stringify({balance: fromBal}),
      headers: {
        "Content-Type": "application/json"
      }
    }).catch((error) => {
      console.log(error);
    })

    await fetch('http://localhost:3004/openaccounts/' + data.transferTo, {
      method: 'PATCH',
      body: JSON.stringify({balance: toBal}),
      headers: {
        "Content-Type": "application/json"
      }
    }).catch((error) => {
      console.log(error);
    })
    fetchAccounts();
  }

  return (
    <BrowserRouter>
      <CssBaseline/>
      <NavDrawer children={
        <Switch>
          <Route exact path='/'>
            <Toolbar/>
            <Users  users={users}
                    currentUser={currentUserID}
                    currentUserHandler={currentUserHandler}
                    newUserHandler={addUserHandler}/>
          </Route>
          <Route path='/accounts' >
            <div>
              <Toolbar/>
              <Accounts data={openAccounts}
                        currentUser={currentUserID}
                        deleteCardHandler={deleteCardHandler}
                        addCardHandler={addCardHandler}>
              </Accounts>
            </div>
          </Route>
          <Route path="/transfer">
            <Toolbar/>
            <Transfer currentUserID={currentUserID}
                      openAccounts={openAccounts}
                      transferInputHandler={transferInputHandler} />
          </Route>
          <Route render={() => <h3>Page Not Found</h3>}/>
        </Switch>
      }/>
    </BrowserRouter>
  )
}

export default App;
