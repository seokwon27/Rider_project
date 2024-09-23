import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const ModalMap = ({ showMap, setSelectedPost, id, roadLine }) => {
  useEffect(() => {
    showMap(id + "_map", roadLine);
  }, []);

  const outSection = useRef();

  const closeOutSection = (e) => {
    if (outSection.current === e.target) {
      closeModal();
    }
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

  return (
    <Layer ref={outSection} onClick={closeOutSection}>
      <Map id={id + "_map"}>
        <ClostBtn onClick={closeModal}>
          <FontAwesomeIcon icon={faXmark} />
        </ClostBtn>
      </Map>
    </Layer>
  );
};

export default ModalMap;

const Layer = styled.div`
  z-index: 500;
  display: block;
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ClostBtn = styled.p`
  z-index: 200;
  position: absolute;
  font-size: 30px;
  right: 15px;
  top: 10px;
  color: black;
  cursor: pointer;
`;

const Map = styled.div`
  width: 1200px;
  height: 1100px;
  z-index: 100;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
