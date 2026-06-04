document.addEventListener("DOMContentLoaded", function() {
    const letterIcon = document.getElementById("letterIcon");
    const sideMenu = document.getElementById("sideMenu");
    const closeMenuBtn = document.getElementById("closeMenuBtn");
    const sideMenuOverlay = document.getElementById("sideMenuOverlay");

    letterIcon.addEventListener("click", () => {
        sideMenu.classList.add("open");
        sideMenuOverlay.classList.add("show");
    });

    closeMenuBtn.addEventListener("click", () => {
        sideMenu.classList.remove("open");
        sideMenuOverlay.classList.remove("show");
    });

    sideMenuOverlay.addEventListener("click", () => {
        sideMenu.classList.remove("open");
        sideMenuOverlay.classList.remove("show");
    });

// === LOGIKA MENU FILTER ===
    const filterBtn = document.getElementById("filterBtn");
    const filterMenu = document.getElementById("filterMenu");

    filterBtn.addEventListener("click", (e) => {
        e.stopPropagation(); 
        filterMenu.classList.toggle("show");
    });

    document.addEventListener("click", (e) => {
        if (!filterMenu.contains(e.target) && !filterBtn.contains(e.target)) {
            filterMenu.classList.remove("show");
        }
    });

    const flowerData = {
        0: { 
            icon: "🌺", 
            name: "Sunday Orchid", 
            symbol: "Symbolizes: Elegance, beauty, and strength", 
            quote: '"A beautiful week begins with a beautiful mind."'
        },
        1: { 
            icon: "🌹", 
            name: "Monday Rose", 
            symbol: "Symbolizes: Love, passion, and appreciation", 
            quote: '"Start the week with love and kindness in your heart."'
        },
        2: { 
            icon: "🌷", 
            name: "Tuesday Tulip", 
            symbol: "Symbolizes: Perfect love and fresh beginnings", 
            quote: '"Every day is a new chance to bloom."'
        },
        3: { 
            icon: "🌻", 
            name: "Wednesday Sunflower", 
            symbol: "Symbolizes: Happiness, positivity, and loyalty", 
            quote: '"Keep your face toward the sunshine."'
        },
        4: { 
            icon: "💜", 
            name: "Thursday Lavender", 
            symbol: "Symbolizes: Calmness, peace, and healing", 
            quote: '"Slow down and find beauty in quiet moments."'
        },
        5: { 
            icon: "🌼", 
            name: "Friday Daisy", 
            symbol: "Symbolizes: Innocence, joy, and new beginnings", 
            quote: '"Celebrate the little things that make you smile."'
        },
        6: { 
            icon: "🤍", 
            name: "Saturday Lily", 
            symbol: "Symbolizes: Purity, hope, and renewal", 
            quote: '"Let your heart rest and bloom gently."'
        }
    };

    const today = new Date().getDay();
    const currentFlower = flowerData[today];

    const dailyContent = document.getElementById("dailyContent");
    
    dailyContent.innerHTML = `
        <div class="fotd-day">${currentFlower.icon} ${currentFlower.name}</div>
        <div class="fotd-symbol">${currentFlower.symbol}</div>
        <div class="fotd-quote">${currentFlower.quote} ${currentFlower.icon}</div>
    `;


// ==========================================
    // 1. DATA DATABASE BUNGA (Ditambah warna background card)
    // ==========================================
    const flowerDatabase = [
        { id: 1, name: "Lily", image: "picture/lily.jpg", category: "Indoor", color: "White", meaning: "Purity and Hope", careLevel: "Medium", bgClass: "card-pink" },
        { id: 2, name: "Gerbera", image: "picture/gerbera.jpg", category: "Outdoor", color: "Pink", meaning: "Cheerfulness", careLevel: "Easy", bgClass: "card-lightpink" },
        { id: 3, name: "Rose", image: "picture/rose.jpg", category: "Outdoor", color: "Red", meaning: "Love and Passion", careLevel: "Hard", bgClass: "card-green" },
        { id: 4, name: "Tulip", image: "picture/tulip.jpg", category: "Indoor", color: "Yellow", meaning: "Perfect Love", careLevel: "Medium", bgClass: "card-pink" },
        { id: 5, name: "Daisy", image: "picture/daisy.jpg", category: "Outdoor", color: "White", meaning: "Innocence and Joy", careLevel: "Easy", bgClass: "card-lightpink" }
    ];

    // ==========================================
    // 2. STATE MANAGEMENT 
    // ==========================================
    let currentSearchTerm = ""; 
    let currentActiveFilter = "all"; 
    let isSortedAZ = false; 

    // ==========================================
    // 3. ENGINE FILTER & SORT
    // ==========================================
    function getProcessedFlowers() {
        let result = [...flowerDatabase]; 

        if (currentSearchTerm !== "") {
            const lowerTerm = currentSearchTerm.toLowerCase();
            result = result.filter(flower => {
                if (currentActiveFilter === "all") {
                    return flower.name.toLowerCase().includes(lowerTerm) ||
                           flower.category.toLowerCase().includes(lowerTerm) ||
                           flower.color.toLowerCase().includes(lowerTerm) ||
                           flower.meaning.toLowerCase().includes(lowerTerm) ||
                           flower.careLevel.toLowerCase().includes(lowerTerm);
                } else {
                    return flower[currentActiveFilter].toLowerCase().includes(lowerTerm);
                }
            });
        }

        if (isSortedAZ) {
            result.sort((a, b) => a.name.localeCompare(b.name));
        }

        return result;
    }

   
    const cardsContainer = document.getElementById("cardsContainer");

    function renderFlowers(flowers) {
        cardsContainer.innerHTML = ""; 

        if(flowers.length === 0) {
            cardsContainer.innerHTML = "<p style='color:#df88a5; font-size:1.2rem; font-family: Uwap;'>Yah, bunganya tidak ditemukan...</p>";
            return;
        }

        flowers.forEach(flower => {
            const cardHTML = `
                <div class="card ${flower.bgClass}">
                    <div class="card-img-wrapper">
                        <img src="${flower.image}" alt="${flower.name}" onerror="this.style.display='none'">
                    </div>
                    <div class="card-title">${flower.name}</div>
                </div>
            `;
            cardsContainer.innerHTML += cardHTML;
        });
    }

    renderFlowers(flowerDatabase);

  
    // A. Fitur Ngetik di Search Bar
    const searchInput = document.querySelector(".search-input-box input");
    const filterSearchText = document.querySelector(".filter-search-text"); 

    searchInput.addEventListener("input", (e) => {
        currentSearchTerm = e.target.value;
        renderFlowers(getProcessedFlowers());
    });

    // B. Fitur Tombol Sort A-Z
    const btnSortAZ = document.getElementById("btnSortAZ");
    btnSortAZ.addEventListener("click", () => {
        isSortedAZ = !isSortedAZ; // Nyala / Mati bergantian
        
        if(isSortedAZ) {
            btnSortAZ.style.backgroundColor = "#df88a5";
            btnSortAZ.style.color = "white";
        } else {
            btnSortAZ.style.backgroundColor = "transparent";
            btnSortAZ.style.color = "#5a4b41";
        }
        
        renderFlowers(getProcessedFlowers());
    });

    // C. Fitur Pilih Kategori Filter
    const filterOptions = document.querySelectorAll(".filter-opt");
    
    filterOptions.forEach(btn => {
        btn.addEventListener("click", () => {
            filterOptions.forEach(b => {
                b.style.backgroundColor = "transparent";
                b.style.color = "#5a4b41";
            });

            btn.style.backgroundColor = "#df88a5";
            btn.style.color = "white";

            currentActiveFilter = btn.getAttribute("data-filter");
            
            if(currentActiveFilter === "all") {
                filterSearchText.innerHTML = "🔍 Search Flower...";
            } else {
                filterSearchText.innerHTML = `🔍 Search by ${currentActiveFilter}...`;
            }

            renderFlowers(getProcessedFlowers());
        });
    });
    
});