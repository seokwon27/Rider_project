import Thumb from "./Thumb";
import { useInfiniteQuery } from "@tanstack/react-query";
import styled from "styled-components";
import RandomImg from "./RandomImg";
import RidingMap from "./RidingMap";
import { useInView } from "react-intersection-observer";
import { getFeedPages } from "../../api/feedApi";

const Posting = () => {
  const {
    data: feeds,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ["feeds"],
    queryFn: getFeedPages,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length === 5 ? pages.length + 1 : undefined;
    },
    select: (data) => data.pages.flat()
  });

  const { ref } = useInView({
    // ref element가 0.5(절반)만큼 보이면 onChange 함수 실행
    threshold: 0.5,
    onChange: (inView) => {
      // 예외처리 (ref가 inView 안에 없거나, nextPage가 없거나, 다음페이지를 불러오는 중이거나)
      if (!inView || !hasNextPage || isFetchingNextPage) return;
      fetchNextPage();
    }
  });

  return (
    <div>
      {feeds?.length > 0 ? (
        feeds.map((feed) => {
          return (
            <FeedContainder key={feed.id}>
              <ContentsContainer>
                <RandomImg />
                <RiderNameContainer>
                  <RiderName>{feed.nickname}</RiderName>라이더 님
                </RiderNameContainer>
                <RidingRoad>종주점 : {feed.BICYCLE_PATH}</RidingRoad>
                <DetailContainer>
                  <p>종주 일자 : {feed.created_time}</p>
                  <Thumb currentFeedId={feed.id} currentThumb={feed.thumb} thumbUser={feed.userId} />
                </DetailContainer>
              </ContentsContainer>
              <RidingMap id={feed.id} roadLine={feed.roadLine} />
            </FeedContainder>
          );
        })
      ) : (
        <p>피드가 없습니다.</p>
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
  background-color: #000;
  color: #fff;
  width: 450px;
  height: 230px;
  position: relative;
  padding-left: 100px;
  margin-left: 80px;
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
