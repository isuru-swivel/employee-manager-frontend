export const getAvatarUrl = (firstName: string, lastName: string): string => {
  //get image url for avatar
  return `https://ui-avatars.com/api/?name=${firstName}+${lastName}`;
};
