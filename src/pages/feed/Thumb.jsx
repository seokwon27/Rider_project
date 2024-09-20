import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp as regularThumb } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp as solidThumb } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import useUserStore from "../../store/useUserStore";
import feedInstance from "../../axiosInstance/feed";

const Thumb = ({ currentFeedId, currentThumb }) => {
  const queryClient = useQueryClient();

  const { user } = useUserStore();

  const isUserLiked = currentThumb.some((el) => el == user?.id);
  const thumbCount = currentThumb.length;

  const updateThumb = async (feedId) => {
    const newThumb = isUserLiked ? [...currentThumb].filter((el) => el !== user.id) : [...currentThumb, user.id];
    await feedInstance.patch(`/feed/${feedId}`, { thumb: newThumb });
  };

  const { mutate: addThumb } = useMutation({
    mutationFn: updateThumb,
    onSuccess: () => {
      queryClient.invalidateQueries(["feed"]);
    }
  });

  return (
    <div>
      <Button onClick={() => addThumb(currentFeedId)} disabled={isUserLiked ? false : true}>
        {isUserLiked ? <FontAwesomeIcon icon={solidThumb} /> : <FontAwesomeIcon icon={regularThumb} />}
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
