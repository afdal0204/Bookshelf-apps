let dataBaseBuku = [];

if (typeof localStorage === 'undefined') {
    alert("Fitur local Storage belum ada");
} else {
    const dataBukuDiLocalStorage = localStorage.getItem("dataBaseBuku");
    if (dataBukuDiLocalStorage !== null) {
        dataBaseBuku = JSON.parse(dataBukuDiLocalStorage);
    }
}

renderDataBaseBuku();

function simpanKeLocalStorage() {
    localStorage.setItem("dataBaseBuku", JSON.stringify(dataBaseBuku));
}

function tambahBukuBaru() {
    const judulBuku = document.getElementById("inputBookTitle").value;
    const penulisBuku = document.getElementById("inputBookAuthor").value;
    const tahunBuku = document.getElementById("inputBookYear").value;
    const statusBuku = document.getElementById("inputBookIsComplete").checked;
    dataBaseBuku.push({
        id: +new Date(),
        title: judulBuku,
        author: penulisBuku,
        year: tahunBuku,
        isComplete: statusBuku
    });

    simpanKeLocalStorage();
}

function ubahStatusBukuById(bukuId) {
    dataBaseBuku.forEach(buku => {
        if (buku.id == bukuId) {
            buku.isComplete = !buku.isComplete;
        }
    });

    simpanKeLocalStorage();
    renderDataBaseBuku();

}

function hapusBukuById(bukuId) {
    let targetIndexBuku;

    for (let index = 0; index < dataBaseBuku.length; index++) {
        const buku = dataBaseBuku[index];
        if (buku.id == bukuId) {
            targetIndexBuku = index;
            break;
        }
    }

    dataBaseBuku.splice(targetIndexBuku, 1);


    simpanKeLocalStorage();
    renderDataBaseBuku();
}

function cariBukuByAuthor(authorBuku) {
    let arrayHasilPencarianBuku = [];

    for (let index = 0; index < dataBaseBuku.length; index++) {
        const buku = dataBaseBuku[index];
        if (buku.author == authorBuku) {
            arrayHasilPencarianBuku.push(buku);
        }
    }
    if (authorBuku == "") {
        renderDataBaseBuku();
    }   else {
        renderDataBaseBuku(arrayHasilPencarianBuku);
    }
}

function renderDataBaseBuku(customDataBaseBuku=dataBaseBuku) {
    const kotakBelumSelesai = document.getElementById("incompleteBookshelfList");
    const kotakSudahSelesai = document.getElementById("completeBookshelfList");

    let htmlItemBelumSelesai = "";
    let htmlItemSudahSelesai = "";

    for (let index = 0; index < customDataBaseBuku.length; index++) {
        const buku = customDataBaseBuku[index];

        const htmlBuku = `
            <article class="book_item">
                <h3>${buku.title}</h3>
                <p>Penulis: ${buku.author}</p>
                <p>Tahun: ${buku.year}</p>

                <div class="action">
                    <button class="green" onclick="ubahStatusBukuById(${buku.id})">
                     ${buku.isComplete ? "Belum Selesai Dibaca" : "Selesai Dibaca"}
                    </button>
                    <button class="red" onclick="hapusBukuById(${buku.id})">Hapus buku</button>
                </div>
            </article>
        `;
        if (buku.isComplete) {
            htmlItemSudahSelesai += htmlBuku;
        } else {
            htmlItemBelumSelesai += htmlBuku;
        }
    }
    kotakBelumSelesai.innerHTML = htmlItemBelumSelesai;
    kotakSudahSelesai.innerHTML = htmlItemSudahSelesai;
}

const formInputBuku = document.getElementById("inputBook");
formInputBuku.addEventListener("submit", function (event) {

    event.preventDefault();

    if (event.submitter.id == "bookSubmit") {
        tambahBukuBaru();
        renderDataBaseBuku();
    }
});

document.getElementById("searchBook").addEventListener("submit", function (event) {
    event.preventDefault();
    const searchBook = document
      .getElementById("searchBookTitle")
      .value.toLowerCase();
    const bookList = document.querySelectorAll(".book_item > h3");
    for (const book of bookList) {
      if (book.innerText.toLowerCase().includes(searchBook)) {
        book.parentElement.style.display = "block";
      } else {
        book.parentElement.style.display = "none";
      }
    }
  });
