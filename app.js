console.log("Bismillah Ya Allah");

//Aktivitas 1 DOM SELECTION / SELEKSI ELEMENT
//KENAPA KITA HARUS SELEKSI KARENA "MENANGKAP" ATAU AMBIL ID/CLASS
//MENGAMBIL ELEMENT HTML TERSEBUT LALU DISIMPAN DI VARIABEL JS

//1. MENGAMBIL ELEMEN JUDUL UTAMA DAN SUBJUDUL
// document.getElementById("...") mengambil berdasarkan atribut id

const judulutama = document.getElementById("judul-utama");

// document.querySelector("#..."")
//tanda # artinya id kalo class pake "."

const subjudul = document.querySelector("#Sub-Judul"); // menangkap: <p id="#Sub-Judul">

// 2. mengambil element pada kartu 1 (kartu manipulasi teks & style)
const tekspreview = document.getElementById("teks-preview");
const boxpreview = document.getElementById("box-preview");
const cardmanipulasi = document.getElementById("card-manipulasi");

// 3. mengambil element tombol2 aksi pada kartu 1
const btnubateks = document.getElementById("btn-ubah-teks");
const btntogglewarna = document.getElementById("btn-toggle-warna");
const btnreset = document.getElementById("btn-reset");

// 4. mengambil elemen pada kartu 2 (fitur catatan dinamis / to do list sederhana)
const inputcatatan = document.getElementById("input-catatan");
const btntambah = document.getElementById("btn-tambah");
const daftarcatatan = document.getElementById("daftar-catatan");
const jumlahcatatan = document.getElementById("jumlah-catatan");
const pesankosong = document.getElementById("pesan-kosong");

// Aktivitas 2 manipulasi teks & style (card 1)
// addEventListener("click", function() (...) artinya adalah )
// sampai di klik user. jika diklik jalankan perintah di dalam function

// A. mengubah teks & warna secara langsung
btnubateks.addEventListener("click", function() {
    //.innertext = mengganti atau mengisi secara langsung teks yang ada di dalam elemen html
    tekspreview.innerText = "Hebat! Teks ini berhasil diubah pake DOM";

    //.style.color = mengubah warna teks secara langsung (inline style)
    tekspreview.style.color = "#4138ee";

    //console.log = mencetak pesan di console browser
    console.log("[DOM] Teks preview telah diperbarui");

});

// B. manipulasi class css menggunakan classlist.toggle()
btntogglewarna.addEventListener("click", function () {
    //.classlist.toggle("mama-class") = fitur saklar otomatis
    boxpreview.classList.toggle("active-mode");
    cardmanipulasi.classList.toggle("highlight");

    console.log("DOM Berhasil di switch!");

})

//c. mengemballikan (reset) teks ke kondisi semula
btnreset.addEventListener("click", function() {
    //1. kembalikan teks semula ke asli
    tekspreview.innerText = "Halo! Teks ini siap diubah oleh javascript";

    //2. kosongkan warna agar keambil ke warna css halaman
    tekspreview.style.color = "";

    //3. hapus class khusus untuk menggunakan .classlist.remove("")
    boxpreview.classList.remove("active-mode");
    cardmanipulasi.classList.remove("highlight");

    console.log("Dom Tampilan di Reset");
})

// Aktivitas 3 & 4 : Elemen Dinamis & Event Handling (TO-DO LIST SEDERHANA)
// DI AKTIVITAS INI KITA BELAJAR ELEMENT HTML BARU (<li> secara otomatis dalam js
//mengisi teksnya, memberi tombol hapus, lalu menempelkan ke layar (<ul>)

//langkah 1: membuat variabel penampung angka jumlah centang
// *let* digunakan untuk nilai variabel yang akan berubah ubah bisa bertambah bisa berkurang (counting)
let totalcatatan = 0;

// langkah 2: fungsi update angka counter dan pesan status
function perbaruijumlah() {
    //masukkan angka total catatan terbaru ke dalam tag <span id="jumlah-catatan">
    jumlahcatatan.innerText = totalcatatan;

    //conditional statement berupa apakah catatannya itu kosong atau 0?
    if (totalcatatan === 0) {
        //jika 0: hapus class "hidden" supaya teks "Belum ada catatan" muncul ke layar
        pesankosong.classList.remove("hidden");
    } else {
        // jika > 0: tambahkan kelas "hidden" agar teks "belum ada catatan" tersembunyi
        pesankosong.classList.add("hidden");
    }
}

// langkah 3: membuat fungsi utama logika tambah catatan baru
function tambahcatatan() {
    // 3.1 inputcatatan.value fungsinya untuk mengambil teks yang diketik oleh user
    //trim() = menghapus spasi di awal dan di akhir
    const isiteks = inputcatatan.value.trim();

    //3.2 validasi input: jika isi teks kosong maka tampilkan alert
    if (isiteks === "") {
        alert("Catatan kamu tidak boleh kosong!");
        return;
    }

    //3.3 document.createElement("li") --> membuat memori di js secara dinamis
    const libaru = document.createElement("li");
    libaru.className = "note-item"; //menambahkan pada tag li

    // 3.4 .innerHTML = mengisi struktur di dalam <li> dengan teks catatan dan tombol hapus
    //tanda backtik (`)
    libaru.innerHTML = `<span>${isiteks}</span> <button class ="btn-hapus">Hapus</button>`;

    // 3.5 menambahkan telinga / event listener untuk tombol hapus pada catatan dinamis
    // libaru.quarySelector(".btn-hapus") untuk mengambil tombol bar class "btn-hapus" khusus yang ada di li
    const btnhapus = libaru.querySelector(".btn-hapus");
    btnhapus.addEventListener("click", function() { 
        libaru.remove(); //menghapus elemen list daari layar html
        totalcatatan--; //totalcatatan dikurangi sebanyak 1x
        perbaruijumlah(); // panggil fungsi perbaruijumlah untuk update angka di layar
        console.log(`Dom Catatan "${isiteks}" dihapus`);
    });

    //3.6 appenChild = memasukkan elemen li ke dalam wadah <ul id="daftar-catatan">
    daftarcatatan.appendChild(libaru);

    //3.7 mengosongkan kembali isi kolom input (inputcatatan.value = "") supaya bisa diketik lagi
    inputcatatan.value = "";

    //3.8 totalcatatan++ artinya tambah nila total catatan sebanyak 1, lalu update angka ke layar
    totalcatatan++;
    perbaruijumlah();

    console.log(`DOM Catatan baru ditambahkan: ${isiteks} `);
}

//langkah 4: Event Listener Klik Tombol + "Tambah"
//ketika tombol "+ Tambah " di klik oleh user, maka jalankan fungsi tambahcatatan()
btntambah.addEventListener("click", function() {
    tambahcatatan();
});

//Langkah 5: Event Listener Keyboard "Enter" pada kolom input
//ketika user mengetik di kolom input dan melepas tombol keyboard (`Event keyup);
inputcatatan.addEventListener("keyup", function (event) {
    //periksa apakah tombol keyboard yang ditekan user adalah enter?
    if (event.key === "Enter") {
        tambahcatatan(); //jika ya, tambahkan fungsi tambahcatatan()
    }
});
