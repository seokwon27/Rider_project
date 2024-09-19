import feedInstance from "../axiosInstance/feed";

export const getFeed = async () => {
  const response = await feedInstance.get("/feed");
  return response.data;
};

export const updateThumb = async (FeedId, newThumb) => {
  await feedInstance.patch(`/feed/${FeedId}`, { thumb: newThumb });
};
