const db = require('../db.js');


exports.addByMealsId = async (req, res) => {
    try {
        const mealId = req.query.mealId;
        if (!mealId) {
            return res.status(400).json({ error: 'No meal ID provided' });
        }

            const query = `SELECT meals.*, GROUP_CONCAT(meal_categories.category_id) AS categoryIds 
                        FROM meals
                        LEFT JOIN meal_categories ON meals.id = meal_categories.meal_id 
                        WHERE meals.id = ?
                        GROUP BY meals.id`;

        db.query(query, [mealId], (err, results) => {
            if (err) {
                console.error('Error fetching meal by ID:', err);
                return res.status(500).json({ error: 'Error fetching meal' });
            }
            if (results.length === 0) {
                return res.status(404).json({ error: 'Meal not found' });
            }
            const meal = results[0];
            meal.categoryIds = meal.categoryIds ? meal.categoryIds.split(',') : [];
            res.json(meal);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}