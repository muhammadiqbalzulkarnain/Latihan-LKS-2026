const form = document.getElementById("formPendaftaran");
const inputNama = document.getElementById("nama");
const inputUmur = document.getElementById("umur");
const pesanError = document.getElementById("pesanError");
const pesanSukses = document.getElementById("pesanSukses");

// Pasang pendengar event saat tombol submit ditekan
form.addEventListener("submit", function(event) {
    event.preventDefault(); // HALANGI browser agar tidak refresh halaman!

    let nama = inputNama.value.trim(); // .trim() untuk membuang spasi berlebih di awal/akhir
    let umur = inputUmur.value;

    // VALIDASI 1: Cek apakah nama kosong
    if (nama === "") {
        pesanError.innerText = "Error: Nama lengkap tidak boleh kosong!";
        pesanSukses.innerText = "";
        return; // Hentikan eksekusi kode di sini
    }

    // VALIDASI 2: Cek apakah umur kosong atau di luar rentang 15-25 tahun
    if (umur === "" || umur < 15 || umur > 25) {
        pesanError.innerText = "Error: Umur harus di antara 15 sampai 25 tahun!";
        pesanSukses.innerText = "";
        return; // Hentikan eksekusi kode
    }

    // JIKA LOLOS SEMUA VALIDASI:
    pesanError.innerText = ""; // Bersihkan pesan error
    pesanSukses.innerText = "Pendaftaran berhasil! Selamat datang, " + nama + "!";
    
    form.reset(); // Mengosongkan kembali form input
});