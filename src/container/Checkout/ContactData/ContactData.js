import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/button';
import classes from './ContactData.module.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../HOc/withErrorHandler/withErrorHandler'

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
                    minLength:5
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
                    required:true
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
        formIsValid:false,
        loading: false
    }

    
    orderHandler = (event) => {
        event.preventDefault();
           
        this.setState({ loading: true })
        const formData ={}
        for(let formIdentifierElement in this.state.orderForm){
            formData[formIdentifierElement] = this.state.orderForm[formIdentifierElement].value
        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderFormData:formData
        }

        

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
        if (this.state.loading) {
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
        ings:state.ingredients,
        price:state.totalPrice
    }
}

export default  connect(mapStateToProps)(withErrorHandler(ContactData,axios));