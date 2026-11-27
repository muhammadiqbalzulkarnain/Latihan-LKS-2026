const form = document.getElementById("formBioskop");
const inputNama = document.getElementById("nama");
const inputUsia = document.getElementById("usia");
const pesanError = document.getElementById("pesanError");
const pesanSukses = document.getElementById("pesanSukses");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    let nama = inputNama.value.trim();
    let usia = inputUsia.value;

    if (nama === "") {
        pesanError.innerText = "Error: Nama pemesan tidak boleh kosong!";
        pesanSukses.innerText = "";
        return;
    }

    if (usia === "" || usia < 17) {
        pesanError.innerText = "Maaf, usia Anda belum cukup! Film ini khusus penonton 17 tahun ke atas.";
        pesanSukses.innerText = "";
        return;
    }

    pesanError.innerText = "";
    pesanSukses.innerText = "Tiket berhasil dicetak! Selamat menikmati film, " + nama + ".";
    
    form.reset();
});