// State Management
let allOutfits = [];
let filteredOutfits = [];
let activeFilters = {
    categories: [],
    colors: [],
    styles: []
};

// Color palette mapping
const colorPalette = {
    'Red': '#EF4444',
    'Blue': '#3B82F6',
    'Green': '#10B981',
    'Black': '#000000',
    'White': '#FFFFFF',
    'Pink': '#EC4899',
    'Yellow': '#F59E0B',
    'Brown': '#92400E',
    'Orange': '#F97316',
    'Purple': '#9333EA',
    'Violet': '#7C3AED',
    'Grey': '#6B7280',
    'Multicolor': 'linear-gradient(135deg, #EF4444, #F59E0B, #3B82F6)'
};

// Initialize app
document.addEventListener('DOMContentLoaded', async () => {
    await loadOutfits();
    initializeFilters();
    renderGallery();
    initializeEventListeners();
});

// Load outfits from JSON
async function loadOutfits() {
    try {
        const response = await fetch('outfits.json');
        allOutfits = await response.json();
        filteredOutfits = [...allOutfits];
        updateOutfitCount();
        document.getElementById('loading').style.display = 'none';
    } catch (error) {
        console.error('Error loading outfits:', error);
        document.getElementById('loading').innerHTML = `
            <div class="text-center py-16">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="mx-auto mb-4 text-gray-300"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                <h3 class="text-xl font-semibold text-gray-800 mb-2">Could not load outfits</h3>
                <p class="text-gray-500 mb-6">Make sure outfits.json exists and you're using Live Server</p>
                <a href="tag-helper.html" class="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium transition">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
                    Create outfits.json
                </a>
            </div>
        `;
    }
}

// Initialize filter buttons
function initializeFilters() {
    // Extract unique values
    const categories = [...new Set(allOutfits.map(o => o.category))].sort();
    const colors = [...new Set(allOutfits.flatMap(o => o.colors))].sort();
    const styles = [...new Set(allOutfits.map(o => o.style))].sort();

    // Render category filters
    const categoryContainer = document.getElementById('categoryFilters');
    categories.forEach(category => {
        const btn = createFilterButton(category, 'category');
        categoryContainer.appendChild(btn);
    });

    // Render color filters
    const colorContainer = document.getElementById('colorFilters');
    colors.forEach(color => {
        const chip = createColorChip(color);
        colorContainer.appendChild(chip);
    });

    // Render style filters
    const styleContainer = document.getElementById('styleFilters');
    styles.forEach(style => {
        const btn = createFilterButton(style, 'style');
        styleContainer.appendChild(btn);
    });
}

// Create filter button
function createFilterButton(label, type) {
    const btn = document.createElement('button');
    btn.className = 'filter-btn px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm hover:border-amber-600 hover:bg-amber-50 transition bg-white';
    btn.textContent = label;
    btn.dataset.type = type;
    btn.dataset.value = label;
    
    btn.addEventListener('click', () => {
        toggleFilter(type, label, btn);
    });
    
    return btn;
}

// Create color chip
function createColorChip(color) {
    const chip = document.createElement('button');
    chip.className = 'color-chip flex items-center gap-2 px-3.5 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm hover:border-amber-600 transition bg-white';
    
    const colorDot = document.createElement('span');
    colorDot.className = 'w-4 h-4 rounded-full inline-block border border-gray-200';
    
    if (color === 'Multicolor') {
        colorDot.style.background = 'linear-gradient(135deg, #EF4444, #F59E0B, #3B82F6)';
        colorDot.style.border = 'none';
    } else if (color === 'White') {
        colorDot.style.background = colorPalette[color];
        colorDot.style.border = '1.5px solid #D1D5DB';
    } else {
        colorDot.style.background = colorPalette[color];
        colorDot.style.border = 'none';
    }
    
    chip.appendChild(colorDot);
    chip.appendChild(document.createTextNode(color));
    chip.dataset.type = 'color';
    chip.dataset.value = color;
    
    chip.addEventListener('click', () => {
        toggleFilter('color', color, chip);
    });
    
    return chip;
}

