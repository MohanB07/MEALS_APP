import React, { createContext, useState } from 'react';

async function fetchMealsByIds(mealIds) {
    try {
        const response = await fetch(`http://192.168.1.5:5000/FOOD-ZONE/addMealsById?mealId=${mealIds}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching meals by IDs:", error);
        return [];
    }
}

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState({});

    // Add a meal to the cart
    const addToCart = (mealId, quantity = 1) => {
        setCart((prevCart) => ({
            ...prevCart,
            [mealId]: (prevCart[mealId] || 0) + quantity,
        }));
    };

    // Remove a meal from the cart
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

    // Clear the entire cart
    const clearCart = () => {
        setCart({});
    };

    // Get items in the cart
    const getCartItems = async () => {
        const mealIds = Object.keys(cart);
        if (mealIds.length === 0) return [];
        return await fetchMealsByIds(mealIds.join(','));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, fetchMealsByIds: getCartItems }}>
            {children}
        </CartContext.Provider>
    );
}
