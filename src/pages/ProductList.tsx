import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCategoriesQuery, useGetProductsQuery } from "../store/slices/apiSlice";
import { useTranslation } from "react-i18next";
import NavigationButton from "../components/NavigationButton";
import PageTitle from "../components/PageTitle";
import GradientButton from "../components/GradientButton";
import Loading from "../components/Loading";
import Error from "../components/Error";
import ProductCard from "../components/ProductCard";
import PaginationControls from "../components/PaginationControls";

const PAGE_SIZE = 8;

const ProductList: React.FC = () => {
  const { categoryId } = useParams();
  const { data: categories } = useGetCategoriesQuery();
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetProductsQuery({ categoryId, page, pageSize: PAGE_SIZE });
  const { t } = useTranslation();

  // Find the category name based on categoryId
  const categoryName = categories?.find((cat) => cat.id === categoryId)?.name || t("Category");
  const total = data?.total || 0;
  const products = data?.products || [];
  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="min-h-screen flex flex-col items-center p-6 transition-colors duration-300 bg-(--background-color) text-(--text-color)">
      <HeaderSection categoryName={categoryName} />
      <SectionLabel title={t("Providing Water")} />
      {isLoading && <Loading />}
      {error && <Error message={t("Failed to load products.")} />}
      <ProductGrid products={products} />
      {totalPages > 1 && <PaginationControls page={page} setPage={setPage} totalPages={totalPages} />}
    </div>
  );
};

export default ProductList;

// Header Section Component
const HeaderSection: React.FC<{ categoryName: string }> = ({ categoryName }) => (
  <div className="w-full max-w-[712px] mx-auto pb-8">
    <div className="flex justify-between items-center gap-3">
      <NavigationButton className="!bg-(--theme-background-color) shrink-0" />
      <PageTitle title={categoryName} />
      <GradientButton text="SAR" icon="/images/currency-icon.svg" showDropdownIcon={true} />
    </div>
  </div>
);

// Section Label Component
const SectionLabel: React.FC<{ title: string }> = ({ title }) => (
  <div className="product-section flex justify-start max-w-[712px] w-full mx-auto mb-6 px-4 lg:px-0">
    <div className="text-center">
      <div className="py-2 px-4 bg-(--text-color) font-medium text-base inter leading-[22px] text-white rounded-xl">
        {title}
      </div>
    </div>
  </div>
);

// Product Grid Component
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: string;
  description: string;
}

const ProductGrid: React.FC<{ products?: Array<Product> }> = ({ products }) => (
  <div className="grid grid-cols-1 min-[450px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-[712px] mx-auto px-4 lg:px-0">
    {products?.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
);


