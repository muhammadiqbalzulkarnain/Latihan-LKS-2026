const dataProduk = [
    { nama: "Smartphone Android RAM 8GB", harga: 2500000 },
    { nama: "Laptop Gaming Core i7", harga: 12000000 },
    { nama: "Headset Gaming RGB", harga: 350000 },
    { nama: "Mousepad Gaming Anti-Slip", harga: 75000 },
    { nama: "Mechanical Keyboard Blue Switch", harga: 500000 }
];

const inputCari = document.getElementById("cariProduk");
const ulList = document.getElementById("listProduk");

function tampilkanProduk(list) {
    ulList.innerHTML = "";

    if (list.length === 0) {
        ulList.innerHTML = "<li>Produk tidak ditemukan</li>";
        return;
    }

    list.forEach(item => {
        let li = document.createElement("li");
        li.innerText = `${item.nama} - Harga: Rp ${item.harga.toLocaleString()}`;
        ulList.appendChild(li);
    });
}

tampilkanProduk(dataProduk);

inputCari.addEventListener("input", function() {
    let keyword = inputCari.value.toLowerCase();

    let hasilFilter = dataProduk.filter(item => {
        return item.nama.toLowerCase().includes(keyword);
    });

    tampilkanProduk(hasilFilter);
});