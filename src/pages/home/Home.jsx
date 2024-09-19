import { useState, useEffect } from "react";
import styled from "styled-components";
import Filter from "./Filter";
import { getFilterRoad } from "../../api/FilterRoadInformation";
import Search from "./Search";
import List from "./List";
import { Map } from "react-kakao-maps-sdk";

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
    <Container>
      <SearchFilterDiv>
        <Title>자전거 길 주변 공공 시설 검색</Title>
        <Search
          selectedButton={selectedButton}
          setFilterData={setFilterData}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <Title>라이딩 경로 근처 공공 시설</Title>
        <Filter
          setFilterData={setFilterData}
          selectedButton={selectedButton}
          setSelectedButton={setSelectedButton}
          searchValue={searchValue}
        />
        <List filterData={filterData} />
      </SearchFilterDiv>

      <MapContainer>
        <Map
          id="map"
          center={{
            lat: 33.450701,
            lng: 126.570667
          }}
          style={{
            width: "100%",
            height: "100%"
          }}
          level={3}
        />
      </MapContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  /* margin: 20px auto; */
  /* padding: 20px; */
`;

const Title = styled.div`
  color: #ffffff;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
  margin-top: 10px;
  text-align: left;
  width: 100%;
`;

const SearchFilterDiv = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  width: 23%;
  border-radius: 10px;
  background: linear-gradient(180deg, #667386 0%, #030303 100%);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const MapContainer = styled.div`
  width: 74%;
  height: 960px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export default Home;
