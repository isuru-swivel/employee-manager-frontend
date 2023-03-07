export const getAvatarUrl = (firstName: string, lastName: string): string => {
  return `https://ui-avatars.com/api/?name=${firstName}+${lastName}`;
};
