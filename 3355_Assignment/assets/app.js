fetch('data/products.json')
  .then(response => response.json())
  .then(products => {
    const productList = document.getElementById('product-list');
    
    products.forEach(product => {
      const productElement = document.createElement('div');
      productElement.classList.add('product');
      productElement.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>${product.price} TL</p>
        <button onclick="viewDetails(${product.id})">Detaylar</button>
      `;
      productList.appendChild(productElement);
    });
  })
  .catch(error => console.error('Ürünler yüklenemedi:', error));

function viewDetails(productId) {
  window.location.href = `detail.html?id=${productId}`;
}

function loadProductDetail() {
  const productId = new URLSearchParams(window.location.search).get('id');
  fetch('data/products.json')
    .then(response => response.json())
    .then(products => {
      const product = products.find(p => p.id == productId);
      if (product) {
        const productDetail = document.getElementById('product-detail');
        productDetail.innerHTML = `
          <img src="${product.image}" alt="${product.name}" />
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <p><strong>Fiyat:</strong> ${product.price} TL</p>
          <p><strong>Kategori:</strong> ${product.category}</p>
          <h4>Özellikler:</h4>
          <ul>
            ${product.features.map(feature => `<li>${feature}</li>`).join('')}
          </ul>
          <h4>Yorumlar:</h4>
          <ul>
            ${product.reviews.map(review => `
              <li>
                <strong>${review.user}</strong>: ${review.comment} <br />
                <strong>Rating:</strong> ${review.rating} ⭐
              </li>
            `).join('')}
          </ul>
        `;
      }
    })
    .catch(error => console.error('Ürün detayları yüklenemedi:', error));
}

function searchProducts() {
  const searchQuery = document.getElementById('search-input').value.toLowerCase();
  const products = document.getElementsByClassName('product');

  for (let product of products) {
    const productName = product.getElementsByTagName('h3')[0].innerText.toLowerCase();
    
    if (productName.includes(searchQuery)) {
      product.style.display = '';
    } else {
      product.style.display = 'none';
    }
  }
}

if (window.location.pathname.includes('detail.html')) {
  loadProductDetail();
}
