import styled from "styled-components";

const Pagination = ({ totalItems, currentPage, setCurrentPage, PAGE_ITEMS, PAGE_GROUP }) => {
  //총페이지
  const totalPages = Math.ceil(totalItems / PAGE_ITEMS);

  // 페이지 그룹 계산
  const currentGroup = Math.ceil(currentPage / PAGE_GROUP); // 현재 그룹
  const startPage = (currentGroup - 1) * PAGE_GROUP + 1; // 해당 그룹의 첫 페이지
  const endPage = Math.min(startPage + PAGE_GROUP - 1, totalPages); // 해당 그룹의 마지막 페이지

  const handlePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 이전 그룹으로 이동
  const handlePrevGroup = () => {
    if (startPage > 1) {
      setCurrentPage(startPage - 1);
    }
  };

  // 다음 그룹으로 이동
  const handleNextGroup = () => {
    if (endPage < totalPages) {
      setCurrentPage(endPage + 1);
    }
  };

  return (
    <Paging>
      <button onClick={handlePrevGroup} disabled={startPage === 1}>
        이전
      </button>
      {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
        <button
          key={index + startPage}
          onClick={() => handlePage(index + startPage)}
          disabled={currentPage === index + startPage}
        >
          {index + startPage}
        </button>
      ))}
      <button onClick={handleNextGroup} disabled={endPage === totalPages}>
        다음
      </button>
    </Paging>
  );
};

const Paging = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 5px;

  button {
    padding: 5px 10px;
    border: 1px solid #ddd;
    background-color: ${(props) => (props.disabled ? "#ccc" : "white")};
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
    }
  }
`;

export default Pagination;
