import React from "react";
import styled from "styled-components";
import KakaoMap from "../../components/common/KakaoMap";
import { useDeleteMyFeed, useToggleMyFeed } from "../../queries/mutaions";

const RideItem = ({ feed }) => {
  const { mutate: toggleMutate } = useToggleMyFeed();
  const { mutate: deleteMutate } = useDeleteMyFeed();

  return (
    <RideItemWrapper key={feed.id}>
      <RideItemTextWrap>
        <RideItemTitle>{feed.BICYCLE_PATH}</RideItemTitle>
        <RideItemDate>최종 종주 일자 : {feed.created_time.split(" ")[0]}</RideItemDate>
        <RideItemButtonWrap>
          <RideItemButton
            onClick={() => toggleMutate({ feedId: feed.id, feedVisibility: feed.visibility })}
            $isToggle={true}
          >
            {feed.visibility ? "비공개 전환" : "공개로 전환"}
          </RideItemButton>
          <RideItemButton onClick={() => deleteMutate({ feedId: feed.id })}>삭제</RideItemButton>
        </RideItemButtonWrap>
      </RideItemTextWrap>
      <KakaoMap roadLine={feed.roadLine} />
    </RideItemWrapper>
  );
};

export default RideItem;

const RideItemWrapper = styled.li`
  background-color: black;
  border-radius: 30px 0px 0px 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 50px;
  padding-left: 30px;
  height: 300px;
  color: white;
`;

const RideItemTextWrap = styled.div`
  padding: 40px 0px 30px 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 60px;
`;

const RideItemTitle = styled.h3`
  font-size: 36px;
  width: 400px;
`;

const RideItemDate = styled.h4`
  font-size: 20px;
  width: 400px;
  color: #d4d4d4;
`;

const RideItemButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 5px;
`;

const RideItemButton = styled.button`
  cursor: pointer;
  background-color: ${({ $isToggle }) => ($isToggle ? "#1b1b1b" : "white")};
  color: ${({ $isToggle }) => ($isToggle ? "white" : "black")};
  width: 100px;
  height: 40px;
  border-radius: 10px;
  border: none;
  &:hover {
    filter: brightness(0.8);
  }
`;
