import { useRoute } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, ImageBackground, StyleSheet, View } from "react-native";
import MealItem from "../components/MealItem";
import { fetchMealsByCategory } from "../server/data/api";

function MealsDetailsScreen({ navigation }) {
    const route = useRoute();
    const catId = route.params.CategoryId;

    const [meals, setMeals] = useState([]);
    const [cart, setCart] = useState({});

    useEffect(() => {
        const fetchMeals = async () => {
            const mealsData = await fetchMealsByCategory(catId);
            setMeals(mealsData);
        };
        fetchMeals();
    }, [catId]);

    const updateCart = (mealId, quantity) => {
        setCart((prevCart) => ({
            ...prevCart,
            [mealId]: quantity,
        }));
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            title: route.params.CategoryTitle, // This needs to be set in navigation or fetched in another way
        });
    }, [catId, navigation]);

    function renderMealItems(itemObject) {
        const item = itemObject.item;
        const MealItemProps = {
            id: item.id,
            title: item.title,
            imageURL: item.imageUrl,
            price: item.price,
            updateCart: updateCart,
        };
        return <MealItem {...MealItemProps} />;
    }

    return (
        <ImageBackground source={require("../assets/images/psg.jpg")} style={styles.rootContainer} imageStyle={styles.backgroundImage}>
            <View style={styles.rootContainer}>
                <FlatList data={meals} keyExtractor={(item) => item.id} renderItem={renderMealItems} />
            </View>
        </ImageBackground>
    );
}

export default MealsDetailsScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        paddingHorizontal: 3,
    },
    backgroundImage: {
        opacity: 0.5,
    },
});
