const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

// Products Array (Copy from provided gist)
let products = [
  {
    id: 1,
    name: 'iPhone 13',
    brand: 'Apple',
    price: 100000,
    ram: 8,
    rom: 128,
    rating: 4.7,
    os: 'iOS',
  },
  {
    id: 2,
    name: 'Galaxy S21',
    brand: 'Samsung',
    price: 60000,
    ram: 6,
    rom: 256,
    rating: 4.5,
    os: 'Android',
  },
  {
    id: 3,
    name: 'OnePlus 9',
    brand: 'OnePlus',
    price: 50000,
    ram: 12,
    rom: 128,
    rating: 4.6,
    os: 'Android',
  },
  // Add more products from the gist
];

// Sorting Functions
const sortByRatingHighToLow = (a, b) => b.rating - a.rating;
const sortByPriceHighToLow = (a, b) => b.price - a.price;
const sortByPriceLowToHigh = (a, b) => a.price - b.price;

// Filtering Functions
const filterByRam = (ram) =>
  products.filter((product) => product.ram === parseInt(ram));
const filterByRom = (rom) =>
  products.filter((product) => product.rom === parseInt(rom));
const filterByBrand = (brand) =>
  products.filter(
    (product) => product.brand.toLowerCase() === brand.toLowerCase()
  );
const filterByOs = (os) =>
  products.filter((product) => product.os.toLowerCase() === os.toLowerCase());
const filterByPrice = (price) =>
  products.filter((product) => product.price <= parseInt(price));

// API Endpoints

// Endpoint 1: Get products sorted by popularity
app.get('/products/sort/popularity', (req, res) => {
  const sortedProducts = products.slice().sort(sortByRatingHighToLow);
  res.json({ products: sortedProducts });
});

// Endpoint 2: Get products sorted by price high-to-low
app.get('/products/sort/price-high-to-low', (req, res) => {
  const sortedProducts = products.slice().sort(sortByPriceHighToLow);
  res.json({ products: sortedProducts });
});

// Endpoint 3: Get products sorted by price low-to-high
app.get('/products/sort/price-low-to-high', (req, res) => {
  const sortedProducts = products.slice().sort(sortByPriceLowToHigh);
  res.json({ products: sortedProducts });
});

// Endpoint 4: Filter products by RAM
app.get('/products/filter/ram', (req, res) => {
  const ram = req.query.ram;
  const filteredProducts = filterByRam(ram);
  res.json({ products: filteredProducts });
});

// Endpoint 5: Filter products by ROM
app.get('/products/filter/rom', (req, res) => {
  const rom = req.query.rom;
  const filteredProducts = filterByRom(rom);
  res.json({ products: filteredProducts });
});

// Endpoint 6: Filter products by Brand
app.get('/products/filter/brand', (req, res) => {
  const brand = req.query.brand;
  const filteredProducts = filterByBrand(brand);
  res.json({ products: filteredProducts });
});

// Endpoint 7: Filter products by OS
app.get('/products/filter/os', (req, res) => {
  const os = req.query.os;
  const filteredProducts = filterByOs(os);
  res.json({ products: filteredProducts });
});

// Endpoint 8: Filter products by Price
app.get('/products/filter/price', (req, res) => {
  const price = req.query.price;
  const filteredProducts = filterByPrice(price);
  res.json({ products: filteredProducts });
});

// Endpoint 9: Send original array of products
app.get('/products', (req, res) => {
  res.json({ products });
});

// Start the server
app.listen(port, () => {
  console.log(`FlipDeal backend is running on http://localhost:${port}`);
});
