"use client";

import { useState } from "react";
import { Radio, RadioGroup, Field, Label, Checkbox } from "@headlessui/react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { useStore } from "@/store/useStore";
import { SubProduct } from "@/data/productData";

interface ProductPurchasePanelProps {
    product: SubProduct;
}

const sizes = ["6X6", "5X6", "4.5X6", "4X6"];
const colors = ["Black", "White", "Gray", "Blue"];



export default function ProductPurchasePanel({product,}: ProductPurchasePanelProps) {
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [agree, setAgree] = useState(false);
  const { addToCart, toggleWishlist } = useStore();

  
  

  return (
    <div className="w-full rounded-3xl bg-black/30 backdrop-blur-md p-6 sm:p-8 space-y-6 border border-white/10">
      {/* Title */}
      
          <div className="mb-10 max-w-3xl">
            <h1 className="text-xl lg:text-3xl font-normal">
              {product.name}
            </h1>      
          </div>

      {/* Price */}
      <div>
        <h2 className="tracking-tight">
          {product.price}
        </h2>

        <p className="mt-5 leading-7">
          {product.description}
          <span className="ml-2 text-sm font-normal">
            DIMENSIONS (4 × 6, 4.5 × 6, 5 × 6, 6 × 6)
          </span>
        </p>
      </div>

      <hr className="text-white/20"/>

      {/* Size Selector */}

      <Field>

        <Label className="mb-4 block text-base font-normal">
          Size :
          <span className="ml-2">
            {selectedSize}
          </span>
        </Label>

        <RadioGroup
          value={selectedSize}
          onChange={setSelectedSize}
          className="flex flex-wrap gap-4"
        >
          {sizes.map((size) => (
            <Radio
              key={size}
              value={size}
              className="
                group
                flex
                h-10
                w-20
                cursor-pointer
                items-center
                justify-center
                border-1
                border-gray-300/20
                text-md
                font-medium
                transition
                data-[checked]:border-black
                data-[checked]:border-2
                data-[checked]:bg-gray-100
                data-[checked]:text-gray-900
                hover:border-black
              "
            >
              {size}
            </Radio>
          ))}
        </RadioGroup>

      </Field>

      {/* color */}

      <Field>

        <Label className="mb-4 block font-normal">
          Color :
          <span className="ml-2">
            {selectedColor}
          </span>
        </Label>

        <RadioGroup
          value={selectedColor}
          onChange={setSelectedColor}
          className="flex gap-3"
        >

          {colors.map((color) => (

            <Radio
              key={color}
              value={color}
              className="group cursor-pointer"
            >

              <div
                className="
                h-8
                w-8
                rounded-full
                border-1
                border-gray-200/50
                data-[checked]:border-black
              "
                style={{
                  backgroundColor: color.toLowerCase(),
                }}
              />

            </Radio>

          ))}

        </RadioGroup>

</Field>

      {/* Quantity + Cart */}

      <div className="flex flex-col gap-4 lg:flex-row">

        <div className="flex h-16 w-32 items-center justify-between rounded-full border-1 border-gray-300/50 px-6">

          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="text-md"
          >
            −
          </button>

          <span className="text-md font-semibold">
            {quantity}
          </span>

          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="text-md"
          >
            +
          </button>

        </div>

        <button
          onClick={() =>
            addToCart(
              product,
              quantity,
              selectedSize,
              selectedColor
            )
          }
          className="
            flex-1
            rounded-full
            bg-gray-900
            py-3
            text-md
            font-semibold
            uppercase
            tracking-widest
            transition
            hover:bg-black
          "
        >
          Add To Cart
        </button>

      </div>

      {/* Terms */}

      <Field className="flex items-center gap-3">

        <Checkbox
          checked={agree}
          onChange={setAgree}
          className="
            group
            flex
            h-5
            w-5
            items-center
            justify-center
            rounded
            border
            border-gray-400
            bg-white
            data-[checked]:bg-black
          "
        >
          <span className="hidden group-data-[checked]:block text-xs">
            ✓
          </span>
        </Checkbox>

        <Label className="">
          I agree with the{" "}
          <a href="#" className="underline">
            terms and conditions
          </a>
        </Label>

      </Field>

      {/* Buy */}

      <button
        disabled={!agree}
        className="
          w-full
          rounded-full
          bg-gray-400
          py-3
          text-md
          font-semibold
          uppercase
          tracking-widest
          text-white
          transition
          disabled:cursor-not-allowed
          disabled:opacity-60
          enabled:hover:bg-gray-500
        "
      >
        Buy It Now
      </button>

      {/* Wishlist */}

      <div className="flex gap-10">

        <button
          onClick={() => toggleWishlist(product)}
          className="flex items-center gap-3"
        >

          <FavoriteBorderIcon fontSize="small" />

          <span>Add to Wishlist</span>

        </button>

        <button className="flex items-center gap-3 text-gray-700 hover:text-black">

          <CompareArrowsIcon fontSize="small" />

          <span>Compare</span>

        </button>

      </div>

      <hr className="text-white/20"/>

    </div>
  );
}