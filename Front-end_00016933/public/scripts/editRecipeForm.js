document.addEventListener('DOMContentLoaded', () => {
    const editButtons = document.querySelectorAll('.editBtn');
    editButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const recipeId = button.dataset.id;
            try {
                const response = await fetch(`/recipes/${recipeId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch recipe details');
                }
                const recipeData = await response.json();
                document.getElementById('recipeName').value = recipeData.name;
                document.getElementById('listOfIngredients').value = recipeData.ingredients.join('\n');
                document.getElementById('listOfSteps').value = recipeData.steps.join('\n');
            } catch (error) {
                console.error('Error fetching or populating recipe:', error);
            }
        });
    });
});
