// Intermediate Drive Image Importer
const API_KEY = 'YOUR_API_KEY'
let selectedImages = new Set()
let allImages = []

function authenticate() {
  console.log('Authenticating...')
  enableControls()
}

function enableControls() {
  document.getElementById('searchInput').disabled = false
  document.getElementById('filterSelect').disabled = false
  document.getElementById('selectAllBtn').disabled = false
}

function loadImages() {
  console.log('Loading images...')
  // Simulate loading images
  allImages = [
    { id: '1', name: 'image1.jpg', mimeType: 'image/jpeg' },
    { id: '2', name: 'image2.png', mimeType: 'image/png' },
  ]
  displayImages(allImages)
}

function displayImages(images) {
  const imageGrid = document.getElementById('imageGrid')
  imageGrid.innerHTML = ''

  images.forEach((image) => {
    const card = document.createElement('div')
    card.className = 'image-card'
    card.innerHTML = `
      <div class="image-container">
        <img src="https://via.placeholder.com/200x150" alt="${image.name}">
        <div class="image-overlay">
          <input type="checkbox" class="image-checkbox" data-id="${image.id}">
          <span class="image-name">${image.name}</span>
        </div>
      </div>
    `
    imageGrid.appendChild(card)
  })
}

function handleImageSelection(event) {
  const imageId = event.target.dataset.id
  const isSelected = event.target.checked

  if (isSelected) {
    selectedImages.add(imageId)
  } else {
    selectedImages.delete(imageId)
  }

  updateImportButton()
}

function updateImportButton() {
  const importBtn = document.getElementById('importBtn')
  importBtn.disabled = selectedImages.size === 0
  importBtn.textContent = `Import Selected (${selectedImages.size})`
}

function filterImages() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase()
  const filterType = document.getElementById('filterSelect').value

  const filteredImages = allImages.filter((image) => {
    const matchesSearch = image.name.toLowerCase().includes(searchTerm)
    const matchesFilter = filterType === 'all' || image.mimeType.includes(filterType)
    return matchesSearch && matchesFilter
  })

  displayImages(filteredImages)
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('authBtn').addEventListener('click', authenticate)
  document.getElementById('searchInput').addEventListener('input', filterImages)
  document.getElementById('filterSelect').addEventListener('change', filterImages)

  // Add event listeners for checkboxes after they're created
  document.addEventListener('change', (e) => {
    if (e.target.classList.contains('image-checkbox')) {
      handleImageSelection(e)
    }
  })
})
