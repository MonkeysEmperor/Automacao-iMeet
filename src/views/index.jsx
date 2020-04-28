import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { hist } from "index.js"
import Admin from "layouts/Admin.js";

class App extends React.Component {
    render(){
        return (
        <Router history={hist}>
            <Switch>
                <Route path={"/admin"} component={Admin}/>;
                <Redirect from="/" to="/admin/dashboard" />
            </Switch>
        </Router>
        )
    }
}

export default App;