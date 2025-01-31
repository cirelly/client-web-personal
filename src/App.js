import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import AuthProvider from './providers/AuthProvider'
import routes from './config/routes'
import './App.scss'


function App() {


  return (
    <AuthProvider>
          <Router>
      <Switch>
        {routes.map((route, index) => (
          <RouteWithSubRoutes key={index} {...route} />
        ))}
      </Switch>
    </Router>
    </AuthProvider>


  );
}

function RouteWithSubRoutes(route){
  
  return (
    <Route 
    path={route.path}
    exact={route.exact}
    render={props => <route.component routes={route.routes} {...props} />}
    />
  )
}

export default App;
