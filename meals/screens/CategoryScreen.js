import React, { useEffect, useState } from 'react';
import { FlatList, ImageBackground, StyleSheet, View } from 'react-native';
import CategoryGridTile from '../components/CategoryGridTile';
import Category from '../server/models/category';


const fetchCategories = async () => {
  //const ipAddress = getLocalIPAddress();
  const ipAddress = "192.168.100.5"; // Corrected the IP address format
  const url = `http://${ipAddress}:3000/categories`;
  const response = await fetch(url);
  const data = await response.json();
  return data.map(item => new Category(item.id, item.title, item.color));
};

function CategoryScreen({ navigation }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  function renderCategoryItem(itemObject) {
    function pressHandler() {
      navigation.navigate("MealDescription", {
        CategoryId: itemObject.item.id,
      });
    }

    return (
      <CategoryGridTile
        title={itemObject.item.title}
        onPress={pressHandler}
        color={itemObject.item.color}
      />
    );
  }

  return (
    <ImageBackground source={require("../assets/images/psg.jpg")} style={styles.rootContainer} imageStyle={styles.backgroundImage}>
      <View style={styles.rootContainer}>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={renderCategoryItem}
          numColumns={2}
        />
      </View>
    </ImageBackground>
  );
}

export default CategoryScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.5,
  },
});
