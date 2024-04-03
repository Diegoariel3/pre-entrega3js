let recipes = [];

// Carga receta desde el JSON 
function loadRecipes() {
    fetch('receta.json')
        .then(response => response.json())
        .then(data => {
            recipes = data;
            displayRecipes(recipes);
        })
        .catch(error => console.error('Error loading recipes:', error));
}

// Inicializa la página
function initialize() {
    loadRecipes();
}

// Buscar recetas
function searchRecipes() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const timeInput = parseInt(document.getElementById("timeInput").value);

    const filteredRecipes = recipes.filter(recipe =>
        recipe.ingredients.toLowerCase().includes(searchInput) &&
        (isNaN(timeInput) || recipe.time <= timeInput)
    );

    if (filteredRecipes.length === 0) {
        displayMessage("No se encontraron recetas que coincidan con los criterios de búsqueda.");
    } else {
        displayRecipes(filteredRecipes);
        clearMessage();
    }
}

// Mostrar recetas
function displayRecipes(recipes) {
    const recipeList = document.getElementById("recipeList");
    recipeList.innerHTML = "";

    recipes.forEach(recipe => {
        const listItem = document.createElement("li");
        listItem.textContent = `${recipe.name} - Tiempo: ${recipe.time} minutos - Ingredientes: ${recipe.ingredients}`;
        recipeList.appendChild(listItem);
    });
}

// Agregar nueva receta
function addRecipe() {
    const name = document.getElementById("newRecipeName").value;
    const ingredients = document.getElementById("newRecipeIngredients").value;
    const time = parseInt(document.getElementById("newRecipeTime").value);

    if (name && ingredients && !isNaN(time)) {
        recipes.push({ name, ingredients, time });
        displayRecipes(recipes);
        clearNewRecipeForm();
        clearMessage();
    } else {
        displayMessage("Por favor, ingresa todos los campos correctamente.");
    }
}

// Borra formulario nueva receta
function clearNewRecipeForm() {
    document.getElementById("newRecipeName").value = "";
    document.getElementById("newRecipeIngredients").value = "";
    document.getElementById("newRecipeTime").value = "";
}

// Mostrar mensaje
function displayMessage(message) {
    const messageDiv = document.getElementById("addRecipeMessage");
    messageDiv.textContent = message;
}

// Borrar mensaje
function clearMessage() {
    const messageDiv = document.getElementById("addRecipeMessage");
    messageDiv.textContent = "";
}


initialize();
