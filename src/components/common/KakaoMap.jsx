import { useEffect, useRef } from "react";
import styled from "styled-components";

const { kakao } = window;

const KakaoMap = ({ roadLine }) => {
  const ref = useRef();
  useEffect(() => {
    const mapOptions = {
      center: new kakao.maps.LatLng(roadLine[0].LINE_XP, roadLine[0].LINE_YP),
      level: 3
    };
    const kakaoMap = new kakao.maps.Map(ref.current, mapOptions);
    const path = roadLine.map((point) => new kakao.maps.LatLng(point.LINE_XP, point.LINE_YP));
    const polyline = new kakao.maps.Polyline({
      path,
      strokeWeight: 5,
      strokeColor: "#f77b7b",
      strokeOpacity: 0.8,
      strokeStyle: "solid"
    });
    polyline.setMap(kakaoMap);
  }, [roadLine]);
  return <KakaoMapItem ref={ref}></KakaoMapItem>;
};

export default KakaoMap;

const KakaoMapItem = styled.div`
  width: 300px;
  height: 300px;
`;
