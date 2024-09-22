import styled from "styled-components";
import { getFilterRoad, getSearchRoad } from "../../api/FilterRoadInformation";
import { HOME_BUTTONS_LIST } from "../../constants/homeConstants";

const Filter = ({ setFilterData, selectedButton, setSelectedButton, searchValue }) => {
  const handleFilterButton = async (button) => {
    setSelectedButton(button);
    try {
      if (searchValue === "") {
        const response = await getFilterRoad(button);
        setFilterData(response);
      } else {
        const response = await getSearchRoad(searchValue, button);
        setFilterData(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FilterDiv>
      {HOME_BUTTONS_LIST.map((button) => (
        <FilterButton key={button} onClick={() => handleFilterButton(button)} $isSelected={selectedButton === button}>
          {button}
        </FilterButton>
      ))}
    </FilterDiv>
  );
};
const FilterButton = styled.button`
  width: 100%;
  height: 40px;
  /* margin-bottom: 10px; */
  background-color: transparent;
  color: ${({ $isSelected }) => ($isSelected ? "white" : "gray")};
  padding: 5px 5px;
  font-size: 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: gray;
    color: white;
  }
`;

const FilterDiv = styled.div`
  width: 100%;
  background-color: transparent;
  border: none;
  display: flex;
  justify-content: space-between;
  border-radius: 0px 0px 10px 10px;
`;

export default Filter;
