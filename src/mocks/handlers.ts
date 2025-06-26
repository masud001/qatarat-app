import { http, HttpResponse } from "msw";

// Define categories
const categories = [
  { id: "1", name: "المساجد مكة", imageUrl: "/images/category/kaaba.png" },
  { id: "2", name: "مساجد مكة الأكثر", imageUrl: "/images/category/mosque.png" },
  { id: "3", name: "سقيا وإطعام الحرم", imageUrl: "/images/category/botoll.png" },
];

// Define product type
type Product = {
  id: string;
  categoryId: string;
  name: string;
  price: number;
  size: string;
  quantity: string;
  image: string;
  images: string[];
  description: string;
  keyFeatures: string[];
};

// Helper function to generate products for a category
const generateProducts = (categoryId: string, categoryName: string): Product[] => {
  const baseImage = "/images/product-image.png";
  const images = Array(6).fill(baseImage);
  const keyFeatures = [
    "100% natural spring water source",
    "Advanced multi-stage filtration",
    "BPA-free recyclable packaging",
    "Perfect pH balance (7.0-7.5)",
    "Convenient bulk packaging",
  ];

  return Array.from({ length: 10 }, (_, index) => ({
    id: `${categoryId}${index + 1}`,
    categoryId,
    name: `5 Cartons`,
    price: Math.floor(Math.random() * 100) + 20,
    size: `${Math.floor(Math.random() * 200) + 100} ml`,
    quantity: `${Math.floor(Math.random() * 50) + 1} bottles`,
    image: baseImage,
    images,
    description: `Description for ${categoryName} Product ${index + 1}.`,
    keyFeatures,
  }));
};

// Generate products for all categories
const products = categories.flatMap((category) => generateProducts(category.id, category.name));

// Define cart
const cart: { productId: string; quantity: number }[] = [];

// Handlers for mock API endpoints
export const handlers = [
  // Get product categories
  http.get("/api/categories", () => HttpResponse.json(categories)),

  // Get product list (optionally filtered by category)
  http.get("/api/products", ({ request }: { request: Request }) => {
    const url = new URL(request.url);
    const categoryId = url.searchParams.get("categoryId");
    const filteredProducts = categoryId
      ? products.filter((product) => product.categoryId === categoryId)
      : products;
    return HttpResponse.json(filteredProducts);
  }),

  // Get single product by ID
  http.get("/api/products/:id", ({ params }: { params: Record<string, string> }) => {
    const product = products.find((p) => p.id === params.id);
    if (!product) {
      return HttpResponse.json({ error: "Not found" }, { status: 404 });
    }
    return HttpResponse.json(product);
  }),

  // Add to cart or update cart
  http.post("/api/cart", async ({ request }: { request: Request }) => {
    const { productId, quantity } = await request.json();
    const existingIndex = cart.findIndex((item) => item.productId === productId);

    if (existingIndex !== -1) {
      if (quantity <= 0) {
        cart.splice(existingIndex, 1); // Remove product from cart
      } else {
        cart[existingIndex].quantity += quantity;
        if (cart[existingIndex].quantity <= 0) {
          cart.splice(existingIndex, 1);
        }
      }
    } else if (quantity > 0) {
      cart.push({ productId, quantity });
    }

    return HttpResponse.json({ success: true, cart });
  }),

  // Get cart
  http.get("/api/cart", () => HttpResponse.json(cart)),
];
