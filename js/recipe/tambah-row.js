document.addEventListener("DOMContentLoaded", function() {
    const token = localStorage.getItem('LOGIN');

    


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