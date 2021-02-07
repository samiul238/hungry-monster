// Event Handler
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

// Meal list With Ingredients
function getMealList() {
    let searchInputTxt = document.getElementById('search-input').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <a href = "#" class = "recipe-btn">${meal.strMeal}</a>
                        </div>
                    </div>
                `;
                });
                mealList.classList.remove('notFound');
            } else {
                html = " No Result Found ";
                mealList.classList.add('notFound');
            }
            mealList.innerHTML = html;
        });
}

// get recipe of the meal
function getMealRecipe(recipe) {
    recipe.preventDefault();
    if (recipe.target.classList.contains('recipe-btn')) {
        let mealItem = recipe.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(response => response.json())
            .then(data => mealRecipe(data.meals));
    }
}

// create Meal Recipe
function mealRecipe(meal) {
    console.log(meal);
    meal = meal[0];
    let html = `
    <div class = "recipe-meal-img">
        <img src = "${meal.strMealThumb}">
    </div>
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <div class = "recipe-instruct">
            <h3>Ingredients</h3>
            <p>
            ${meal.strInstructions}
            </p>
        </div>  
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}