// Toggle filter
function toggleFilter(type, value, button) {
    const filterKey = type === 'category' ? 'categories' : type === 'color' ? 'colors' : 'styles';
    
    if (activeFilters[filterKey].includes(value)) {
        // Remove filter
        activeFilters[filterKey] = activeFilters[filterKey].filter(v => v !== value);
        button.classList.remove('active', 'bg-amber-50', 'text-amber-900', 'border-amber-600');
        button.classList.add('border-gray-300', 'text-gray-700');
    } else {
        // Add filter
        activeFilters[filterKey].push(value);
        button.classList.add('active', 'bg-amber-50', 'text-amber-900', 'border-amber-600');
        button.classList.remove('border-gray-300', 'text-gray-700');
    }
    
    applyFilters();
    renderGallery();
    renderActiveFilterTags();
}

// Apply filters
function applyFilters() {
    filteredOutfits = allOutfits.filter(outfit => {
        // Category filter
        const categoryMatch = activeFilters.categories.length === 0 || 
                             activeFilters.categories.includes(outfit.category);
        
        // Color filter (outfit must have at least one selected color)
        const colorMatch = activeFilters.colors.length === 0 || 
                          activeFilters.colors.some(color => outfit.colors.includes(color));
        
        // Style filter
        const styleMatch = activeFilters.styles.length === 0 || 
                          activeFilters.styles.includes(outfit.style);
        
        return categoryMatch && colorMatch && styleMatch;
    });
    
    updateOutfitCount();
}

// Render gallery
function renderGallery() {
    const gallery = document.getElementById('gallery');
    const emptyState = document.getElementById('emptyState');
    
    gallery.innerHTML = '';
    
    if (filteredOutfits.length === 0) {
        gallery.style.display = 'none';
        emptyState.classList.remove('hidden');
        return;
    }
    
    gallery.style.display = 'grid';
    emptyState.classList.add('hidden');
    
    filteredOutfits.forEach((outfit, index) => {
        const card = createOutfitCard(outfit, index);
        gallery.appendChild(card);
    });
    
    // Initialize PhotoSwipe after rendering
    initPhotoSwipe();
}

// Create outfit card
function createOutfitCard(outfit, index) {
    const card = document.createElement('div');
    card.className = 'outfit-card rounded-xl overflow-hidden border border-gray-200 fade-in';
    
    const imagePath = `./Outfits Owned by Sankalpa/${outfit.filename}`;
    
    card.innerHTML = `
        <a href="${imagePath}" 
           data-pswp-width="1200" 
           data-pswp-height="1600"
           target="_blank"
           class="block">
            <img src="${imagePath}" 
                 alt="${outfit.category}" 
                 class="outfit-img w-full"
                 loading="lazy">
        </a>
        <div class="p-3 bg-white">
            <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-semibold text-amber-700">${outfit.category}</span>
                <span class="text-xs text-gray-500 font-medium">${outfit.style}</span>
            </div>
            <div class="flex gap-1.5 flex-wrap">
                ${outfit.colors.map(color => `
                    <span class="w-3.5 h-3.5 rounded-full border border-gray-200" 
                          style="background: ${colorPalette[color] || '#CCC'}"
                          title="${color}"></span>
                `).join('')}
            </div>
        </div>
    `;
    
    return card;
}

// Initialize PhotoSwipe lightbox
function initPhotoSwipe() {
    if (typeof PhotoSwipeLightbox === 'undefined') return;
    
    const lightbox = new PhotoSwipeLightbox({
        gallery: '#gallery',
        children: 'a',
        pswpModule: PhotoSwipe,
        bgOpacity: 0.9,
        padding: { top: 50, bottom: 50, left: 50, right: 50 }
    });
    
    lightbox.init();
}

