import Thumb from "./Thumb";
import styled from "styled-components";
import RidingMap from "./RidingMap";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import ModalMap from "./ModalMap";
import { useAllFeedsInfiniteQuery } from "../../queries/infiniteQueries";

const Posting = () => {
  const { kakao } = window;
  const [selectedPost, setSelectedPost] = useState();
  const { data: feeds, hasNextPage, fetchNextPage, isFetchingNextPage } = useAllFeedsInfiniteQuery();

  const { ref } = useInView({
    // ref element가 0.5(절반)만큼 보이면 onChange 함수 실행
    threshold: 0.5,
    onChange: (inView) => {
      // 예외처리 (ref가 inView 안에 없거나, nextPage가 없거나, 다음페이지를 불러오는 중이거나)
      if (!inView || !hasNextPage || isFetchingNextPage) return;
      fetchNextPage();
    }
  });

  // 지도 생성 함수
  const showMap = (id, roadLine) => {
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
      draggable: selectedPost ? true : false
    };

    const map = new kakao.maps.Map(container, options);

    const linePath = [];
    roadLine.forEach((el) => linePath.push(new kakao.maps.LatLng(el.LINE_XP, el.LINE_YP)));

    const polyline = new kakao.maps.Polyline({
      path: linePath,
      strokeWeight: 5,
      strokeColor: "#FF54F1",
      strokeOpacity: 0.7,
      strokeStyle: "solid"
    });

    polyline.setMap(map);
  };

  return (
    <div>
      {feeds?.length > 0 ? (
        feeds.map((feed) => {
          return (
            <FeedContainder key={feed.id}>
              <ContentsContainer
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0,0,0,0.65)), url(${feed.profile_img})`
                }}
              >
                <Profile src={feed.profile_img} alt="profile_img" />
                <RiderNameContainer>
                  <RiderName>{feed.nickname}</RiderName>라이더 님
                </RiderNameContainer>
                <RidingRoad>종주점 : {feed.BICYCLE_PATH}</RidingRoad>
                <DetailContainer>
                  <p>종주 일자 : {feed.created_time}</p>
                  <Thumb currentFeedId={feed.id} currentThumb={feed.thumb} thumbUser={feed.userId} />
                </DetailContainer>
              </ContentsContainer>
              <RidingMap setSelectedPost={setSelectedPost} showMap={showMap} id={feed.id} roadLine={feed.roadLine} />
            </FeedContainder>
          );
        })
      ) : (
        <p>피드가 없습니다.</p>
      )}
      {selectedPost && (
        <ModalMap
          setSelectedPost={setSelectedPost}
          showMap={showMap}
          id={selectedPost.id}
          roadLine={selectedPost.roadLine}
        />
      )}
      <div ref={ref} />
    </div>
  );
};

export default Posting;

const FeedContainder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px auto 20px auto;
`;

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  width: 450px;
  height: 230px;
  position: relative;
  padding-left: 100px;
  margin-left: 80px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const DetailContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 50px 30px 30px 0;
`;

const RiderNameContainer = styled.h1`
  display: flex;
  font-size: 30px;
  padding: 40px 0 20px 40px;
`;

const RiderName = styled.p`
  font-weight: bold;
  margin-right: 8px;
`;

const RidingRoad = styled.p`
  font-size: 20px;
  padding-left: 40px;
`;

const Profile = styled.img`
  width: 230px;
  height: 230px;
  border-radius: 50%;
  position: absolute;
  left: -120px;
`;
