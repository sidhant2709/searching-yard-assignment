import React from "react";
import {
  ProductList,
  ProductCard,
  Figure,
  ProductTitle,
  ProductPrice,
  Ratings,
  RatingOuter,
  RatingInner,
  ProductRatings,
} from "../styles/pageStyle";

import { Product } from "../App";

interface ProductGridProps {
  filteredProducts: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ filteredProducts }) => {
  return (
    <ProductList>
      {filteredProducts.map((product) => (
        <ProductCard key={product.id}>
          <Figure>
            <img src={product.image} alt={product.title} />
            <figcaption />
          </Figure>
          <ProductTitle>
            {product.title.split(" ").slice(0, 4).join(" ")}
          </ProductTitle>
          <div>
            <ProductPrice>₹ {product.price}</ProductPrice>
            <Ratings>
              <RatingOuter>
                <RatingInner
                  className="rating-inner"
                  style={{ width: `${(product.rating.rate / 5) * 100}%` }}
                ></RatingInner>
              </RatingOuter>
            </Ratings>
            <ProductRatings>{product.rating.rate}</ProductRatings>
          </div>
        </ProductCard>
      ))}
    </ProductList>
  );
};

export default ProductGrid;
