import feedInstance from "../axiosInstance/feed";

export const getFeedPages = async ({ pageParam = 1 }) => {
  const response = await feedInstance.get(`/feed?_sort=created_time&_order=desc&_page=${pageParam}&_limit=5`);
  return response.data;
};

export const updateThumb = async ({ feedId, currentThumb, isUserLiked, user }) => {
  const newThumb = isUserLiked ? [...currentThumb].filter((el) => el !== user.id) : [...currentThumb, user.id];
  await feedInstance.patch(`/feed/${feedId}`, { thumb: newThumb });
};

export const getFeedsByPageNum = async ({ pageParam = 1, userId }) => {
  const response = await feedInstance.get(`/feed?_page=${pageParam}&_limit=5&userId=${userId}`);
  return response.data;
};

export const toggleFn = async ({ feedId, feedVisibility }) => {
  await feedInstance.patch(`/feed/${feedId}`, { visibility: !feedVisibility });
};

export const deleteFn = async ({ feedId }) => {
  await feedInstance.delete(`/feed/${feedId}`);
};
