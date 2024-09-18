import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import Pagination from "./Pagination";

const List = () => {
  const [db2, setDb2] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_ITEMS = 10;
  const PAGE_GROUP = 5;

  //json-server 데이터 저장
  const getNameData = async () => {
    const roadNames = await axios.get("http://localhost:4002/bicycle_road");
    const amenityNames = await axios.get("http://localhost:4002/amenities");
    const data = [...roadNames.data, ...amenityNames.data];
    setDb2(data);
  };

  useEffect(() => {
    getNameData();
  }, []);

  const indexOfLastItem = currentPage * PAGE_ITEMS;
  const indexOfFirstItem = indexOfLastItem - PAGE_ITEMS;
  const currentItems = db2.slice(indexOfFirstItem, indexOfLastItem);

  console.log("currentItems : ", currentItems);

  const getRoadPath = async (data) => {
    let result;
    const bicycle_road = await axios.get("http://localhost:4000/bicycle_road");
    const amenities = await axios.get("http://localhost:4000/amenities");
    data.ROAD_SN
      ? (result = bicycle_road.data.find((el) => el.ROAD_SN === data.ROAD_SN))
      : (result = amenities.data.find((el) => el.id === data.id));
    console.log(result);
    return result;
  };

  return (
    <>
      <CardList>
        {currentItems.map((data) => {
          return (
            <Card
              key={data.id}
              onClick={() => {
                getRoadPath(data);
              }}
            >
              {data.name ? (
                <>
                  <CardText>
                    <CardTitle>{data.Classification}</CardTitle>
                    <CardRoad>{data.name}</CardRoad>
                  </CardText>
                </>
              ) : (
                <>
                  <CardText>
                    <CardTitle>{data.BICYCLE_PATH}</CardTitle>
                    <CardRoad>{data.Classification}</CardRoad>
                  </CardText>
                </>
              )}
            </Card>
          );
        })}
      </CardList>
      <Pagination
        totalItems={db2.length} // 전체 아이템 수
        currentPage={currentPage} // 현재 페이지
        setCurrentPage={setCurrentPage} // 페이지 변경 함수
        PAGE_ITEMS={PAGE_ITEMS} // 페이지당 항목 수
        PAGE_GROUP={PAGE_GROUP} // 한 번에 보여줄 페이지 수
      />
    </>
  );
};

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #242424;
`;

const Card = styled.div`
  display: flex;
  flex-direction: row;
  margin: 5px;
  padding: 10px;
  background-color: #000000;
  color: white;
  align-items: center;
  border-radius: 10px;
`;

const CardText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const CardTitle = styled.p`
  font-size: 18px;
  font-weight: 600;
`;

const CardRoad = styled.p`
  color: #bcbcbc;
`;

export default List;
