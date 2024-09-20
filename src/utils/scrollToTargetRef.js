export const scrollToTargetRef = (targetRef) => {
  targetRef.current.scrollIntoView({ behavior: "smooth" });
};
