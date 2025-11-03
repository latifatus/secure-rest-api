const API_BASE_URL = "https://secure-rest-api.vercel.app"; // Ganti dengan domain backend kamu di Vercel

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const res = await fetch(${API_BASE_URL}/login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        alert("Login berhasil ✅");
        window.location.href = "profile.html";
      } else {
        alert(data.message || "Login gagal!");
      }
    } catch (err) {
      alert("Gagal terhubung ke server!");
    }
  });
}

// ================= PROFILE HANDLER =================
if (window.location.pathname.endsWith("profile.html")) {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Kamu harus login dulu!");
    window.location.href = "index.html";
  } else {
    fetch(${API_BASE_URL}/profile, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json();
          alert(err.message || "Sesi habis, login ulang wakk!");
          localStorage.removeItem("token");
          window.location.href = "index.html";
          return;
        }

        const data = await res.json();
        if (data.email) {
          document.getElementById("userEmail").textContent = Email: ${data.email};
        }
      })
      .catch(() => {
        alert("Gagal memverifikasi token!");
        localStorage.removeItem("token");
        window.location.href = "index.html";
      });
  }

  // tombol logout
  const logoutBtn = document.getElementById("logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("token");
      window.location.href = "index.html";
    });
  }
}