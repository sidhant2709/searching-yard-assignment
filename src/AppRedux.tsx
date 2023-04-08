import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "@reduxjs/toolkit";
import "./App.css";
import {
  Container,
  TitleText,
  SearchField,
  ClearButton,
  SearchBar,
  SuggestionsList,
  SuggestionsItem,
  FiltersContainer,
  FiltersContainerInside,
  FilterLabel,
  FilterInput,
} from "./styles/pageStyle";
import Loader from "./components/Loader";
import ProductGrid from "./components/ProductGrid";
import { RootState } from "./store/store";
import {
  fetchProducts,
  setFilterTerm,
  setSuggestions,
  clearSuggestions,
  setSortBy,
} from "./store/productSlice";

import { Product } from "./types/types";

const App = () => {
  const dispatch: ThunkDispatch<RootState, void, AnyAction> = useDispatch();
  const { products, searchTerm, suggestions, sortBy, isLoading } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase().trim();
    dispatch(setFilterTerm(query));
    if (query.length > 0) {
      const matchingProducts = products.filter((product: any) =>
        product.title.toLowerCase().includes(query)
      );
      dispatch(setSuggestions(matchingProducts.slice(0, 5)));
    } else {
      dispatch(clearSuggestions());
    }
  };

  const handleClearSearch = () => {
    dispatch(setFilterTerm(""));
    dispatch(clearSuggestions());
  };

  const handleSuggestionClick = (product: Product) => {
    dispatch(setFilterTerm(product.title));
    dispatch(clearSuggestions());
  };

  const handleSort = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    dispatch(setSortBy(event.target.value));
  };

  const filteredProducts = products.filter((product: any) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortBy === "price-lowest") {
    filteredProducts.sort(
      (a: { price: number }, b: { price: number }) => a.price - b.price
    );
  } else if (sortBy === "price-highest") {
    filteredProducts.sort(
      (a: { price: number }, b: { price: number }) => b.price - a.price
    );
  } else if (sortBy === "rating-lowest") {
    filteredProducts.sort(
      (a: { rating: { rate: number } }, b: { rating: { rate: number } }) =>
        a.rating.rate - b.rating.rate
    );
  } else if (sortBy === "rating-highest") {
    filteredProducts.sort(
      (a: { rating: { rate: number } }, b: { rating: { rate: number } }) =>
        b.rating.rate - a.rating.rate
    );
  }

  return (
    <Container>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <TitleText>Searching Yard Assignment</TitleText>
          <SearchField>
            <SearchBar
              type="text"
              placeholder="Search by name"
              onChange={handleSearch}
              value={searchTerm}
            />
            <ClearButton value={searchTerm} onClick={handleClearSearch}>
              &#x2715;
            </ClearButton>
          </SearchField>

          {suggestions.length > 0 && (
            <SuggestionsList>
              {suggestions.map((product: any) => (
                <SuggestionsItem
                  key={product.id}
                  onClick={() => handleSuggestionClick(product)}
                >
                  {product.title}
                </SuggestionsItem>
              ))}
            </SuggestionsList>
          )}

          <FiltersContainer>
            <FiltersContainerInside>
              <FilterLabel>
                <FilterInput
                  type="radio"
                  name="sort"
                  value="price-lowest"
                  checked={sortBy === "price-lowest"}
                  onChange={handleSort}
                />
                <span>Price: Lowest to Highest</span>
              </FilterLabel>
              <FilterLabel>
                <FilterInput
                  type="radio"
                  name="sort"
                  value="price-highest"
                  checked={sortBy === "price-highest"}
                  onChange={handleSort}
                />
                <span>Price: Highest to Lowest</span>
              </FilterLabel>
            </FiltersContainerInside>
            <FiltersContainerInside>
              <FilterLabel>
                <FilterInput
                  type="radio"
                  name="sort"
                  value="rating-lowest"
                  checked={sortBy === "rating-lowest"}
                  onChange={handleSort}
                />
                <span>Rating: Lowest to Highest</span>
              </FilterLabel>
              <FilterLabel>
                <FilterInput
                  type="radio"
                  name="sort"
                  value="rating-highest"
                  checked={sortBy === "rating-highest"}
                  onChange={handleSort}
                />
                <span>Rating: Highest to Lowest</span>
              </FilterLabel>
            </FiltersContainerInside>
          </FiltersContainer>
          <ProductGrid filteredProducts={filteredProducts} />
        </>
      )}
    </Container>
  );
};

export default App;
