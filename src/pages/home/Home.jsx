import { useState, useEffect } from "react";
import styled from "styled-components";
import Filter from "./Filter";
import { getFilterRoad } from "../../api/FilterRoadInformation";
import Search from "./Search";
import List from "./List";
import { CustomOverlayMap, Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import useGeoLocation from "../../hooks/useGeoLocation";

const Home = () => {
  const [filterData, setFilterData] = useState([]);
  const [selectedButton, setSelectedButton] = useState("전체");
  const [searchValue, setSearchValue] = useState("");
  const [polyline, setPolyline] = useState({ roadLine: [] });
  const [totalDistance, setTotalDistance] = useState(0);
  // console.log(filterData);
  //현위치
  const location = useGeoLocation();
  console.log(location);

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

  useEffect(() => {
    console.log(polyline);
    if (polyline?.roadLine?.length > 0) {
      const haversineDistance = (coords1, coords2) => {
        const toRad = (value) => (value * Math.PI) / 180;
        const R = 6371; // 지구의 반경(km)
        const dLat = toRad(coords2.lat - coords1.lat);
        const dLng = toRad(coords2.lng - coords1.lng);

        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRad(coords1.lat)) * Math.cos(toRad(coords2.lat)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // 두 좌표 사이의 거리(km)
      };

      const calculateTotalDistance = (roadLine) => {
        let totalDistance = 0;
        for (let i = 0; i < roadLine.length - 1; i++) {
          const start = { lat: roadLine[i].LINE_XP, lng: roadLine[i].LINE_YP };
          const end = { lat: roadLine[i + 1].LINE_XP, lng: roadLine[i + 1].LINE_YP };
          totalDistance += haversineDistance(start, end);
        }
        return totalDistance.toFixed(2); // 총 거리(km)를 소수점 두 자리로 반환
      };

      const totalDistance = calculateTotalDistance(polyline.roadLine);
      setTotalDistance(totalDistance);
      console.log("총 거리:", totalDistance, "km");
    }
  }, [polyline]);

  return (
    <>
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
          <List filterData={filterData} setPolyline={setPolyline} />
        </SearchFilterDiv>

        <MapContainer>
          {polyline.roadLine.length === 0 ? (
            <Map id="map" center={location.center} style={{ width: "100%", height: "100%" }} level={3}>
              <MapMarker
                position={location.center}
                image={{
                  src: "/public/cyclist.png",
                  size: { width: 64, height: 69 },
                  options: { offset: { x: 27, y: 69 } }
                }}
              />
              <CustomOverlayMap position={location.center} yAnchor={1}>
                <CustomOverlay>
                  <span className="title">현재 위치</span>
                </CustomOverlay>
              </CustomOverlayMap>
            </Map>
          ) : (
            <Map
              id="map"
              center={{ lat: polyline.roadLine[0].LINE_XP, lng: polyline.roadLine[0].LINE_YP }}
              style={{ width: "100%", height: "100%" }}
              level={8}
            >
              <MapMarker
                position={location.center}
                image={{
                  src: "/public/cyclist.png",
                  size: { width: 64, height: 69 },
                  options: { offset: { x: 27, y: 69 } }
                }}
              />
              <CustomOverlayMap position={location.center} yAnchor={1}>
                <CustomOverlay>
                  <span className="title">현재 위치</span>
                </CustomOverlay>
              </CustomOverlayMap>
              <MapMarker
                position={{ lat: polyline.roadLine[0].LINE_XP, lng: polyline.roadLine[0].LINE_YP }}
                image={{
                  src: "/public/startImg.png",
                  size: { width: 64, height: 69 },
                  options: { offset: { x: 27, y: 69 } }
                }}
              />
              <CustomOverlayMap
                position={{
                  lat: polyline.roadLine[0].LINE_XP,
                  lng: polyline.roadLine[0].LINE_YP
                }}
                yAnchor={1}
              >
                <CustomOverlay>
                  <span className="title">{polyline.BICYCLE_PATH} &nbsp; 0km</span>
                </CustomOverlay>
              </CustomOverlayMap>
              <MapMarker
                position={{
                  lat: polyline.roadLine[polyline.roadLine.length - 1].LINE_XP,
                  lng: polyline.roadLine[polyline.roadLine.length - 1].LINE_YP
                }}
                image={{
                  src: "/public/finishImg.png",
                  size: { width: 64, height: 69 },
                  options: { offset: { x: 27, y: 69 } }
                }}
              />
              <CustomOverlayMap
                position={{
                  lat: polyline.roadLine[polyline.roadLine.length - 1].LINE_XP,
                  lng: polyline.roadLine[polyline.roadLine.length - 1].LINE_YP
                }}
                yAnchor={1}
              >
                <CustomOverlay>
                  <span className="title">
                    {polyline.BICYCLE_PATH} &nbsp;
                    {totalDistance}km
                  </span>
                </CustomOverlay>
              </CustomOverlayMap>
              <Polyline
                path={polyline.roadLine.map((point) => ({
                  lat: point.LINE_XP,
                  lng: point.LINE_YP
                }))}
                strokeWeight={5}
                strokeColor={"#ff0000"}
                strokeOpacity={0.7}
                strokeStyle={"solid"}
              />
            </Map>
          )}
        </MapContainer>
      </Container>
      <CurrentLocation>
        <CurrentLocationImg src="/public/currentLocation.png" alt="location" />
      </CurrentLocation>
    </>
  );
};

const CurrentLocationImg = styled.img`
  width: 50px;
  height: 50px;
`;
const CurrentLocation = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 1000;
`;

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

const CustomOverlay = styled.div`
  position: relative;
  bottom: 85px;
  border-radius: 6px;
  border: 1px solid #ccc;
  border-bottom: 2px solid #ddd;
  float: left;

  &:nth-of-type(n) {
    border: 0;
    box-shadow: 0px 1px 2px #888;
  }

  .title {
    display: block;
    text-align: center;
    color: #ffffff;
    background: #000000;
    margin-right: 35px;
    padding: 10px 15px;
    font-size: 14px;
    font-weight: bold;
  }

  &:after {
    content: "";
    position: absolute;
    margin-left: -12px;
    left: 50%;
    bottom: -12px;
    width: 22px;
    height: 12px;
    background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png");
  }
`;

export default Home;
