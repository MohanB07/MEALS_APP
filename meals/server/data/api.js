import Meal from '../models/meal'; // Ensure this path is correct

const BASE_URL = "http://192.168.1.8:5000/FOOD-ZONE/";
// Function to fetch meals by category
export const fetchMealsByCategory = async (categoryId) => {
  try {
    const ipAddress = "192.168.1.143"; // Update to your server's IP address
    const response = await fetch(`${BASE_URL}meals?categoryId=${categoryId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.map(item => new Meal(
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
    console.error('Fetch meals failed:', error);
    return []; // Return an empty array in case of error
  }
};

// Function to fetch wallet balance
export const fetchWalletBalance = async () => {
  try {
    const ipAddress = "192.168.1.143"; // Update to your server's IP address
    const response = await fetch(`${BASE_URL}wallet`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Network response was not ok. Status: ${response.status}. Error: ${errorText}`);
    }
    const data = await response.json();
    return data.balance;
  } catch (error) {
    console.error('Fetch wallet balance failed:', error);
    return 0; // Return 0 in case of error
  }
};
