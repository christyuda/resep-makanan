document.addEventListener("DOMContentLoaded", function() {
    const token = localStorage.getItem('LOGIN');

    // Fungsi untuk menampilkan preview gambar yang diupload
    const imageUpload = document.getElementById('imageUpload');
    const imagePreview = document.getElementById('imagePreview');
    imageUpload.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    const submitRecipeForm = (event) => {
        event.preventDefault(); // Mencegah pengiriman form default

        const title = document.getElementById('title').value.trim();
        const description = document.getElementById('description').value.trim();
        const ingredients = Array.from(document.querySelectorAll('#ingredientsContainer input'))
            .map(input => input.value.trim())
            .filter(Boolean)
            .join(', ');
        const instructions = Array.from(document.querySelectorAll('#stepsContainer textarea'))
            .map(textarea => textarea.value.trim())
            .filter(Boolean)
            .join(', ');

        if (!title || !description || !ingredients || !instructions || !imageUpload.files.length) {
            Swal.fire('Gagal', 'Mohon isi semua data.', 'warning');
            return; // Keluar dari fungsi jika ada field yang kosong
        }

        // Konfirmasi sebelum submit
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: "Anda akan menginputkan data resep makanan.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, simpan resep!'
        }).then((result) => {
            if (result.isConfirmed) {
                submitFormData(title, description, ingredients, instructions, imageUpload.files[0]);
            }
        });
    };

    const submitFormData = (title, description, ingredients, instructions, imageFile) => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('ingredients', ingredients);
        formData.append('instructions', instructions);
        formData.append('image', imageFile);

        fetch('http://127.0.0.1:3000/receipe', {
            method: 'POST',
            headers: {
                'LOGIN': token
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            Swal.fire({
                title: 'Sukses',
                text: 'Resep berhasil disimpan!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed || result.isDismissed) {
                    window.location.href = 'dashboard-user.html'; // Mengarahkan ke dashboard-user.html
                }
            });
            document.getElementById('recipeForm').reset();
            imagePreview.style.display = 'none';
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire('Error', 'Terjadi kesalahan saat menyimpan resep.', 'error');
        });
    };

    // Event listener untuk submit form
    document.getElementById('recipeForm').addEventListener('submit', submitRecipeForm);

    // Event listener untuk tombol "Simpan Resep"
    document.querySelector('.btn-save').addEventListener('click', function() {
        document.getElementById('recipeForm').dispatchEvent(new Event('submit')); // Trigger submit form
    });

    // Fungsi untuk menambahkan input bahan baru
    const addIngredient = () => {
        const ingredientsContainer = document.getElementById('ingredientsContainer');
        const newIngredientNumber = ingredientsContainer.children.length + 1;

        const newIngredientHtml = `
            <div class="form-group">
                <label for="ingredient${newIngredientNumber}">Bahan ${newIngredientNumber}</label>
                <input type="text" class="form-control" id="ingredient${newIngredientNumber}" name="ingredient${newIngredientNumber}" placeholder="Masukkan bahan">
            </div>
        `;

        ingredientsContainer.insertAdjacentHTML('beforeend', newIngredientHtml);
    };

    // Fungsi untuk menambahkan input langkah baru
    const addStep = () => {
        const stepsContainer = document.getElementById('stepsContainer');
        const newStepNumber = stepsContainer.children.length + 1;

        const newStepHtml = `
            <div class="form-group">
                <label for="step${newStepNumber}">Langkah ${newStepNumber}</label>
                <textarea class="form-control" id="step${newStepNumber}" name="step${newStepNumber}" placeholder="Deskripsi langkah"></textarea>
            </div>
        `;

        stepsContainer.insertAdjacentHTML('beforeend', newStepHtml);
    };

    // Event listeners untuk tombol tambah bahan dan langkah
    document.getElementById('addIngredientButton').addEventListener('click', addIngredient);
    document.getElementById('addStepButton').addEventListener('click', addStep);
});