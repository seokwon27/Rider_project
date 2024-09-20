import { useEffect } from "react";
import styled from "styled-components";

const RidingMap = ({ setModalOpen, showMap, id, roadLine }) => {
  useEffect(() => {
    showMap(id, roadLine);
  }, []);

  const showModal = () => {
    setModalOpen(true);
  };

  return <Map id={id} onClick={showModal}></Map>;
};

export default RidingMap;

const Map = styled.div`
  width: 300px;
  height: 230px;
  cursor: pointer;
`;
