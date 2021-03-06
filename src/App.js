import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './HOc/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
import Checkout from './container/Checkout/Checkout';
import Orders from '../src/container/Orders/Orders';
import Auth from './container/Auth/Auth'

class App extends Component {
    render() {
        return (
            <div className='App' >
                <Layout>
                    <Switch>
                        <Route path='/order' component={Orders} />
                        <Route path="/checkout" component={Checkout} />
                        <Route path="/auth" component={Auth} />
                        <Route path="/" exact component={BurgerBuilder} />
                    </Switch>
                </Layout>
            </div>
        );
    }
}

export default App;
