const namaPelanggan = "Siti Aminah";
const golonganDaya = "R1-900VA";
const tarifPerKwh = 1350;

let pemakaianKwh = 150;
let terlambatHari = 5;
let biayaPemakaian = 0;
let denda = 0;
let totalTagihan = 0;
let statusBayar = "Terlambat";

biayaPemakaian = tarifPerKwh * pemakaianKwh;

if (terlambatHari > 0 && golonganDaya === "R1-900VA") {
    let dendaHarian = terlambatHari * 5000;
    denda = 50000 + dendaHarian;
} else {
    denda = 0;
}

totalTagihan = biayaPemakaian + denda;

document.getElementById("namaPelanggan").innerText = namaPelanggan;
document.getElementById("golongan").innerText = golonganDaya;
document.getElementById("pemakaianKwh").innerText = pemakaianKwh;
document.getElementById("statusBayar").innerText = statusBayar;

document.getElementById("biayaPemakaian").innerText = "Rp " + biayaPemakaian.toLocaleString();
document.getElementById("denda").innerText = "Rp " + denda.toLocaleString();
document.getElementById("totalTagihan").innerText = "Rp " + totalTagihan.toLocaleString();

console.log("--- Laporan Tagihan Listrik ---");
console.log("Pelanggan:", namaPelanggan);
console.log("Biaya Pemakaian:", biayaPemakaian);
console.log("Total Denda:", denda);
console.log("Total Tagihan:", totalTagihan);