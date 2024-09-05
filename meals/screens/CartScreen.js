import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { CartContext } from '../context/CartContext';
import Colors from '../utils/Colors';

const ScreenWidth = Dimensions.get('window').width;

function CartScreen({ navigation }) {
    const { cart, addToCart, removeFromCart, clearCart, fetchMealsByIds } = useContext(CartContext);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            const mealIds = Object.keys(cart);
            if (mealIds.length > 0) {
                const items = [];
                for (const mealId of mealIds) {
                    const fetchedMeal = await fetchMealsByIds(mealId);
                    if (fetchedMeal) {
                        items.push({
                            ...fetchedMeal,
                            quantity: cart[mealId],
                            totalPrice: fetchedMeal.price * cart[mealId]
                        });
                    }
                }
                setCartItems(items);
            } else {
                setCartItems([]);
            }
        };
        fetchCartItems();
    }, [cart, fetchMealsByIds]);

    // Calculate total price
    const totalPrice = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

    function renderCartItem(itemData) {
        const item = itemData.item;
        return (
            <View style={styles.cartItem}>
                <View>
                    <Text style={styles.itemText}>{item.title}</Text>
                    <Text style={styles.itemText}>Quantity: {item.quantity}</Text>
                    <Text style={styles.itemText}>Total Price: ₹{item.totalPrice.toFixed(2)}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.button} onPress={() => removeFromCart(item.id)}>
                        <AntDesign name="minuscircle" size={24} color='black' />
                    </Pressable>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <Pressable style={styles.button} onPress={() => addToCart(item.id)}>
                        <AntDesign name="pluscircle" size={24} color='black' />
                    </Pressable>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {cartItems.length === 0 ? (
                <View style={styles.emptyCartContainer}>
                    <Text style={styles.emptyCartText}>Your cart is empty.</Text>
                </View>
            ) : (
                <>
                    <FlatList
                        data={cartItems}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderCartItem}
                    />
                    <View style={styles.totalPriceContainer}>
                        <Text style={styles.totalPriceText}>Total Price: ₹{totalPrice.toFixed(2)}</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Pressable style={styles.clearButton} onPress={clearCart}>
                            <Text style={styles.clearButtonText}>Clear Cart</Text>
                        </Pressable>
                        <Pressable
                            style={styles.confirmButton}
                            onPress={() => navigation.navigate('OrderSummary', { cartItems, totalPrice })}
                        >
                            <Text style={styles.confirmButtonText}>Confirm Order</Text>
                        </Pressable>
                    </View>
                </>
            )}
        </View>
    );
}

export default CartScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WhiteBlue100,
        padding: 10,
    },
    cartItem: {
        backgroundColor: Colors.White700,
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemText: {
        fontFamily: 'Manrope_400Regular',
        fontSize: 16,
        color: 'black',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: ScreenWidth / 2,
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: Colors.White700,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantityText: {
        fontFamily: 'Manrope_400Regular',
        fontSize: 16,
        color: 'black',
        marginHorizontal: 20,
    },
    totalPriceContainer: {
        marginTop: 10,
        alignItems: 'center',
    },
    totalPriceText: {
        fontFamily: 'Manrope_700Bold',
        fontSize: 18,
        color: 'black',
    },
    emptyCartContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyCartText: {
        fontFamily: 'Manrope_700Bold',
        fontSize: 18,
        color: 'black',
    },
    clearButton: {
        padding: 10,
        borderRadius: 5,
        width: ScreenWidth / 3,
        alignItems: 'center',
        backgroundColor: 'black',
    },
    clearButtonText: {
        color: Colors.White700,
        fontFamily: 'Manrope_700Bold',
        fontSize: 16,
    },
    confirmButton: {
        padding: 10,
        borderRadius: 5,
        width: ScreenWidth / 3,
        alignItems: 'center',
        backgroundColor: 'green',
    },
    confirmButtonText: {
        color: Colors.White700,
        fontFamily: 'Manrope_700Bold',
        fontSize: 16,
    },
});
