import { User } from "models/user";

export const classifyMembers = (
  members: User[],
  currentUser: User | undefined
) => {
  if (members.length === 0) return { others: [] };
  const others = members.filter(({ uid }) => uid !== currentUser?.uid);
  const firstMember = others[0];
  return {
    firstMember,
    others,
  };
};
