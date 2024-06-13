import { endpointLogin } from "../js/url.js";

document.getElementById("signInButton").addEventListener("click", function (event) {
  event.preventDefault();

  const emailOrUsername = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const data = {
    username: emailOrUsername,
    password: password,
  };

  fetch(endpointLogin, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  .then((response) => {
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Password salah. Silakan coba lagi.");
      } else {
        throw new Error("Terjadi kesalahan pada server. Silakan coba lagi nanti.");
      }
    }
    return response.json();
  })
  .then((data) => {
    if (data.token) {
      localStorage.setItem("userName", data.role[0].nama);
      localStorage.setItem("userEmail", data.role[0].email);
      localStorage.setItem("LOGIN", data.token);
      document.cookie = `LOGIN=${data.token};path=/;max-age=3600`;

      return Swal.fire({
        icon: 'success',
        title: 'Login Berhasil',
        text: 'Selamat, Anda berhasil login!',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          if ( data.role[0].id_role === 1) {
            window.location.href = "dashboard-admin.html";
          } else if (data.role[0].id_role === 2) {
            window.location.href = "dashboard-user.html";
          }
        }
      });
    } else {
      throw new Error("Token tidak diterima");
    }
  })
  .catch((error) => {
    console.error("Error:", error);
    Swal.fire({
      icon: "error",
      title: "Error Login",
      text: error.message,
    });
  });
});
