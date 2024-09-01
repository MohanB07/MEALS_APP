import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';


const BASE_URL = "http://192.168.1.8:5000/FOOD-ZONE/";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [cart, setCart] = useState({});

    const login = async (regno, pwd) => {
        try {
            const response = await axios.get(`${BASE_URL}signin`, {
            params: { regno, pwd }
        });
    
            if (response.data.response == true) {
                return true;
            }
            else if(response.data.response == 'invalidPWD'){
                return 'invalidPWD';
            }
            else {
                return false;
            }
    
        } catch (error) {
        console.error('Network Error:', error);
        setError('There was a network error. Please try again later.');
        }
    }

    const signup = async (regno, pwd) => {
        try {
            const response = await axios.post(`${BASE_URL}signup`, {
                regno,
                pwd
            });
            console.log(regno  + " " + pwd);
            if ( response.data.response == true) {
                return true;
            } else if (response.data.response == 'exists'){
                return "exists";
            }

        } catch (error) {
            console.error('Network Error:', error);
            setError('There was a network error. Please try again later.');
        }
    }
    
    const fetchMealsByCategory = async (categoryId) => {
        try {
            const response = await axios.get(`${BASE_URL}meals`, {
            params: { categoryId }
            });
            const data = response.data;
            return data.map(item => new Meal (
                item.id,
                item.categoryIds,
                item.title,
                item.price,
                item.imageUrl,
                item.isGlutenFree,
                item.isVegan,
                item.isVegetarian,
                item.isLactoseFree
            ));
        } catch (error) {
            console.error('Network Error:', error);
            setError('There was a network error. Please try again later.');
        }
        };

        const fetchWalletBalance = async () => {
            try {
                const response = await axios.get(`${BASE_URL}wallet`);
                return response.data.balance;
            } catch (error) {
                console.error('Network Error:', error);
                setError('There was a network error. Please try again later.');
            }
        };


        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${BASE_URL}categories`);
                return response.data.map(item => new Category(item.id, item.title, item.color));
            } catch (error) {
                console.error('Network Error:', error);
                setError('There was a network error. Please try again later.');
            }
        };

        const addToCart = (mealId, quantity = 1) => {
            setCart((prevCart) => ({
                ...prevCart,
                [mealId]: (prevCart[mealId] || 0) + quantity,
            }));
        };
    
        const removeFromCart = (mealId, quantity = 1) => {
            setCart((prevCart) => {
                const updatedCart = { ...prevCart };
                if (updatedCart[mealId] > quantity) {
                    updatedCart[mealId] -= quantity;
                } else {
                    delete updatedCart[mealId];
                }
                return updatedCart;
            });
        };
    
        const clearCart = () => {
            setCart({});
        };
    



    return (
        <GlobalContext.Provider value={{
            login,
            signup,
            fetchMealsByCategory,
            fetchWalletBalance,
            fetchCategories,
            addToCart,
            removeFromCart,
            clearCart,
            cart,
            error
        }}>
        {children}
        </GlobalContext.Provider>
    );

};

export const useGlobalContext = () => useContext(GlobalContext);
