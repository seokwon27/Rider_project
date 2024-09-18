import { useState, useEffect } from "react";
import styled from "styled-components";
import Filter from "./Filter";
import { getFilterRoad } from "../../api/FilterRoadInformation";
import Search from "./Search";

const Home = () => {
  const [filterData, setFilterData] = useState([]);
  const [selectedButton, setSelectedButton] = useState("전체");
  const [searchValue, setSearchValue] = useState("");

  // console.log(filterData);

  useEffect(() => {
    const getAllRoadData = async () => {
      try {
        const response = await getFilterRoad("전체");
        setFilterData(response);
      } catch (error) {
        console.error(error);
      }
    };

    getAllRoadData();
  }, []);

  return (
    <>
      <SearchFilterDiv>
        <Search
          selectedButton={selectedButton}
          setFilterData={setFilterData}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <Filter
          setFilterData={setFilterData}
          selectedButton={selectedButton}
          setSelectedButton={setSelectedButton}
          searchValue={searchValue}
        />
      </SearchFilterDiv>

      {filterData.map((data, index) => (
        <div key={index}>{data.name ? data.name : data.BICYCLE_PATH}</div>
      ))}
    </>
  );
};

const SearchFilterDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 600px;
  align-items: center;
  width: 100%;
  margin: 20px auto;
  padding: 20px;
  border-radius: 10px;
  background: linear-gradient(180deg, #667386 0%, #030303 100%);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export default Home;
