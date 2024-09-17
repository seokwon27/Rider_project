import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import KakaoMap from "../../components/common/KakaoMap";
import { useQuery } from "@tanstack/react-query";

const Mypage = () => {
  const testLogin = async () => {
    const response = await axios.post("https://moneyfulpublicpolicy.co.kr/login", {
      id: "test13312123",
      password: "test13312123"
    });
    console.log("response?.data :>> ", response?.data?.accessToken);
    localStorage.setItem("accessToken", response?.data?.accessToken);
    localStorage.setItem("userId", "내아이디는설하영");
  };

  const getFeeds = async () => {
    const userId = localStorage.getItem("userId");
    const response = await axios.get(`http://localhost:4001/feed?userId=${userId}`);
    console.log("response.data :>> ", response.data);
    return response.data;
  };

  const {
    data: feeds,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["feeds"],
    queryFn: getFeeds
  });

  useEffect(() => {
    getFeeds();
  }, []);

  if (isLoading) return <>loading...</>;
  console.log("feeds[0] :>> ", feeds[0]);
  return (
    <div>
      <button onClick={testLogin}>로그인</button>
      <div>
        <p>내 종주점 모아보기</p>
        <p>내 정보 수정</p>
      </div>
      <RideItemList>
        <RideItem>
          <RideItemTextWrap>
            <RideItemTitle>황새울자전거길</RideItemTitle>
            <RideItemDate>최종 종주 일자 : 2024.09.17</RideItemDate>
            <RideItemButtonWrap>
              <RideItemButton>비공개</RideItemButton>
              <RideItemButton>삭제</RideItemButton>
            </RideItemButtonWrap>
          </RideItemTextWrap>
          <KakaoMap roadLine={feeds[0].roadLine} />
        </RideItem>
      </RideItemList>
    </div>
  );
};

export default Mypage;

const RideItemList = styled.ul``;

const RideItem = styled.li`
  border: 3px solid red;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 1000px;
  height: 300px;
`;

const RideItemTextWrap = styled.div`
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const RideItemTitle = styled.h3`
  font-size: 36px;
`;

const RideItemDate = styled.h4`
  font-size: 20px;
`;

const RideItemButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 5px;
`;

const RideItemButton = styled.button``;
