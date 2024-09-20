import { useEffect, useState } from "react";
import styled from "styled-components";

const RandomImg = () => {
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

  return (
    <>
      <Image src={RandomPic} alt="자전거 이미지" />
    </>
  );
};

export default RandomImg;

const Image = styled.img`
  width: 230px;
  height: 230px;
  border-radius: 50%;
  position: absolute;
  left: -120px;
`;
