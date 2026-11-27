// Data awal inventaris barang
const dataBarang = [
    { nama: "Laptop ASUS ROG", kategori: "Elektronik" },
    { nama: "Mouse Wireless Logitech", kategori: "Elektronik" },
    { nama: "Keyboard Mechanical", kategori: "Elektronik" },
    { nama: "Buku Tulis Sidu", kategori: "Alat Tulis" },
    { nama: "Pulpen Faster", kategori: "Alat Tulis" },
    { nama: "Tas Ransel Laptop", kategori: "Fashion" }
];

const inputCari = document.getElementById("cariBarang");
const ulDaftar = document.getElementById("daftarBarang");

// Fungsi serbaguna untuk merender/menampilkan data ke HTML
function tampilkanData(listData) {
    ulDaftar.innerHTML = ""; // Kosongkan list sebelum diisi ulang

    // Jika data kosong setelah difilter
    if (listData.length === 0) {
        ulDaftar.innerHTML = "<li>Barang tidak ditemukan</li>";
        return;
    }

    // Masukkan setiap barang ke dalam tag <li>
    listData.forEach(item => {
        let li = document.createElement("li");
        li.innerText = `${item.nama} - [Kategori: ${item.kategori}]`;
        ulDaftar.appendChild(li);
    });
}

// Jalankan fungsi ini saat pertama kali halaman dibuka (menampilkan semua data awal)
tampilkanData(dataBarang);

// FITUR PENCARIAN REAL-TIME
inputCari.addEventListener("input", function() {
    // Ambil apa yang diketik user, ubah jadi huruf kecil semua
    let keyword = inputCari.value.toLowerCase();

    // Saring data menggunakan fungsi filter()
    let hasilFilter = dataBarang.filter(item => {
        // Cek apakah nama barang mengandung kata kunci yang diketik
        return item.nama.toLowerCase().includes(keyword);
    });

    // Tampilkan hasil saringan ke layar
    tampilkanData(hasilFilter);
});