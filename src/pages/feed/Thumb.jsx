import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp as regularThumb } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp as solidThumb } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import useUserStore from "../../store/useUserStore";
import { useThumbMutation } from "../../queries/mutaions";
import { useNavigate } from "react-router-dom";

const Thumb = ({ currentFeedId, currentThumb }) => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { mutate: addThumb } = useThumbMutation();

  const isUserLiked = currentThumb.some((el) => el == user?.id);
  const thumbCount = currentThumb.length;
  const handleThumb = () => {
    if (!user) {
      alert("로그인 후 가능합니다!");
      navigate("/login");
      return;
    }
    addThumb({ feedId: currentFeedId, currentThumb, isUserLiked, user });
  };

  return (
    <div>
      <Button onClick={handleThumb} disabled={isUserLiked ? false : true}>
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