// Update outfit count
function updateOutfitCount() {
    const countElement = document.getElementById('outfitCount');
    if (activeFilters.categories.length === 0 && 
        activeFilters.colors.length === 0 && 
        activeFilters.styles.length === 0) {
        countElement.textContent = allOutfits.length;
    } else {
        countElement.textContent = `${filteredOutfits.length} / ${allOutfits.length}`;
    }
}

// Clear all filters
function clearAllFilters() {
    activeFilters = {
        categories: [],
        colors: [],
        styles: []
    };
    
    // Reset button styles
    document.querySelectorAll('.filter-btn, .color-chip').forEach(btn => {
        btn.classList.remove('active', 'bg-amber-50', 'text-amber-900', 'border-amber-600');
        btn.classList.add('border-gray-300', 'text-gray-700');
    });
    
    applyFilters();
    renderGallery();
    renderActiveFilterTags();
}

// Render active filter tags
function renderActiveFilterTags() {
    const container = document.getElementById('activeFilterTags');
    container.innerHTML = '';
    
    const allActiveFilters = [
        ...activeFilters.categories.map(v => ({ type: 'category', value: v })),
        ...activeFilters.colors.map(v => ({ type: 'color', value: v })),
        ...activeFilters.styles.map(v => ({ type: 'style', value: v }))
    ];
    
    if (allActiveFilters.length === 0) return;
    
    allActiveFilters.forEach(filter => {
        const tag = document.createElement('span');
        tag.className = 'inline-flex items-center gap-1.5 bg-amber-50 text-amber-900 px-3 py-1.5 rounded-lg text-sm font-medium border border-amber-200';
        
        // Add color dot for color filters
        if (filter.type === 'color') {
            const colorDot = document.createElement('span');
            colorDot.className = 'w-3 h-3 rounded-full';
            if (filter.value === 'Multicolor') {
                colorDot.style.background = 'linear-gradient(135deg, #EF4444, #F59E0B, #3B82F6)';
            } else if (filter.value === 'White') {
                colorDot.style.background = colorPalette[filter.value];
                colorDot.style.border = '1.5px solid #D1D5DB';
            } else {
                colorDot.style.background = colorPalette[filter.value];
            }
            tag.appendChild(colorDot);
        }
        
        const label = document.createElement('span');
        label.textContent = filter.value;
        tag.appendChild(label);
        
        // Add remove button
        const removeBtn = document.createElement('button');
        removeBtn.className = 'ml-1 hover:text-amber-950 transition';
        removeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
        removeBtn.onclick = (e) => {
            e.stopPropagation();
            removeFilter(filter.type, filter.value);
        };
        tag.appendChild(removeBtn);
        
        container.appendChild(tag);
    });
}

// Remove individual filter
function removeFilter(type, value) {
    const filterKey = type === 'category' ? 'categories' : type === 'color' ? 'colors' : 'styles';
    activeFilters[filterKey] = activeFilters[filterKey].filter(v => v !== value);
    
    // Update button state
    const selector = type === 'color' ? 
        `[data-color="${value}"]` : 
        type === 'category' ? 
        `[data-category="${value}"]` : 
        `[data-style="${value}"]`;
    
    const button = document.querySelector(selector);
    if (button) {
        button.classList.remove('active', 'bg-amber-50', 'text-amber-900', 'border-amber-600');
        button.classList.add('border-gray-300', 'text-gray-700');
    }
    
    applyFilters();
    renderGallery();
    renderActiveFilterTags();
}

