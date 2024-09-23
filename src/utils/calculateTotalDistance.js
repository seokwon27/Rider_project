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

export default calculateTotalDistance;
