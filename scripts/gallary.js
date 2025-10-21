document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('gallery');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Portfolio data with categories
    const portfolioItems = [
        {
            id: 1,
            title: "Mountain Majesty",
            category: "nature",
            type: "photography",
            description: "Capturing the raw beauty of mountain landscapes at golden hour.",
            url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: 2,
            title: "Urban Dreams",
            category: "urban",
            type: "digital",
            description: "Digital art piece exploring the future of city landscapes.",
            url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: 3,
            title: "Ocean Serenity",
            category: "nature",
            type: "photography",
            description: "Peaceful ocean waves captured during sunrise.",
            url: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: 4,
            title: "Digital Forest",
            category: "nature",
            type: "digital",
            description: "Abstract digital interpretation of forest ecosystems.",
            url: "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: 5,
            title: "City Lights",
            category: "urban",
            type: "photography",
            description: "Long exposure photography of city traffic at night.",
            url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: 6,
            title: "Desert Soul",
            category: "nature",
            type: "photography",
            description: "The endless beauty of desert landscapes and textures.",
            url: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: 7,
            title: "Neon Dreams",
            category: "urban",
            type: "digital",
            description: "Cyberpunk inspired digital artwork featuring neon aesthetics.",
            url: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: 8,
            title: "Northern Magic",
            category: "nature",
            type: "photography",
            description: "Aurora borealis dancing across the Arctic sky.",
            url: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: 9,
            title: "Abstract Architecture",
            category: "urban",
            type: "digital",
            description: "Geometric patterns inspired by modern architecture.",
            url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: 10,
            title: "Wildflower Field",
            category: "nature",
            type: "photography",
            description: "Vibrant wildflowers covering the countryside hills.",
            url: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: 11,
            title: "Metropolis",
            category: "urban",
            type: "digital",
            description: "Futuristic cityscape digital painting.",
            url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: 12,
            title: "Waterfall Power",
            category: "nature",
            type: "photography",
            description: "The raw power and beauty of a massive waterfall.",
            url: "https://images.unsplash.com/photo-1512273222628-4daea6e55abb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        }
    ];

    // Initialize gallery
    loadPortfolioItems('all');

    // Add event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active state
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            const filter = this.getAttribute('data-filter');
            loadPortfolioItems(filter);
        });
    });

    function loadPortfolioItems(filter) {
        gallery.innerHTML = '';
        
        const filteredItems = filter === 'all' 
            ? portfolioItems 
            : portfolioItems.filter(item => item.category === filter || item.type === filter);
        
        filteredItems.forEach((item, index) => {
            const portfolioItem = createPortfolioItem(item, index);
            gallery.appendChild(portfolioItem);
            
            // Add staggered animation delay
            portfolioItem.style.animationDelay = `${index * 0.1}s`;
        });
    }

    function createPortfolioItem(item, index) {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        portfolioItem.setAttribute('data-category', item.category);
        portfolioItem.setAttribute('data-type', item.type);
        
        portfolioItem.innerHTML = `
            <div class="portfolio-image">
                <div class="image-placeholder ${index >= 8 ? 'special' : ''} loading">
                    Loading ${item.title}...
                </div>
            </div>
            <div class="portfolio-info">
                <h3>${item.title}</h3>
                <div class="category">${item.type} • ${item.category}</div>
                <p class="description">${item.description}</p>
            </div>
        `;
        
        // Load image after a delay to simulate loading
        setTimeout(() => {
            const imageContainer = portfolioItem.querySelector('.portfolio-image');
            imageContainer.innerHTML = `
                <img src="${item.url}" alt="${item.title}" loading="lazy">
            `;
            
            // Add error handling for images
            const img = imageContainer.querySelector('img');
            img.onerror = function() {
                imageContainer.innerHTML = `
                    <div class="image-placeholder ${index >= 8 ? 'special' : ''}">
                        Failed to load image<br>
                        <small>${item.title}</small>
                    </div>
                `;
            };
        }, 500 + (index * 100));
        
        return portfolioItem;
    }
});