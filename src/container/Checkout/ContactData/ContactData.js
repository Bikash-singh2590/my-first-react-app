import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/button';
import classes from './ContactData.module.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../HOc/withErrorHandler/withErrorHandler';
import * as actions from '../../../Store/actions/index';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            ZipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value:'',
                validation:{
                    required:true,
                    maxLength:5,
                    minLength:5,
                    isNumber:true
                },
                valid:false,
                touched:false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'e-Mail'
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value:'fastest',displayValue:'Fastest'},
                        {value:'chepest', displayValue: 'Chepest'}
                    ]
                },
                value:'fastest',
                validation:{},
                valid:true
            
            }
        },
        formIsValid:false
    }

    
    orderHandler = (event) => {
        event.preventDefault(); 
        const formData ={}
        for(let formIdentifierElement in this.state.orderForm){
            formData[formIdentifierElement] = this.state.orderForm[formIdentifierElement].value
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderFormData:formData
        }
        this.props.onOrderBurger(order);
    }

    checkValidity(value,rules){
        let isValid = true;
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength  && isValid;
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength  && isValid;
        }
        if(rules.isEmail){
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isValid = pattern.test(value) && isValid
        }
        if(rules.isNumber){
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
   }

    inputChangeHandler = (event,inputIdentifier) => {
        // console.log(event.target.value); 
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedOrederFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedOrederFormElement.value = event.target.value;
        updatedOrederFormElement.valid = this.checkValidity(updatedOrederFormElement.value,updatedOrederFormElement.validation);
        updatedOrederFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedOrederFormElement;
        let formIsValid= true;
        for (let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm:updatedOrderForm,formIsValid:formIsValid});
    }

    render() {
        const formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
               {formElementsArray.map(formElement => (
                   <Input 
                   key={formElement.id }
                   elementType={formElement.config.elementType} 
                   elementConfig={formElement.config.elementConfig}
                   value={formElement.config.value}
                   invalid={!formElement.config.valid}
                   shouldValidate={formElement.config.validation}
                   touched = {formElement.config.touched }
                changed={(event)=>this.inputChangeHandler(event,formElement.id)}/>
               ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        )

        if (this.props.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h1>Enter your contact Details</h1>
                {form}
            </div>
        );
    }

}
const mapStateToProps = state =>{
    return {
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading:state.order.loading
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onOrderBurger:(orderData) => dispatch(actions.purchaseBurger(orderData))
    };
    
}

export default  connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));