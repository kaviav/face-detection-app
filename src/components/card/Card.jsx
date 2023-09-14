import "./card.css";
import { useState } from "react";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  InfoOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import styled from "@emotion/styled";

const CustomStyledIcon = styled(FavoriteOutlined)`
  color: red;
`;

const Card = ({ post, socket, user }) => {
  const [liked, setLiked] = useState(false);

  const handleNotification = (type) => {
    type === 1 && setLiked(true);
    socket.emit("sendNotification", {
      senderName: user,
      receiverName: post.username,
      type,
    });
  };

  return (
    <div className="card">
      <div className="info">
        <img src={post.userImg} alt="" className="userImg" />
        <span>{post.fullname}</span>
      </div>
      <img src={post.postImg} alt="" className="postImg" />
      <div className="interaction">
        {liked ? (
          <div
            onClick={() => setLiked(false)}
            role="button"
            tabIndex={0} // This is for accessibility
          >
            <CustomStyledIcon className="cardIcon" />
          </div>
        ) : (
          <div onClick={() => handleNotification(1)} role="button" tabIndex={1}>
            {/* tabIndex={1}: This is for accessibility */}
            <FavoriteBorderOutlined className="cardIcon" />
          </div>
        )}
        <div onClick={() => handleNotification(2)} role="button" tabIndex={2}>
          <ChatBubbleOutlineOutlined className="cardIcon" />
        </div>
        <div onClick={() => handleNotification(3)} role="button" tabIndex={3}>
          <ShareOutlined className="cardIcon" />
        </div>
        <InfoOutlined className="cardIcon infoIcon" />
      </div>
    </div>
  );
};

export default Card;
