// useInsertFeed.js
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

function useInsertFeed() {
  const mockUserId = "내아이디는설하영";
  const mockNickname = "내이름은 설하영";

  function getKoreanTime() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  const checkFeed = async (polyline) => {
    const response = await axios.get(
      `${import.meta.env.VITE_FEED_URL}/feed?userId=${mockUserId}&ROAD_SN=${polyline.ROAD_SN}`
    );
    return response.data;
  };

  const insertFeed = async (polyline) => {
    const checkFeedData = await checkFeed(polyline);
    if (checkFeedData.length > 0) {
      throw new Error("이미 종주점을 찍었습니다.");
    }

    const response = await axios.post(`${import.meta.env.VITE_FEED_URL}/feed`, {
      userId: mockUserId,
      nickname: mockNickname,
      visibility: true,
      created_time: getKoreanTime(),
      BICYCLE_PATH: polyline.BICYCLE_PATH,
      ROAD_SN: polyline.ROAD_SN,
      thumb: 0,
      roadLine: polyline.roadLine
    });

    return response.data;
  };

  return useMutation({
    mutationFn: insertFeed,
    mutationKey: ["insertFeed"]
  });
}

export default useInsertFeed;
