import { User } from "models/user";

export const classifyMembers = (members: User[], currentUser: User) => {
  if (members.length === 0) return { members: [], others: [] };
  const others = members.filter(({ uid }) => uid !== currentUser?.uid);
  return { members: [...others, currentUser], others };
};

export const sortMemberByName = (a: User, b: User) => {
  if (a.displayName && b.displayName) {
    if (a.displayName < b.displayName) {
      return -1;
    }
    if (a.displayName > b.displayName) {
      return 1;
    }
  }

  return 0;
};