// Surprise Me! functionality
function surpriseMe() {
    if (filteredOutfits.length === 0) {
        alert('No outfits match your current filters! Try clearing filters first.');
        return;
    }
    
    // Get recently worn outfits from localStorage
    const recentlyWorn = JSON.parse(localStorage.getItem('recentlyWorn') || '[]');
    
    // Filter out recently worn (last 5)
    const availableOutfits = filteredOutfits.filter(
        outfit => !recentlyWorn.includes(outfit.filename)
    );
    
    // If all filtered outfits were recently worn, use all filtered outfits
    const choicePool = availableOutfits.length > 0 ? availableOutfits : filteredOutfits;
    
    // Pick random outfit
    const randomOutfit = choicePool[Math.floor(Math.random() * choicePool.length)];
    
    // Update recently worn
    recentlyWorn.unshift(randomOutfit.filename);
    if (recentlyWorn.length > 5) recentlyWorn.pop();
    localStorage.setItem('recentlyWorn', JSON.stringify(recentlyWorn));
    
    // Show the outfit with animation
    showSurpriseOutfit(randomOutfit);
}

// Show surprise outfit in modal
function showSurpriseOutfit(outfit) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4';
    modal.style.overflow = 'auto';
    modal.style.cursor = 'pointer';
    
    const imagePath = `./Outfits Owned by Sankalpa/${outfit.filename}`;
    
    modal.innerHTML = `
        <div class="bg-white rounded-2xl shadow-2xl max-w-lg w-full my-8" style="animation: fadeIn 0.3s ease-out; cursor: default;" onclick="event.stopPropagation();">
            <div class="bg-gradient-to-r from-amber-600 to-orange-600 p-5 text-white">
                <div class="flex items-center gap-2 mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                    <h2 class="text-xl font-semibold">Your Perfect Outfit</h2>
                </div>
                <p class="text-amber-100 text-sm">Here's what I picked for you today</p>
            </div>
            <div class="p-5">
                <img src="${imagePath}" 
                     alt="${outfit.category}" 
                     class="w-full rounded-lg shadow-md mb-4"
                     style="max-height: 50vh; object-fit: contain;">
                <div class="space-y-3">
                    <div class="flex items-center justify-between py-2 border-b border-gray-100">
                        <span class="text-sm font-medium text-gray-500">Category</span>
                        <span class="text-base font-semibold text-gray-900">${outfit.category}</span>
                    </div>
                    <div class="flex items-center justify-between py-2 border-b border-gray-100">
                        <span class="text-sm font-medium text-gray-500">Style</span>
                        <span class="text-base font-semibold text-gray-900">${outfit.style}</span>
                    </div>
                    <div class="flex items-center justify-between py-2">
                        <span class="text-sm font-medium text-gray-500">Colors</span>
                        <div class="flex gap-1.5 items-center flex-wrap justify-end">
                            ${outfit.colors.map(color => `
                                <span class="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                                    <span class="w-2.5 h-2.5 rounded-full border border-gray-300" style="background: ${colorPalette[color]}"></span>
                                    ${color}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                </div>
                <button onclick="this.closest('.fixed').remove(); document.body.style.overflow = ''; document.body.style.position = '';" 
                        class="w-full mt-5 bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 rounded-lg font-semibold text-sm hover:shadow-lg transition">
                    Close
                </button>
            </div>
        </div>
    `;
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            document.body.style.overflow = '';
            document.body.style.position = '';
        }
    });
    
    // Prevent background scroll
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.appendChild(modal);
}

// Toggle filters
function toggleFilters() {
    const filtersSection = document.getElementById('filtersSection');
    const chevron = document.getElementById('filterChevron');
    
    if (filtersSection.classList.contains('filters-collapsed')) {
        filtersSection.classList.remove('filters-collapsed');
        filtersSection.classList.add('filters-expanded');
        chevron.style.transform = 'rotate(180deg)';
    } else {
        filtersSection.classList.remove('filters-expanded');
        filtersSection.classList.add('filters-collapsed');
        chevron.style.transform = 'rotate(0deg)';
    }
}

// Event listeners
function initializeEventListeners() {
    document.getElementById('surpriseMeBtn').addEventListener('click', surpriseMe);
    document.getElementById('clearFiltersBtn').addEventListener('click', clearAllFilters);
    document.getElementById('toggleFiltersBtn').addEventListener('click', toggleFilters);
}
