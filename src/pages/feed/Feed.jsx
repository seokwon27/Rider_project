import styled from "styled-components";
import Posting from "./Posting";
import TopButton from "./TopButton";

const Feed = () => {
  return (
    <FeedWrapper>
      <Posting />
      <TopButton />
    </FeedWrapper>
  );
};

export default Feed;

const FeedWrapper = styled.div`
  background-color: #121212;
  padding: 10px 0px 20px 0px;
  min-height: 100vh;
`;
