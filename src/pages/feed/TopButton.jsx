import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import styled from "styled-components";

const TopButton = () => {
  const [showButton, setShowButton] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", handleShowButton);
    return () => {
      window.removeEventListener("scroll", handleShowButton);
    };
  }, []);

  return (
    showButton && (
      <ScrollContainer>
        <Button onClick={scrollToTop}>
          <FontAwesomeIcon icon={faAngleUp} />
        </Button>
      </ScrollContainer>
    )
  );
};

export default TopButton;

const ScrollContainer = styled.div`
  position: fixed;
  right: 5%;
  bottom: 5%;
  z-index: 1;
`;

const Button = styled.button`
  font-weight: bold;
  font-size: 30px;
  padding: 15px 18px;
  background-color: #000;
  color: #fff;
  border: 1px rgb(210, 204, 193);
  box-shadow: 0px 0px 15px 1px rgba(201, 195, 183, 0.288);
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    color: rgb(115, 115, 115);
  }
`;
