// Data awal: Ada 3 menu berbeda di dalam array
const daftarPesanan = [
    { namaMenu: "Nasi Goreng Spesial", harga: 25000, jumlah: 2 },
    { namaMenu: "Ayam Bakar Madu", harga: 35000, jumlah: 1  },
    { namaMenu: "Es Teh Manis", harga: 5000, jumlah: 3 }
];

let totalBelanja = 0; // Wadah penampung uang total sementara
const tbody = document.getElementById("tabelMenu");

// Perulangan untuk memproses tiap-tiap menu
daftarPesanan.forEach((item, index) => {
    // 1. Hitung subtotal per item (Harga dikali Jumlah beli)
    let subtotal = item.harga * item.jumlah;
    
    // 2. Tambahkan subtotal ini ke totalBelanja secara terus-menerus (akumulasi)
    totalBelanja += subtotal; 

    // 3. Buat baris HTML baru untuk dimasukkan ke tabel
    let baris = `
        <tr>
            <td>${index + 1}</td>
            <td>${item.namaMenu}</td>
            <td>Rp ${item.harga.toLocaleString()}</td>
            <td>${item.jumlah}</td>
            <td>Rp ${subtotal.toLocaleString()}</td>
        </tr>
    `;
    tbody.innerHTML += baris; // Masukkan ke dalam tabel HTML
});

// Hitung PPN 11% dari total belanja
let pajak = totalBelanja * 0.11;
let totalBayar = totalBelanja + pajak;

// Tampilkan hasil akhir ke layar HTML
document.getElementById("totalBelanja").innerText = "Rp " + totalBelanja.toLocaleString();
document.getElementById("pajak").innerText = "Rp " + pajak.toLocaleString();
document.getElementById("totalBayar").innerText = "Rp " + totalBayar.toLocaleString();