document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');

    if (!recipeId) {
        console.error('Recipe ID is missing!');
        return;
    }

    const token = localStorage.getItem('LOGIN');
    if (!token) {
        console.error('Authentication token not found!');
        return;
    }

    fetch(`http://127.0.0.1:3000/receipe/get?recipe_id=${recipeId}`, {
        headers: {
            'LOGIN': `${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success && data.data) {
            updateRecipeDetails(data.data);
        } else {
            console.error('Failed to fetch recipe details or no data returned.');
        }
    })
    .catch(error => {
        console.error('Error fetching the recipe details:', error);
    });
});

function updateRecipeDetails(recipe) {
    const imageElement = document.getElementById('recipeImage'); // Assuming an ID for the image
    const titleElement = document.getElementById('recipeTitle'); // Assuming an ID for the title
    const descriptionElement = document.getElementById('recipeDescription'); // Assuming an ID for the description
    const ingredientsListElement = document.getElementById('ingredientsList'); // Assuming an ID for the ingredients list
    const instructionsContainer = document.getElementById('instructionsContainer'); // Assuming an ID for the instructions container

    // Update image
    imageElement.src = `http://127.0.0.1:3000/img/${recipe.Image.split('/').pop()}`;
    imageElement.alt = recipe.title;

    // Update title and description
    titleElement.textContent = recipe.title;
    descriptionElement.textContent = recipe.description;

    // Update ingredients
    const ingredients = recipe.ingredients.split(', ');
    ingredientsListElement.innerHTML = ingredients.map(ing => `<li>${ing}</li>`).join('');

    // Update instructions
    const instructions = recipe.instructions.split(', ');
    instructionsContainer.innerHTML = ''; // Clear previous instructions if any
    instructions.forEach((instruction, index) => {
        const stepHTML = `
            <div id="step-${index+1}" class="uk-grid-small uk-margin-medium-top" data-uk-grid>
                <div class="uk-width-auto">
                    <a href="#" class="uk-step-icon" data-uk-icon="icon: check; ratio: 0.8"></a>
                </div>
                <div class="uk-width-expand">
                    <h5 class="uk-step-title uk-text-500 uk-text-uppercase uk-text-primary">Step ${index + 1}</h5>
                    <div class="uk-step-content">${instruction}</div>
                </div>
            </div>
        `;
        instructionsContainer.innerHTML += stepHTML;
    });
}
