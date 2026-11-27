const riwayatTransaksi = [
    { tanggal: "01/06/2026", ket: "Setoran Awal", jenis: "Setor", nominal: 100000 },
    { tanggal: "03/06/2026", ket: "Tabungan Bulanan", jenis: "Setor", nominal: 50000 },
    { tanggal: "05/06/2026", ket: "Beli Alat Tulis", jenis: "Tarik", nominal: 25000 },
    { tanggal: "10/06/2026", ket: "Pemasukan Saku", jenis: "Setor", nominal: 75000 }
];

let totalSetor = 0;
let totalTarik = 0;
const tbody = document.getElementById("tabelTabungan");

riwayatTransaksi.forEach((item, index) => {
    if (item.jenis === "Setor") {
        totalSetor += item.nominal;
    } else if (item.jenis === "Tarik") {
        totalTarik += item.nominal;
    }

    let baris = `
        <tr>
            <td>${index + 1}</td>
            <td>${item.tanggal}</td>
            <td>${item.ket}</td>
            <td>${item.jenis}</td>
            <td>Rp ${item.nominal.toLocaleString()}</td>
        </tr>
    `;
    tbody.innerHTML += baris;
});

let saldoAkhir = totalSetor - totalTarik;

document.getElementById("totalSetor").innerText = "Rp " + totalSetor.toLocaleString();
document.getElementById("totalTarik").innerText = "Rp " + totalTarik.toLocaleString();
document.getElementById("saldoAkhir").innerText = "Rp " + saldoAkhir.toLocaleString();