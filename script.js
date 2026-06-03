document.addEventListener("DOMContentLoaded", function() {
    const popup = document.getElementById("welcomePopup");
    const closeBtn = document.getElementById("closePopupBtn");

    // 1. Munculkan pop up otomatis 500ms setelah halaman selesai diload
    setTimeout(() => {
        popup.classList.add("show");
    }, 500);

    // 2. Tutup pop up jika tombol X (area invisible) diklik
    closeBtn.addEventListener("click", () => {
        popup.classList.remove("show");
    });

    // 3. Opsional: Tutup pop up kalau user asal klik area abu-abu di luarnya
    popup.addEventListener("click", (e) => {
        if (e.target === popup) {
            popup.classList.remove("show");
        }
    });
});