document.getElementById("anggotaForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
  
    const nama = document.getElementById("nama").value.trim();
    const wilayah = document.getElementById("wilayah").value.trim();
    const lingkungan = document.getElementById("lingkungan").value.trim();
    const nomorHp = document.getElementById("nomor").value.trim();
    const ttl = document.getElementById("TTL").value.trim();
    const alamat = document.getElementById("alamat").value.trim();
    const hobby = document.getElementById("hobby").value.trim();
  
    if (!nama || !wilayah || !lingkungan || !nomorHp || !ttl || !alamat || !hobby) return;
  
    const daftarKelompok = document.getElementById("daftarKelompok");
    if (!daftarKelompok) return; // Cegah error di halaman index
  
    const idWilayah = `wilayah-${wilayah.toLowerCase().replace(/\s+/g, '-')}`;
    let groupDiv = document.getElementById(idWilayah);
  
    if (!groupDiv) {
      groupDiv = document.createElement("div");
      groupDiv.id = idWilayah;
      groupDiv.innerHTML = `
        <h3>Wilayah: ${wilayah}</h3>
        <table>
          <thead>
            <tr>
              <th>Nama</th>
              <th>Lingkungan</th>
              <th>Nomor HP</th>
              <th>TTL</th>
              <th>Alamat</th>
              <th>Hobi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      `;
      daftarKelompok.appendChild(groupDiv);
    }
  
    const tbody = groupDiv.querySelector("tbody");
    const row = tbody.insertRow();
    row.insertCell(0).innerText = nama;
    row.insertCell(1).innerText = lingkungan;
    row.insertCell(2).innerText = nomorHp;
    row.insertCell(3).innerText = ttl;
    row.insertCell(4).innerText = alamat;
    row.insertCell(5).innerText = hobby;
  
    const aksiCell = row.insertCell(6);
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";
    editBtn.onclick = () => editRow(row);
  
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Hapus";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => row.remove();
  
    aksiCell.appendChild(editBtn);
    aksiCell.appendChild(deleteBtn);
  
    document.getElementById("anggotaForm").reset();
  });
  
  function editRow(row) {
    const cells = row.querySelectorAll("td");
    document.getElementById("nama").value = cells[0].innerText;
    document.getElementById("lingkungan").value = cells[1].innerText;
    document.getElementById("nomor").value = cells[2].innerText;
    document.getElementById("TTL").value = cells[3].innerText;
    document.getElementById("alamat").value = cells[4].innerText;
    document.getElementById("hobby").value = cells[5].innerText;
    row.remove();
  }
  
  function cekDaftar() {
    const daftar = document.getElementById("daftarKelompok");
    if (daftar.innerHTML.trim() === "") {
      alert("Belum ada data anggota yang ditambahkan.");
    } else {
      alert("Data anggota ditampilkan di bawah.");
      daftar.scrollIntoView({ behavior: "smooth" });
    }
  }
  
  function exportPDF() {
    const element = document.getElementById("daftarKelompok");
    if (!element || !element.innerHTML.trim()) {
      alert("Tidak ada data untuk diekspor.");
      return;
    }
  
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF("p", "mm", "a4");
  
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
      pdf.addImage(imgData, "PNG", 0, 10, pdfWidth, pdfHeight);
      pdf.save("data_anggota.pdf");
    });
  }
  