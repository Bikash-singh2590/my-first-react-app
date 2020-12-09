import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './HOc/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
import Checkout from './container/Checkout/Checkout';
import Orders from '../src/container/Orders/Orders';

class App extends Component {

    render() {
        return (
            <div className='App' >
                <Layout>
                    <Switch>
                        <Route path='/order' component={Orders} />
                        <Route path="/checkou" component={Checkout} />
                        <Route path="/" exact component={BurgerBuilder} />
                    </Switch>
                </Layout>
            </div>
        );
    }
}

export default App;
