document.addEventListener("DOMContentLoaded", function() {
    const token = localStorage.getItem('LOGIN');

    function fetchData() {
        const headers = new Headers({
            LOGIN: token,
            'Content-Type': 'application/json'
        });

        fetch('http://127.0.0.1:3000/resep/user', { headers: headers })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => updateTable(data.data))
            .catch(error => console.error('Error fetching data:', error));
    }

    // Fungsi untuk mengupdate tabel dengan data baru
    function updateTable(data) {
        const tableBody = document.querySelector('#add-row tbody');
        tableBody.innerHTML = ''; // Membersihkan isi tabel terlebih dahulu

        // Membuat baris baru di tabel untuk setiap item data
        data.forEach(item => {
            const row = tableBody.insertRow();
            row.insertCell().textContent = item.title;
            row.insertCell().textContent = item.description;
            const ingredientsCell = row.insertCell();
            const ingredientsList = item.ingredients.split(',').map(ingredient => `<li>${ingredient.trim()}</li>`).join('');
            ingredientsCell.innerHTML = `<ul>${ingredientsList}</ul>`;
    
            // Ubah instructions menjadi list HTML
            const instructionsCell = row.insertCell();
            const instructionsList = item.instructions.split(',').map(step => `<li>${step.trim()}</li>`).join('');
            instructionsCell.innerHTML = `<ul>${instructionsList}</ul>`;

            const imgCell = row.insertCell();
            const imageUrl = `http://127.0.0.1:3000/img/${item.Image.split('/').pop()}`; // Correctly format the image URL
            imgCell.innerHTML = `<img src="${imageUrl}" alt="Food Image" style="max-height: 100px; max-width: 100%;"/>`;          const actionCell = row.insertCell();
            actionCell.innerHTML = `
            <button type="button" class="btn btn-link btn-primary btn-lg" data-bs-toggle="tooltip" title="Edit" onclick="editItem(${item.recipe_id})">
                <i class="fa fa-edit"></i>
            </button>
            <button type="button" class="btn btn-link btn-danger btn-lg" data-bs-toggle="tooltip" title="Delete" onclick="hapusItem(${item.recipe_id})">
                <i class="fa fa-times"></i>
            </button>
        `;
        });
    }

    // Memanggil fungsi fetch pada saat halaman dimuat
    fetchData();

    window.editItem = function(id) {
        console.log("Editing item with ID:", id);
        window.location.href = `edit-resep.html?recipe_id=${id}`;
    }
    
    
    // Definisi fungsi untuk menghapus item
    window.hapusItem = function(id) {
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: "Anda tidak akan dapat mengembalikan ini!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus saja!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                // Jika pengguna mengkonfirmasi penghapusan
                const url = `http://127.0.0.1:3000/receipe/delete?recipe_id=${id}`;
                fetch(url, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'LOGIN': token
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    Swal.fire(
                        'Dihapus!',
                        'Resep Anda telah dihapus.',
                        'success'
                    );
                    console.log(data);
                    fetchData(); // Memuat ulang data untuk memperbarui tampilan
                })
                .catch(error => {
                    console.error('Error:', error);
                    Swal.fire(
                        'Gagal!',
                        'Terjadi kesalahan saat menghapus resep.',
                        'error'
                    );
                });
            }
        });
    }
    
});
