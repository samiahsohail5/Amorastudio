import { useState, useEffect } from 'react';
import { Product } from '../types';
import { products as initialProducts } from '../data/products';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('amora_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  useEffect(() => {
    localStorage.setItem('amora_products', JSON.stringify(products));
  }, [products]);

  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const getProduct = (id: string) => {
    return products.find((p) => p.id === id);
  };

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
  };
}
