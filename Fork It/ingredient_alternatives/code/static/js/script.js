// Function to generate meal plan based on protein, carbs, and kcal input
async function generateMealPlan() {
    const protein = document.getElementById('protein').value;
    const carbs = document.getElementById('carbs').value;
    const kcal = document.getElementById('kcal').value;

    const data = {
        proteinMin: protein,
        carbsMin: carbs,
        energyMin: kcal
    };

    try {
        const response = await fetch('http://127.0.0.1:5000/generate-meal-plan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        displayMealPlan(result.mealPlan);
    } catch (error) {
        console.error('Error generating meal plan:', error);
    }
}

// Function to display meal plan on frontend
function displayMealPlan(mealPlan) {
    const resultDiv = document.getElementById('mealPlanResult');
    resultDiv.innerHTML = '';  // Clear any previous results

    if (mealPlan && mealPlan.length > 0) {
        mealPlan.forEach(meal => {
            const mealDiv = document.createElement('div');
            mealDiv.classList.add('meal-item');
            mealDiv.innerHTML = `
                <h3>${meal.meal}</h3>
                <p>Protein: ${meal.protein} g</p>
                <p>Carbs: ${meal.carbs} g</p>
                <p>Calories: ${meal.energy} kcal</p>
            `;
            resultDiv.appendChild(mealDiv);
        });
    } else {
        resultDiv.innerHTML = '<p>No meal plan found.</p>';
    }
}

// Function to search for recipes based on ingredients
async function searchRecipes() {
    const ingredientUsed = document.getElementById('ingredientUsed').value;
    const ingredientNotUsed = document.getElementById('ingredientNotUsed').value;

    const data = {
        ingredientUsed: ingredientUsed,
        ingredientNotUsed: ingredientNotUsed
    };

    try {
        const response = await fetch('http://127.0.0.1:5000/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        displayRecipes(result.recipes);
    } catch (error) {
        console.error('Error searching recipes:', error);
    }
}

// Function to display recipe results on frontend
function displayRecipes(recipes) {
    const resultDiv = document.getElementById('recipeResults');
    resultDiv.innerHTML = '';  // Clear any previous results

    if (recipes && recipes.length > 0) {
        recipes.forEach(recipe => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe-item');
            recipeDiv.innerHTML = `
                <img src="${recipe.image_url}" alt="${recipe.name}">
                <div>
                    <h3>${recipe.name}</h3>
                    <p>Calories: ${recipe.calories}</p>
                    <a href="${recipe.url}" target="_blank">View Recipe</a>
                </div>
            `;
            resultDiv.appendChild(recipeDiv);
        });
    } else {
        resultDiv.innerHTML = '<p>No recipes found.</p>';
    }
}
