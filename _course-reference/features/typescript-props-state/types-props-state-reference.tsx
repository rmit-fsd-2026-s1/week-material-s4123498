// TYPESCRIPT + PROPS + STATE FAST REFERENCE
//
// USE THIS WHEN:
// - the task asks for functional components only
// - you need typed props
// - you need useState with an array
// - you need to pass data to a child component

import { useState } from "react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
};

type ProductCardProps = {
  product: Product;
  onToggleStock: (id: number) => void;
};

function ProductCard({ product, onToggleStock }: ProductCardProps) {
  return (
    <article className="rounded border p-4">
      <h2 className="font-bold">{product.name}</h2>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price}</p>
      <p>Status: {product.inStock ? "In stock" : "Out of stock"}</p>
      <button
        type="button"
        onClick={() => onToggleStock(product.id)}
        className="mt-3 rounded bg-blue-700 px-3 py-2 text-white"
      >
        Toggle stock
      </button>
    </article>
  );
}

export default function ProductsPageExample() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Notebook", category: "Stationery", price: 6, inStock: true },
    { id: 2, name: "Backpack", category: "Travel", price: 45, inStock: false },
  ]);

  function handleToggleStock(id: number) {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === id ? { ...product, inStock: !product.inStock } : product
      )
    );
  }

  return (
    <main className="space-y-4 p-6">
      <h1 className="text-2xl font-bold">Products</h1>

      <div className="grid gap-4 md:grid-cols-2">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onToggleStock={handleToggleStock}
          />
        ))}
      </div>
    </main>
  );
}

