import React, { createContext, useState } from 'react';


async function fetchMealsByIds(mealIds) {
    try {
        const response = await fetch('http://192.168.57.202:5000/FOOD-ZONE/meals', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // Use query parameters to send mealIds if needed
            params: { mealIds } // Note: This syntax is incorrect; you may need to serialize `mealIds` into the URL manually
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
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, fetchMealsByIds }}>
            {children}
        </CartContext.Provider>
    );
}
