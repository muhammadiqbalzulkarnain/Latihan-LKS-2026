// Deklarasi Variabel
const namaBuku = "Buku Tulis";
const hargaSatuan = 250000;

let jumlahBeli = 7;
let totalHarga = 0;
let diskon = 0;
let totalBayar = 0;
let statusBonus = "Tidak Mendapat Bonus";

// Hitung Total Harga Ketika Diskon
totalHarga = hargaSatuan * jumlahBeli;

if (totalHarga >= 100000) {
    diskon = totalHarga * 0.1;
}

totalBayar = totalHarga - diskon;

// Menentukan Status Bonus
if (jumlahBeli > 5 && totalHarga >= 200000) {
    statusBonus = "Buku Catatan Gratis";
}

// Menampilkan Hasil Ke Dalam Elemen HTML
document.getElementById("namaBuku").innerText = namaBuku;
document.getElementById("hargaSatuan").innerText = hargaSatuan;
document.getElementById("jumlahBeli").innerText = jumlahBeli;
document.getElementById("totalHarga").innerText = totalHarga;
document.getElementById("diskon").innerText = diskon;
document.getElementById("totalBayar").innerText = totalBayar;
document.getElementById("statusBonus").innerText = statusBonus;

// Debugging
console.log("Nama Buku:", namaBuku);
console.log("Harga Satuan:", hargaSatuan);
console.log("Jumlah Beli:",  jumlahBeli);
console.log("Total Harga:", totalHarga);
console.log("Diskon:", diskon);
console.log("Total Bayar:", totalBayar);
console.log("Status Bonus:", statusBonus);