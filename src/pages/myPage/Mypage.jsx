import styled from "styled-components";
import { useMyFeedsInfiniteQuery } from "../../queries/infiniteQueries";
import useMyPage from "./useMyPage";
import RideItem from "./RideItem";

const Mypage = () => {
  const { data: feeds, hasNextPage, fetchNextPage, isFetchingNextPage } = useMyFeedsInfiniteQuery();
  const { myFeedRef, confirmUpdate } = useMyPage(hasNextPage, isFetchingNextPage, fetchNextPage);

  return (
    <MyPageWrapper>
      <MyPageHeader>
        <MyPageHeaderP $rightBorder={true}>내 종주점 모아보기</MyPageHeaderP>
        <MyPageHeaderP onClick={confirmUpdate}>내 정보 수정</MyPageHeaderP>
      </MyPageHeader>
      <RideItemList>
        {feeds?.length ? (
          feeds.map((feed) => {
            return <RideItem key={feed.id} feed={feed} />;
          })
        ) : (
          <p>등록한 종주점이 없습니다!</p>
        )}
      </RideItemList>
      <FetchTrigger ref={myFeedRef} />
    </MyPageWrapper>
  );
};

export default Mypage;

const MyPageWrapper = styled.div`
  background-color: #121212;
  padding: 10px 0px 20px 0px;
  min-height: 100vh;
`;

const MyPageHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  margin: 10px 0px;
`;

const MyPageHeaderP = styled.p`
  border-right: ${({ $rightBorder }) => ($rightBorder ? "1px solid #ebebeb" : "none")};
  padding: 3px 20px;
  margin: 0px 5px;
  font-size: 30px;
  color: ${({ $rightBorder }) => ($rightBorder ? "white" : "#b8b8b8")};
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #313131;
  }
`;

const RideItemList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const FetchTrigger = styled.div`
  bottom: 0px;
  height: 50px;
`;
