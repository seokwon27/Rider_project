import Thumb from "./Thumb";
import { useQuery } from "@tanstack/react-query";
import { getFeed } from "../../api/feedApi";
import styled from "styled-components";
import RandomImg from "./RandomImg";
import RidingMap from "./RidingMap";

const Posting = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["feed"],
    queryFn: getFeed
  });

  if (isPending) return <div>로딩중입니다!</div>;
  if (isError) return <div>에러가 발생했습니다!</div>;

  return (
    <div>
      {data?.map((feed) => {
        return (
          <FeedContainder key={feed.id}>
            <ContentsContainer>
              <RandomImg />
              <RiderNameContainer>
                <RiderName>{feed.nickname}</RiderName>라이더 님
              </RiderNameContainer>
              <RidingRoad>종주점 : {feed.BICYCLE_PATH}</RidingRoad>
              <DetailContainer>
                <p>종주 일자 : {feed.created_time.split(" ")[0]}</p>
                <Thumb currentFeedId={feed.id} currentThumb={feed.thumb} thumbUser={feed.userId} />
              </DetailContainer>
            </ContentsContainer>
            <RidingMap id={feed.id} roadLine={feed.roadLine} />
          </FeedContainder>
        );
      })}
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
  height: 200px;
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
