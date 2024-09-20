import feedInstance from "../axiosInstance/feed";

export const getFeedPages = async ({ pageParam = 1 }) => {
  const response = await feedInstance.get(`/feed?_sort=created_time&_order=desc&_page=${pageParam}&_limit=5`);
  return response.data;
};

export const updateThumb = async (FeedId, newThumb) => {
  await feedInstance.patch(`/feed/${FeedId}`, { thumb: newThumb });
};
