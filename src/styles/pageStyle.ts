import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const TitleText = styled.h2`
  font-size: 2rem;
`;

export const SearchBar = styled.input`
  width: 50%;
  padding: 10px;
  margin: 20px 0;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  box-shadow: 0px 0px 5px rgba(0, 0, 92, 0.8);

  &:focus {
    outline: none;
    border: 1px solid rgba(0, 0, 92, 0.8);
  }
  &::-webkit-search-cancel-button {
    display: none;
  }

  &::-ms-clear {
    display: none;
  }

  &::after {
    content: "×";
    position: absolute;
    top: 49%;
    right: 10px;
    transform: translateY(-50%);
    font-size: 24px;
    cursor: pointer;
    opacity: ${({ value }) => (value ? 1 : 0)};
    transition: opacity 0.2s ease-in-out;
    background: none;
    outline: none;
    border: none;
  }
`;

export const SearchField = styled.div`
  width: 100%;
  position: relative;
`;

export const ClearButton = styled.button`
  position: absolute;
  top: 49%;
  right: 27%;
  transform: translateY(-50%);
  font-size: 24px;
  cursor: pointer;
  opacity: ${({ value }) => (value ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;
  background: none;
  outline: none;
  border: none;

  &:hover {
    color: #0077ff;
  }
  &:focus {
    background: none;
    outline: none;
    border: none;
  }
`;

export const SuggestionsList = styled.ul`
  width: 48.2%;
  position: absolute;
  top: 26%;
  left: 25.9%;
  height: 200px;
  overflow-y: auto;
  padding: 0;
  margin: 0;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 92, 0.8);
  background-color: #fff;
  z-index: 1;
  transform: translateY(-50%);
  @media (height: 1080px) {
    top: 22.5%;
  }
`;

export const SuggestionsItem = styled.li`
  padding: 10px;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

export const FiltersContainer = styled.div`
  width: 50%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export const FiltersContainerInside = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
`;

export const FilterLabel = styled.label`
  display: flex;
  cursor: pointer;
  font-weight: 500;
  position: relative;
  overflow: hidden;
  margin-bottom: 0.375em;

  span {
    display: flex;
    align-items: center;
    padding: 0.375em 0.75em 0.375em 0.375em;
    border-radius: 99em;
    transition: 0.25s ease;
    &:hover {
      background-color: mix(#fff, #00005c, 84%);
    }
    &:before {
      display: flex;
      flex-shrink: 0;
      content: "";
      background-color: #fff;
      width: 1.5em;
      height: 1.5em;
      border-radius: 50%;
      margin-right: 0.375em;
      transition: 0.25s ease;
      box-shadow: inset 0 0 0 0.125em #00005c;
    }
  }
`;

export const FilterInput = styled.input`
  margin-right: 5px;
  cursor: pointer;

  position: absolute;
  left: -9999px;
  &:checked + span {
    background-color: mix(#fff, #00005c, 84%);
    &:before {
      box-shadow: inset 0 0 0 0.4375em #00005c;
    }
  }
`;

export const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  place-content: center;
  padding: 2rem;
  width: 80%;
  margin: auto;
  row-gap: 5rem;
  column-gap: 3rem;
`;

export const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  padding: 16px;
  box-shadow: 0px 0px 5px rgba(0, 0, 92, 0.6);
`;

export const ProductTitle = styled.h3`
  font-weight: 600;
  color: #00005c;
`;

export const ProductPrice = styled.p`
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 10px;
  color: #00005c;
`;

export const ProductRatings = styled.p`
  font-weight: bold;
  margin-bottom: 10px;
  color: #00005c;
`;

export const Ratings = styled.div`
  font-size: 30px;
  color: #fdcc0d;
`;

export const RatingInner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  white-space: nowrap;
  overflow: hidden;
  width: 0;
  &::before {
    content: "\f005 \f005 \f005 \f005 \f005";
    color: #f8ce0b;
  }
`;

export const RatingOuter = styled.div`
  display: inline-block;
  position: relative;
  font-family: FontAwesome;
  color: #fdcc0d;
  &::before {
    content: "\f006 \f006 \f006 \f006 \f006";
  }
`;

export const Figure = styled.figure`
  display: grid;
  border-radius: 1rem;
  overflow: hidden;
  cursor: pointer;
  margin: 16px;
  background-color: #fff;
  * {
    grid-area: 1/1;
    transition: 0.4s;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    aspect-ratio: 2/3;
  }
  figcaption {
    display: grid;
    align-items: end;
    color: red;
    font-size: 2.3rem;
    font-weight: bold;
    background: var(--c, #0006);
    clip-path: inset(0 var(--_i, 100%) 0 0);
    -webkit-mask: linear-gradient(#000 0 0), linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    -webkit-mask-clip: text, padding-box;
  }
  &:hover figcaption {
    --_i: 0%;
  }
  &:hover img {
    transform: scale(1.1);
  }
`;
