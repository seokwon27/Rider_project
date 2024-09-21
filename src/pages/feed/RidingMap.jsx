import { useEffect } from "react";
import styled from "styled-components";

const RidingMap = ({ setSelectedPost, showMap, id, roadLine }) => {
  useEffect(() => {
    showMap(id, roadLine);
  }, []);

  const OpenModal = () => {
    setSelectedPost({ id, roadLine });
  };

  return <Map id={id} onClick={OpenModal}></Map>;
};

export default RidingMap;

const Map = styled.div`
  width: 300px;
  height: 230px;
  cursor: pointer;
`;
