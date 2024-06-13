document.addEventListener("DOMContentLoaded", function() {
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const recipeId = getQueryParam('recipe_id');
    const token = localStorage.getItem('LOGIN');

    // Change event to manual trigger on button click
    const saveButton = document.querySelector('.btn-save');
    saveButton.addEventListener('click', function() {
        // SweetAlert for confirmation before submitting
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: "Anda akan mengupdate data resep makanan.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, update resep!'
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById('recipeForm').dispatchEvent(new Event('submit', { cancelable: true }));
            }
        });
    });
    document.getElementById('recipeForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const title = document.getElementById('title').value.trim();
        const description = document.getElementById('description').value.trim();
        const ingredients = Array.from(document.querySelectorAll('#ingredientsContainer input'))
            .map(input => input.value.trim())
            .join(', ');
        const instructions = Array.from(document.querySelectorAll('#stepsContainer textarea'))
            .map(textarea => textarea.value.trim())
            .join(', ');
        const imageFile = document.getElementById('imageUpload').files[0];

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('ingredients', ingredients);
        formData.append('instructions', instructions);
        if (imageFile) {
            formData.append('image', imageFile);
        }

        fetch(`http://localhost:3000/receipe/update?recipe_id=${recipeId}`, {
            method: 'PUT', // Make sure server supports PUT with FormData
            headers: {
                'LOGIN': `Bearer ${token}` // Proper Authorization header if using Bearer token
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                Swal.fire(
                    'Updated!',
                    'Resep berhasil diperbarui.',
                    'success'
                ).then(() => {
                    window.location.href = 'dashboard-user.html'; // Redirect after success
                });
            } else {
                throw new Error(data.message || 'Terjadi kesalahan saat memperbarui resep.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire(
                'Error',
                'Terjadi kesalahan saat memperbarui resep.',
                'error'
            );
        });
    });
});
