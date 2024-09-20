// useInsertFeed.js
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import useUserStore from "../store/useUserStore";
import { useEffect, useState } from "react";

function useInsertFeed() {
  const user = useUserStore((state) => state.user);

  const [RandomPic, setRandomPic] = useState();

  const imgArray = [
    "https://cdn.bicyclelife.net/news/photo/201808/1520_9796_3830.jpg",
    "https://3.bp.blogspot.com/-7tHUUjFbJ_Y/WzXbKrtGvFI/AAAAAAAAbK8/drCISn46xuABd1P_G-9Yvj1C2yrFdp-FQCLcBGAs/s640/cap_1025.jpg",
    "https://mtb.shimano.com/_assets/images/stories/three-tips-to-improve-your-mountain-biking-skills/three-tips-image-1.jpg",
    "https://cdn0000.airklass.com/classes/6368/headline/7d0e6992-bd20-4b80-9201-20d68b3132c1.png",
    "http://fpost.co.kr/board/data/editor/1904/0a27b8cea89d6154682b1eeda64e67ec_1555290235_6352.jpg",
    "https://cdn.travie.com/news/photo/202007/21529_8243_2241.jpg"
  ];

  useEffect(() => {
    window.onload = showImg(RandomPic);
  }, []);

  const showImg = () => {
    const imgNum = Math.round(Math.random() * 4);
    setRandomPic(imgArray[imgNum]);
  };

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
      `${import.meta.env.VITE_FEED_URL}/feed?userId=${user.userId}&ROAD_SN=${polyline.ROAD_SN}`
    );
    return response.data;
  };

  const insertFeed = async (polyline) => {
    const checkFeedData = await checkFeed(polyline);
    if (checkFeedData.length > 0) {
      throw new Error("이미 종주점을 찍었습니다.");
    }

    const response = await axios.post(`${import.meta.env.VITE_FEED_URL}/feed`, {
      userId: user.userId,
      nickname: user.nickname,
      profile_img: RandomPic,
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
