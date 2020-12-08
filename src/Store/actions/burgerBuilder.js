import * as actionType from './actionTypes';
import axios from '../../axios-order';


export const addIngredient = (name) =>{
    return{
        type:actionType.ADD_INGREDIENT,
        ingredientName:name
    };
};

export const removeIngredient = (name) =>{
    return{
        type:actionType.REMOVE_INGREDIENT,
        ingredientName:name
    };
};

export const fetchIngredientFailed = () => {
    return {
        type:actionType.FETCH_INGREDIENT_FAILED,
    };
};

export const setIngredients = (ingredients) => {
        return {
            type:actionType.SET_INGREDIENT,
            ingredients:ingredients

        };
};
// fetching ingredient from data base. 
export const initIngredients = () => {
    return dispatch =>{
        axios.get('https://react-my-burger-702d5.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data))
            })
            .catch(error => {
                dispatch(fetchIngredientFailed())
            });
    };
};