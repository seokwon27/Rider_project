import { Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";
import SearchPanel from "./SearchPanel";
import axios from "axios";

const Home = () => {
  return (
    <StSection>
      <SearchPanel />
      <Map center={{ lat: 33.5563, lng: 126.79581 }} style={{ width: "100%", height: "100vh" }}>
        {" "}
        <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
          <div style={{ color: "#000" }}>Hello World!</div>
        </MapMarker>
      </Map>
    </StSection>
  );
};

const StSection = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

export default Home;
