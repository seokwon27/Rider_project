import styled from "styled-components";
import { getFilterRoad, getSearchRoad } from "../../api/FilterRoadInformation";

const Filter = ({ setFilterData, selectedButton, setSelectedButton, searchValue }) => {
  const buttonsList = ["전체", "자전거길", "화장실", "공기주입기", "인증센터", "급수대"];

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
      {buttonsList.map((button) => (
        <FilterButton key={button} onClick={() => handleFilterButton(button)} $isSelected={selectedButton === button}>
          {button}
        </FilterButton>
      ))}
    </FilterDiv>
  );
};
const FilterButton = styled.button`
  background-color: transparent;
  color: ${({ $isSelected }) => ($isSelected ? "white" : "gray")};
  padding: 10px 20px;
  margin: 5px;
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
  background-color: transparent;
  border: none;
  display: flex;
  justify-content: space-between;
  border-radius: 0px 0px 10px 10px;
`;

export default Filter;
