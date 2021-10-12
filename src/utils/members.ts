import { User } from "models/user";

export const classifyMembers = (members: User[], currentUser?: User | null) => {
  if (members.length === 0) return { others: [] };
  const firstMember = members[0];
  const others =
    firstMember.uid === currentUser?.uid
      ? members
      : members.filter(({ uid }) => uid !== currentUser?.uid);

  return {
    firstMember,
    others,
  };
};
