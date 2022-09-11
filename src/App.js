import React from 'react'
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/App/Home';
import AddRoom from './Pages/App/AddRoom';
import ChatRoom from './Pages/App/ChatRoom';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Register" component={Register} />

        <Route exact path="/Home" component={Home} />
        <Route exact path="/AddRoom" component={AddRoom} />
        <Route exact path="/ChatRoom" component={ChatRoom} />
      </Switch>
    </Router>
  )
}

export default App;