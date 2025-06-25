import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";
import AddToCartButton from "./AddToCartButton";
import { Swiper as SwiperType } from 'swiper';

interface SingleProductCardProps {
  product: {
    id: string;
    name: string;
    size: string;
    quantity: string;
    price: number;
    description: string;
    keyFeatures: string[];
    images: string[];
    image?: string;
  };
  isAdding: boolean;
  isSuccess: boolean;
  addedId: string | null;
  onAddToCart: (productId: string) => void;
}

const SingleProductCard: React.FC<SingleProductCardProps> = ({
  product,
  isAdding,
  isSuccess,
  addedId,
  onAddToCart,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = React.useState<SwiperType | null>(null);

  const images =
    product.images && product.images.length > 0
      ? product.images
      : product.image
      ? [product.image]
      : [];

  return (
    <div className="single-product-section w-full max-w-[712px] mx-auto bg-white flex flex-col md:flex-row gap-8">
      {/* Left: Product Image/Slider with Thumbs */}
      <div className="flex-1 flex flex-col items-center justify-center bg-(--product-card-bg) rounded-4xl">
        {images.length > 0 && (
          <>
            <Swiper
              modules={[Thumbs]}
              spaceBetween={10}
              slidesPerView={1}
              thumbs={{ swiper: thumbsSwiper }}
              className="w-[300px] h-[280px] mb-4"
            >
              {images.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <img
                    src={img}
                    alt={product.name}
                    className="w-full h-full object-contain rounded-2xl bg-white"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="relative w-60">
              <Swiper
                modules={[Thumbs]}
                onSwiper={(swiper) => setThumbsSwiper(swiper)}
                spaceBetween={10}
                slidesPerView={2}
                watchSlidesProgress
                className="w-[260px] h-[80px]"
              >
                {images.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <img
                      src={img}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-xl p-2 cursor-pointer bg-white"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </>
        )}
      </div>
      {/* Right: Product Details */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          {/* Product Name */}
          <h1 className="font-medium text-2xl leading-[28.8px] text-[#222222]">
            {product.name}
          </h1>
          {/* Size & Quantity */}
          <div className="flex items-center justify-start gap-2">
            <span className="text-xl font-normal text-[#616161]">
              {product.size}
            </span>
            <span className="w-1 h-1 rounded-full bg-(--product-details-color)"></span>
            <span className="text-xl font-normal text-[#616161]">
              {product.quantity}
            </span>
          </div>
          {/* Price */}
          <div className="flex fle-col text-center">
            <div className="flex items-center justify-center gap-1.5 flex-row">
              <img src="/images/price-icon.svg" alt="price icons" />
              <p className="text-[28px] font-medium leading-[33.6px] text-[#222222]">
                {product.price}
              </p>
            </div>
          </div>
        </div>
        {/* Add to Cart Button */}
        <div>
          <AddToCartButton
            productId={product.id}
            isAdding={isAdding}
            isSuccess={isSuccess}
            addedId={addedId}
            onAddToCart={onAddToCart}
            className="inline-block !w-auto !px-4 !py-2.5"
          />
        </div>
        {/* Description */}
        <div className="flex flex-col gap-3">
          <h5 className="font-medium text-[16px] text-[#222222] leading-[22.4px]">
            Product overview
          </h5>
          <p className="text-base text-[#616161] font-normal">
            {product.description}
          </p>
        </div>
        {/* Key Features */}
        <div className="flex flex-col gap-3">
          <h5 className="font-medium text-[16px] text-[#222222] leading-[22.4px]">
            Key Features
          </h5>
          {product.keyFeatures && (
            <ul className="list-disc pl-5">
              {product.keyFeatures.map((feature, idx) => (
                <li key={idx} className="text-base text-[#616161] font-normal">
                  {feature}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProductCard;