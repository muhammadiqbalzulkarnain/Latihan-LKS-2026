// Mendeklarasikan
const namaPelanggan = "Danish";
const jenisMobil = "Lamborgini";
const hargaSewa = 400000;

let durasi = 4;
let totalBiaya = 0;
let diskon = 0;
let totalBayar = 0;

// Hitung Total Biaya
totalBiaya = hargaSewa * durasi;

// Aturan Diskon
if (totalBiaya >= 1500000) {
    diskon = totalBiaya * 0.1;
} else {
    diskon = 0;
}

totalBayar = totalBiaya - diskon;

// Aturan Bonus
if (durasi > 3 && totalBiaya >= 1500000) {
    statusBonus = "Free Driver + Gratis BBM";
} else {
    statusBonus = "Tidak Ada Bonus";
}

// Output DOM
document.getElementById('namaPelanggan').innerText = namaPelanggan;
document.getElementById('jenisMobil').innerText = jenisMobil;
document.getElementById('hargaSewa').innerText = hargaSewa;
document.getElementById('durasi').innerText = durasi;
document.getElementById('totalBiaya').innerText = totalBiaya;
document.getElementById('diskon').innerText = diskon;
document.getElementById('totalBayar').innerText = totalBayar;
document.getElementById('statusBonus').innerText = statusBonus;

console.log("=== Laporan Data Rental ===");
console.log("Nama Pelanggan:", namaPelanggan);
console.log("Jenis Mobil:", jenisMobil);
console.log("Harga Sewa:", hargaSewa);
console.log("Durasi:", durasi);
console.log("Total Biaya:", totalBiaya);
console.log("Diskon:", diskon);
console.log("Total Bayar:", totalBayar);
console.log("Status Bonus:", statusBonus);