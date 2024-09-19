import { useState } from "react";
import { updateThumb } from "../../api/feedApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp as regularThumb } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp as solidThumb } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const Thumb = ({ currentFeedId, currentThumb }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [thumbCount, setThumbCount] = useState(currentThumb);
  const updatedThumbCount = isClicked ? thumbCount - 1 : thumbCount + 1;
  const queryClient = useQueryClient();

  const handleThumb = () => {
    setIsClicked((prev) => !prev);
    setThumbCount(updatedThumbCount);
  };

  const { mutate: addThumb } = useMutation({
    mutationFn: (id) => {
      updateThumb(id, thumbCount);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["feed"]);
    }
  });

  return (
    <div>
      <Button
        onClick={() => {
          handleThumb();
          addThumb(currentFeedId);
        }}
      >
        {isClicked ? <FontAwesomeIcon icon={solidThumb} /> : <FontAwesomeIcon icon={regularThumb} />}
      </Button>
      {thumbCount}
    </div>
  );
};

export default Thumb;

const Button = styled.span`
  margin-inline: 10px;
  cursor: pointer;
`;
