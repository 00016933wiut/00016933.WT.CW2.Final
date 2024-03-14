document.addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('deleteBtn')) {
      const recipeId = event.target.getAttribute('data-del');
      axios.delete(`/data/recipes/${recipeId}`).then(function(response) {
        console.log('Delete successful', response);
        location.href = '/'
      })
      .catch(function(error) {
        console.log('Error deleting ticket', error);
      });
    }
})