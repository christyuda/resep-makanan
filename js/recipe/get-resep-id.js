document.addEventListener("DOMContentLoaded", function() {
    // Function to get query parameters from the URL
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Extract recipe_id from the URL
    const recipeId = getQueryParam('recipe_id');
    const token = localStorage.getItem('LOGIN');
    // Function to fetch recipe data
    function fetchRecipeData(recipeId) {
        const headers = new Headers({
            'LOGIN': `${token}`, // Sertakan token dalam header Authorization
            'Content-Type': 'application/json'
        });
        fetch(`http://127.0.0.1:3000/receipe/get?recipe_id=${recipeId}`, { headers: headers })
            .then(response => response.json())
            .then(data => {
                if (data.code === 200 && data.status === "success") {
                    populateForm(data.data);
                } else {
                    console.error('Failed to fetch data:', data);
                }
            })
            .catch(error => {
                console.error('Error fetching recipe data:', error);
            });
    }

    // Function to populate the form with recipe data
    function populateForm(data) {
        document.getElementById('title').value = data.title;
        document.getElementById('description').value = data.description;

        // Populate ingredients
        const ingredientsContainer = document.getElementById('ingredientsContainer');
        data.ingredients.split(',').forEach((ingredient, index) => {
            const inputHtml = `<div class="form-group">
                <input type="text" class="form-control" value="${ingredient.trim()}" placeholder="Bahan ${index + 1}">
            </div>`;
            ingredientsContainer.insertAdjacentHTML('beforeend', inputHtml);
        });

        // Populate instructions
        const stepsContainer = document.getElementById('stepsContainer');
        data.instructions.split(',').forEach((step, index) => {
            const textareaHtml = `<div class="form-group">
                <textarea class="form-control" placeholder="Langkah ${index + 1}">${step.trim()}</textarea>
            </div>`;
            stepsContainer.insertAdjacentHTML('beforeend', textareaHtml);
        });

        // Set image preview if available
        if (data.Image) {
            const imageUrl = `http://127.0.0.1:3000/img/${data.Image.split('/').pop()}`;
            const imagePreview = document.getElementById('imagePreview');
            imagePreview.src = imageUrl;
            imagePreview.style.display = 'block';
        }
    }

    if (recipeId) {
        fetchRecipeData(recipeId);
    } else {
        console.error('Recipe ID is required.');
    }
});
