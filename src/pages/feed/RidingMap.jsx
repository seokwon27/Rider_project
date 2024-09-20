import { useEffect } from "react";

const { kakao } = window;

const RidingMap = ({ id, roadLine }) => {
  useEffect(() => {
    const container = document.getElementById(id);
    const options = {
      center: new kakao.maps.LatLng(
        roadLine[Math.floor(roadLine.length / 2)].LINE_XP,
        roadLine[Math.floor(roadLine.length / 2)].LINE_YP
      ),
      level:
        (roadLine.length <= 100 && 8) ||
        (roadLine.length <= 500 && 9) ||
        (roadLine.length >= 1000 && 11) ||
        (roadLine.length >= 3000 && 12),
      draggable: false
    };

    const map = new kakao.maps.Map(container, options);

    const linePath = [];
    roadLine.forEach((el) => linePath.push(new kakao.maps.LatLng(el.LINE_XP, el.LINE_YP)));

    const polyline = new kakao.maps.Polyline({
      path: linePath,
      strokeWeight: 5,
      strokeColor: "#ff3700",
      strokeOpacity: 0.7,
      strokeStyle: "solid"
    });

    polyline.setMap(map);
  }, []);

  return <div id={id} style={{ width: "300px", height: "230px" }}></div>;
};

export default RidingMap;
