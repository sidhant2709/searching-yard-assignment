import React, { useState, useEffect } from "react";
import axios from "axios";
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

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
}

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [womenResponse, maleResponse] = await Promise.all([
          axios.get<Product[]>(
            `https://fakestoreapi.com/products/category/women's%20clothing`
          ),
          axios.get<Product[]>(
            `https://fakestoreapi.com/products/category/men's%20clothing`
          ),
        ]);
        setProducts([...womenResponse.data, ...maleResponse.data]);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    const query = event.target.value.toLowerCase().trim();
    if (query.length > 0) {
      const matchingProducts = products.filter((product) =>
        product.title.toLowerCase().includes(query)
      );
      setSuggestions(matchingProducts.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setSuggestions([]);
  };

  const handleSuggestionClick = (product: Product) => {
    setSearchTerm(product.title);
    setSuggestions([]);
  };

  const handleSort = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSortBy(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortBy === "price-lowest") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-highest") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating-lowest") {
    filteredProducts.sort((a, b) => a.rating.rate - b.rating.rate);
  } else if (sortBy === "rating-highest") {
    filteredProducts.sort((a, b) => b.rating.rate - a.rating.rate);
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
              {suggestions.map((product) => (
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
