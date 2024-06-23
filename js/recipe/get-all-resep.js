document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('LOGIN'); // Retrieve the token from local storage

    if (!token) {
        console.error('Authentication token not found!');
        return; // Exit if no token is found
    }

    // Use a more general selector that targets the grid container without responsive modifiers.
    const gridContainer = document.querySelector('.uk-child-width-1-2'); // Adjust this selector based on actual classes.

    if (!gridContainer) {
        console.error('Grid container not found!');
        return; // Exit if no container is found
    }

    fetch('http://127.0.0.1:3000/receipe', {
        headers: {
            'LOGIN': ` ${token}` // Use the token in the Authorization header
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success && data.data.length > 0) {
            gridContainer.innerHTML = ''; // Clear existing content

            data.data.forEach(recipe => {
                const imageUrl = `http://127.0.0.1:3000/img/${recipe.Image.split('/').pop()}`; // Construct the full URL
                const recipePageUrl = `recipe.html?id=${recipe.recipe_id}`; 
                const recipeHTML = `
                    <div>
                      <div class="uk-card">
                        <a href="${recipePageUrl}" class="uk-position-cover"></a>
                        <div class="uk-card-media-top uk-inline uk-light">
                          <img class="uk-border-rounded-medium" src="${imageUrl}" alt="${recipe.title}">
                          <div class="uk-position-cover uk-card-overlay uk-border-rounded-medium"></div>
                          <div class="uk-position-xsmall uk-position-top-right">
                            <a href="#" class="uk-icon-button uk-like uk-position-z-index uk-position-relative" data-uk-icon="heart" onclick="event.stopPropagation();"></a>
                          </div>
                        </div>
                        <div>
                          <h3 class="uk-card-title uk-text-500 uk-margin-small-bottom uk-margin-top">${recipe.title}</h3>
                          <div class="uk-text-xsmall uk-text-muted" data-uk-grid>
                            <div class="uk-width-auto uk-flex uk-flex-middle">
                              <span class="uk-rating-filled" data-uk-icon="icon: star; ratio: 0.7"></span>
                              <span class="uk-margin-xsmall-left">${recipe.rating}</span> <!-- Assuming there is a 'rating' field -->
                              <span>(${recipe.reviews_count})</span> <!-- Assuming there is a 'reviews_count' field -->
                            </div>
                            <div class="uk-width-expand uk-text-right">by ${recipe.IdUser}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                `;
                gridContainer.innerHTML += recipeHTML; // Append new card to the grid
            });
        }
    })
    .catch(error => {
        console.error('Error fetching the recipes:', error);
    });
});
