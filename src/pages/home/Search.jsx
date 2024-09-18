import styled from "styled-components";
import { getSearchRoad } from "../../api/FilterRoadInformation";

const Search = ({ selectedButton, setFilterData, searchValue, setSearchValue }) => {
  const handleSearch = async (e) => {
    e.preventDefault();
    console.log(searchValue);
    const response = await getSearchRoad(searchValue, selectedButton);
    console.log(response);
    setFilterData(response);
  };

  return (
    <SearchDiv>
      <form onSubmit={handleSearch}>
        <SearchInput
          type="text"
          placeholder="ex) 한강종주자전거길 또는 한강"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <SearchButton type="submit">검색</SearchButton>
      </form>
    </SearchDiv>
  );
};

const SearchDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 500px;
  width: 100%;
`;

const SearchInput = styled.input`
  flex: 2;
  width: 250px;
  background-color: #000000;
  color: white;
  padding: 15px 20px;
  font-size: 18px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
`;

const SearchButton = styled.button`
  flex: 1;
  padding: 15px 20px;
  background-color: #000000;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #00000040;
    color: white;
  }
`;
export default Search;
