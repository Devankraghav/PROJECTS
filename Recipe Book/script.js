document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const recipeForm = document.getElementById('recipeForm');
    const recipeGrid = document.getElementById('recipeGrid');
    const searchInput = document.getElementById('searchInput');
    const modal = document.getElementById('recipeModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalIngredients = document.getElementById('modalIngredients');
    const modalSteps = document.getElementById('modalSteps');
    const closeModalButton = document.querySelector('.close-modal');
    const imagePreview = document.getElementById('imagePreview');
    const recipeImageInput = document.getElementById('recipeImage');
  
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
  
    // Load recipes from local storage
    displayRecipes();
  
    // Image Preview
    recipeImageInput.addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview Image">`;
            };
            reader.readAsDataURL(file);
        } else {
            imagePreview.innerHTML = `<i data-lucide="image" style="width: 48px; height: 48px; color: #ddd;"></i>`;
        }
    });
  
    // Add Recipe
    recipeForm.addEventListener('submit', function (e) {
        e.preventDefault();
  
        const name = document.getElementById('recipeName').value.trim();
        const ingredients = document.getElementById('ingredients').value.trim().split('\n').filter(Boolean);
        const steps = document.getElementById('steps').value.trim();
        const imageFile = recipeImageInput.files[0];
        let imageUrl = '';
  
        if (!name || ingredients.length === 0 || !steps) {
            alert("Please fill in all the fields.");
            return;
        }
  
        if (imageFile) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imageUrl = e.target.result;
                addRecipe(name, ingredients, steps, imageUrl);
                resetForm();
            };
            reader.readAsDataURL(imageFile);
        } else {
            addRecipe(name, ingredients, steps, imageUrl);
            resetForm();
        }
    });
  
    // Reset Form
    function resetForm() {
        recipeForm.reset();
        imagePreview.innerHTML = `<i data-lucide="image" style="width: 48px; height: 48px; color: #ddd;"></i>`;
    }
  
    // Add Recipe to List
    function addRecipe(name, ingredients, steps, imageUrl) {
        const recipe = { name, ingredients, steps, imageUrl };
        recipes.push(recipe);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        displayRecipes();
    }
  
    // Display All Recipes
    function displayRecipes() {
        recipeGrid.innerHTML = '';
        recipes.forEach(recipe => {
            const card = document.createElement('div');
            card.classList.add('recipe-card');
            card.innerHTML = `
                <img src="${recipe.imageUrl || 'https://via.placeholder.com/250'}" class="recipe-image" alt="${recipe.name}">
                <div class="recipe-content">
                    <h3 class="recipe-title">${recipe.name}</h3>
                    <p class="recipe-ingredients">${recipe.ingredients.join(', ')}</p>
                </div>
            `;
            card.addEventListener('click', () => openModal(recipe));
            recipeGrid.appendChild(card);
        });
    }
  
    // Open Modal
    function openModal(recipe) {
        modalTitle.textContent = recipe.name;
        modalImage.src = recipe.imageUrl || 'https://via.placeholder.com/600';
        modalIngredients.innerHTML = recipe.ingredients.map(ing => `<li>${ing}</li>`).join('');
        modalSteps.textContent = recipe.steps;
        modal.classList.add('active');
    }
  
    // Close Modal
    closeModalButton.addEventListener('click', () => {
        modal.classList.remove('active');
    });
  
    // Search Functionality
    searchInput.addEventListener('input', function () {
        const query = this.value.toLowerCase();
        const filteredRecipes = recipes.filter(recipe =>
            recipe.name.toLowerCase().includes(query) ||
            recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(query))
        );
        displayFilteredRecipes(filteredRecipes);
    });
  
    // Display Filtered Recipes
    function displayFilteredRecipes(filteredRecipes) {
        recipeGrid.innerHTML = '';
        filteredRecipes.forEach(recipe => {
            const card = document.createElement('div');
            card.classList.add('recipe-card');
            card.innerHTML = `
                <img src="${recipe.imageUrl || 'https://via.placeholder.com/250'}" class="recipe-image" alt="${recipe.name}">
                <div class="recipe-content">
                    <h3 class="recipe-title">${recipe.name}</h3>
                    <p class="recipe-ingredients">${recipe.ingredients.join(', ')}</p>
                </div>
            `;
            card.addEventListener('click', () => openModal(recipe));
            recipeGrid.appendChild(card);
        });
    }
  
    // Close Modal when clicking outside
    window.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
  
    // Initialize Lucide Icons
    lucide.createIcons();
  });
  