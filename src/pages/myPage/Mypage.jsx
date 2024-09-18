import axios from "axios";
import styled from "styled-components";
import KakaoMap from "../../components/common/KakaoMap";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";

const Mypage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mockUserId = "내아이디는설하영";

  const testLogin = async () => {
    const response = await axios.post("https://moneyfulpublicpolicy.co.kr/login", {
      id: "test13312123",
      password: "test13312123"
    });
    localStorage.setItem("accessToken", response?.data?.accessToken);
    localStorage.setItem("userId", "내아이디는설하영");
  };

  const getFeedsByPageNum = async ({ queryKey, pageParam = 1 }) => {
    const userId = localStorage.getItem("userId");
    const [_, page] = queryKey;
    const pageToFetch = page ?? pageParam;
    const response = await axios.get(`http://localhost:4001/feed?_page=${pageToFetch}&_per_page=5&userId=${userId}`);
    return response.data;
  };

  const {
    data: feeds,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ["feeds"],
    queryFn: getFeedsByPageNum,
    getNextPageParam: (lastPage) => {
      if (lastPage.next !== null) {
        return lastPage.next;
      }
    },
    select: (data) => {
      return data.pages.map((pageData) => pageData.data).flat();
    }
  });

  const { ref } = useInView({
    threshold: 1,
    onChange: (inView) => {
      if (!inView || !hasNextPage || isFetchingNextPage) return;
      fetchNextPage();
    }
  });

  const confirmUpdate = () =>
    Swal.fire({
      icon: "warning",
      title: "닉네임 변경",
      input: "text",
      inputAttributes: {
        // TODO - 이전닉 변경필요
        placeholder: `이전 닉네임: dlwjsslrspdla`
      },
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "취소",
      showLoaderOnConfirm: true,
      customClass: {
        confirmButton: "confirm-button-class",
        cancelButton: "cancel-button-class",
        input: "input-field-class"
      },
      preConfirm: async (nickname) => {
        try {
          const response = await axios.patch(
            "https://moneyfulpublicpolicy.co.kr" + "/profile",
            { nickname },
            {
              headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
            }
          );
          if (!response.data.success) {
            return Swal.showValidationMessage(`
                ${JSON.stringify(await response.json())}
              `);
          }
        } catch (error) {
          if (error.status == 401) {
            // 로그인 만료 처리
            Swal.fire({
              icon: "error",
              title: `로그인 만료\n다시 로그인해주세요!`,
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              navigate("/login");
            });
            return Promise.reject(error);
          } else {
            Swal.fire({
              icon: "error",
              title: "서버 연결 실패",
              showConfirmButton: false,
              timer: 1500
            });
            return Promise.reject(error);
          }
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      console.log("confirm result :>> ", result);
      if (result.isConfirmed) {
        Swal.fire({
          title: `${result.value}으로\n변경되었습니다!`
        });
      }
    });

  const toggleFn = async ({ feedId, feedVisibility }) => {
    await axios.patch(`http://localhost:4001/feed/${feedId}`, { visibility: !feedVisibility });
  };

  const toggleVisibilityMuation = useMutation({
    mutationFn: toggleFn,
    onSuccess: () => queryClient.invalidateQueries(["feeds"]),
    onError: (error) => console.log("error :>> ", error)
  });

  const deleteFn = async ({ feedId }) => {
    await axios.delete(`http://localhost:4001/feed/${feedId}`);
  };

  const deleteItemMutaion = useMutation({
    mutationFn: deleteFn,
    onSuccess: () => queryClient.invalidateQueries(["feeds"]),
    onError: (error) => console.log("error :>> ", error)
  });

  return (
    <MyPageWrapper>
      <button onClick={testLogin}>로그인</button>
      <MyPageHeader>
        <MyPageHeaderP $rightBorder={true}>내 종주점 모아보기</MyPageHeaderP>
        <MyPageHeaderP onClick={confirmUpdate}>내 정보 수정</MyPageHeaderP>
      </MyPageHeader>
      <RideItemList>
        {feeds?.length ? (
          feeds.map((feed) => {
            return (
              <RideItem key={feed.id}>
                <RideItemTextWrap>
                  <RideItemTitle>{feed.BICYCLE_PATH}</RideItemTitle>
                  <RideItemDate>최종 종주 일자 : {feed.created_time.split(" ")[0]}</RideItemDate>
                  {mockUserId == feed.userId ? (
                    <RideItemButtonWrap>
                      <RideItemButton
                        onClick={() =>
                          toggleVisibilityMuation.mutate({ feedId: feed.id, feedVisibility: feed.visibility })
                        }
                        $isToggle={true}
                      >
                        {feed.visibility ? "비공개로 전환" : "공개로 전환"}
                      </RideItemButton>
                      <RideItemButton onClick={() => deleteItemMutaion.mutate({ feedId: feed.id })}>
                        삭제
                      </RideItemButton>
                    </RideItemButtonWrap>
                  ) : (
                    <></>
                  )}
                </RideItemTextWrap>
                <KakaoMap roadLine={feed.roadLine} />
              </RideItem>
            );
          })
        ) : (
          <p>등록한 종주점이 없습니다!</p>
        )}
      </RideItemList>
      <FetchTrigger ref={ref}>fetchTrigger</FetchTrigger>
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

const RideItem = styled.li`
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

const TestItem = styled.div`
  height: 300px;
  background-color: white;
`;

const FetchTrigger = styled.div`
  bottom: 0px;
  height: 50px;
  background-color: green;
`;
