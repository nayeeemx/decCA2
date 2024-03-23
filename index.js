import express from "express";
import axios from "axios";

const app = express();

app.get("/", async (req, res) => {
    const apiKey = '383b639517c5417389f6fbbd91b289d3';
    const ingredients = 'apples,flour,sugar'; // Example ingredients
    const minCalories = 100; // Example minimum calories
    const maxCalories = 500; // Example maximum calories

    const options = {
        method: 'GET',
        url: 'GET https://api.spoonacular.com/recipes/findByNutrients',
        params: {
            apiKey,
            minCalories,
            maxCalories,
            ingredients
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




const ingredients = 'apples,flour,sugar';
const apiKey = '383b639517c5417389f6fbbd91b289d3';


app.get("/recipes", async (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://api.spoonacular.com/recipes/findByIngredients',
        params: {
            apiKey,
            ingredients,
            number: 5, // Number of recipes to fetch (adjust as needed)
            ranking: 1 // 1 for best match, 2 for less strict match
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response);
        res.json(response); // Send response as JSON
    } catch (error) {
        console.error(error.response);
        res.status(500).json({ error: 'Internal Server Error', message: error.response.data.message });
    }
});

//Generate a customized meal plan
app.get("/mealplan/generate", async (req, res) => {
    const { diet } = req.query; 
    const options = {
        method: 'GET',
        url: 'https://api.spoonacular.com/mealplanner/generate',
        params: {
            apiKey,
            timeFrame: 'week', 
            targetCalories: 2000, 
            diet 
        }
    };

    try {
        const response = await axios.request(options);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Add an item to the meal plan
app.post("/mealplan/items", async (req, res) => {
    // Example request body: { date: '2024-03-31', slot: 'breakfast', type: 'recipe', value: 12345 }
    const { date, slot, type, value } = req.body;

    const options = {
        method: 'POST',
        url: `https://api.spoonacular.com/mealplanner/${username}/items`,
        params: {
            apiKey
        },
        data: {
            date,
            slot,
            type,
            value
        }
    };

    try {
        const response = await axios.request(options);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete an item from the meal plan
app.delete("/mealplan/items/:id", async (req, res) => {
    const id = req.params.id;

    const options = {
        method: 'DELETE',
        url: `https://api.spoonacular.com/mealplanner/${username}/items/${id}`,
        params: {
            apiKey
        }
    };

    try {
        const response = await axios.request(options);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



app.listen(8000, () => {
    console.log("Server running");
});


