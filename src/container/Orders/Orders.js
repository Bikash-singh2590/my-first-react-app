import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import { connect } from 'react-redux';
import axios from '../../axios-order';
import withErrorHandler from '../../HOc/withErrorHandler/withErrorHandler';
import * as actions from '../../Store/actions/index';
import Spinner from '../../components/UI/spinner/Spinner';

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrder();
    }
    render() {
        let orders = <Spinner />
        if (!this.props.loading) {
            orders = this.props.orders.map(order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                />
            ))
        };
        return orders;
    }

}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrder: () => dispatch(actions.fetchOrder())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));