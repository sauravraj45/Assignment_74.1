import axios from "axios";

// SINGLE PRODUCT
export function getProductData(id) {
  return axios.get(`https://dummyjson.com/products/${id}`);
}

// ALL PRODUCTS
export function getProductList() {
  return axios.get(
    "https://dummyjson.com/products?limit=100"
  );
}

/* =========================
   FASHION
========================= */
export async function getFashionProducts() {

  const [
    shirts,
    shoes,
    dresses,
    bags,
    jewellery,
    tops,
    watches,
  ] = await Promise.all([

    axios.get(
      "https://dummyjson.com/products/category/mens-shirts"
    ),

    axios.get(
      "https://dummyjson.com/products/category/mens-shoes"
    ),

    axios.get(
      "https://dummyjson.com/products/category/womens-dresses"
    ),

    axios.get(
      "https://dummyjson.com/products/category/womens-bags"
    ),

    axios.get(
      "https://dummyjson.com/products/category/womens-jewellery"
    ),

    axios.get(
      "https://dummyjson.com/products/category/tops"
    ),

    axios.get(
      "https://dummyjson.com/products/category/womens-watches"
    ),
  ]);

  return {
    data: {
      products: [
        ...shirts.data.products,
        ...shoes.data.products,
        ...dresses.data.products,
        ...bags.data.products,
        ...jewellery.data.products,
        ...tops.data.products,
        ...watches.data.products,
      ],
    },
  };
}

/* =========================
   MOBILE
========================= */
export async function getMobileProducts() {

  const [
    smartphones,
    accessories,
    tablets,
  ] = await Promise.all([

    axios.get(
      "https://dummyjson.com/products/category/smartphones"
    ),

    axios.get(
      "https://dummyjson.com/products/category/mobile-accessories"
    ),

    axios.get(
      "https://dummyjson.com/products/category/tablets"
    ),
  ]);

  return {
    data: {
      products: [
        ...smartphones.data.products,
        ...accessories.data.products,
        ...tablets.data.products,
      ],
    },
  };
}

/* =========================
   BEAUTY
========================= */
export async function getBeautyProducts() {

  const [
    beauty,
    fragrances,
    skincare,
  ] = await Promise.all([

    axios.get(
      "https://dummyjson.com/products/category/beauty"
    ),

    axios.get(
      "https://dummyjson.com/products/category/fragrances"
    ),

    axios.get(
      "https://dummyjson.com/products/category/skin-care"
    ),
  ]);

  return {
    data: {
      products: [
        ...beauty.data.products,
        ...fragrances.data.products,
        ...skincare.data.products,
      ],
    },
  };
}

/* =========================
   ELECTRONICS
========================= */
export async function getElectronicsProducts() {

  const [
    laptops,
    mobiles,
    tablets,
    accessories,
  ] = await Promise.all([

    axios.get(
      "https://dummyjson.com/products/category/laptops"
    ),

    axios.get(
      "https://dummyjson.com/products/category/smartphones"
    ),

    axios.get(
      "https://dummyjson.com/products/category/tablets"
    ),

    axios.get(
      "https://dummyjson.com/products/category/mobile-accessories"
    ),
  ]);

  return {
    data: {
      products: [
        ...laptops.data.products,
        ...mobiles.data.products,
        ...tablets.data.products,
        ...accessories.data.products,
      ],
    },
  };
}

/* =========================
   HOME
========================= */
export async function getHomeProducts() {

  const [
    decoration,
    kitchen,
    groceries,
  ] = await Promise.all([

    axios.get(
      "https://dummyjson.com/products/category/home-decoration"
    ),

    axios.get(
      "https://dummyjson.com/products/category/kitchen-accessories"
    ),

    axios.get(
      "https://dummyjson.com/products/category/groceries"
    ),
  ]);

  return {
    data: {
      products: [
        ...decoration.data.products,
        ...kitchen.data.products,
        ...groceries.data.products,
      ],
    },
  };
}

/* =========================
   BOOKS
========================= */
export async function getBooksProducts() {

  const groceries = await axios.get(
    "https://dummyjson.com/products/category/groceries"
  );

  return {
    data: {
      products: [
        ...groceries.data.products,
      ],
    },
  };
}

/* =========================
   FURNITURE
========================= */
export async function getFurnitureProducts() {

  const [
    furniture,
    decoration,
  ] = await Promise.all([

    axios.get(
      "https://dummyjson.com/products/category/furniture"
    ),

    axios.get(
      "https://dummyjson.com/products/category/home-decoration"
    ),
  ]);

  return {
    data: {
      products: [
        ...furniture.data.products,
        ...decoration.data.products,
      ],
    },
  };
}

/* =========================
   WATCHES
========================= */
export async function getWatchProducts() {

  const [
    mens,
    womens,
  ] = await Promise.all([

    axios.get(
      "https://dummyjson.com/products/category/mens-watches"
    ),

    axios.get(
      "https://dummyjson.com/products/category/womens-watches"
    ),
  ]);

  return {
    data: {
      products: [
        ...mens.data.products,
        ...womens.data.products,
      ],
    },
  };
}

/* =========================
   GAMING
========================= */
export async function getGamingProducts() {

  const accessories = await axios.get(
    "https://dummyjson.com/products/category/mobile-accessories"
  );

  return {
    data: {
      products: [
        ...accessories.data.products,
      ],
    },
  };
}

/* =========================
   AUDIO
========================= */
export async function getAudioProducts() {

  const accessories = await axios.get(
    "https://dummyjson.com/products/category/mobile-accessories"
  );

  return {
    data: {
      products: [
        ...accessories.data.products,
      ],
    },
  };
}

/* =========================
   BIKES
========================= */
export async function getBikeProducts() {

  const bikes = await axios.get(
    "https://dummyjson.com/products/category/motorcycle"
  );

  return {
    data: {
      products: [
        ...bikes.data.products,
      ],
    },
  };
}

/* =========================
   SPORTS
========================= */
export async function getSportsProducts() {

  const sports = await axios.get(
    "https://dummyjson.com/products/category/sports-accessories"
  );

  return {
    data: {
      products: [
        ...sports.data.products,
      ],
    },
  };
}

