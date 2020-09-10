import React,{createContext,useReducer, useEffect, useContext} from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Signup from './components/screens/Signup';
import Navbar from './components/Navbar';
import Home from './components/screens/Home';
import Login from './components/screens/Login';
import SellBook from './components/screens/SellBook';
import Cart from './components/screens/Cart';
import Profile from './components/screens/Profile';
import {reducer,initialState} from './reducers/userReducer'
import Book from './components/screens/Book';
import OtherUser from './components/screens/OtherUser';
import EditBook from './components/screens/EditBook';
import Category from './components/screens/Category';
import Search from './components/screens/Search';

export const UserContext = createContext()

const Routing = () => {
  // const history = useHistory()
  const {state,dispatch} = useContext(UserContext)


  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    // console.log("user",typeof(user))
    if(user){
      dispatch({type:"USER",payload:user})
    }
  },[])
  return(
    <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route exact path="/sellbook">
          <SellBook />
        </Route>
        <Route path="/editbook/:bookId">
          <EditBook />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route exact path="/profile/">
          <Profile />
        </Route>
        <Route path="/profile/:userId">
          <OtherUser />
        </Route>
        <Route exact path="/book/:bookId">
          <Book />
        </Route>
        <Route exact path="/category/:category">
          <Category />
        </Route>
    </Switch>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
   <UserContext.Provider value={{state:state,dispatch:dispatch}}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
