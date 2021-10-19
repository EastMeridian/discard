import { User } from "models/user";
import { classifyMembers } from "./members";

const CURRENT_USER = { uid: "TEST1" } as User;

describe("classifyMembers", () => {
  it("should return empty array with current user if no members provided", () => {
    expect(classifyMembers([], CURRENT_USER)).toStrictEqual({
      members: [],
      others: [],
    });
  });
  it("should return array of members with current user at the end", () => {
    const others = [{ uid: "TEST2" }, { uid: "TEST3" }] as User[];
    const members = [CURRENT_USER, ...others];

    expect(classifyMembers(members, CURRENT_USER)).toStrictEqual({
      members: [...others, CURRENT_USER],
      others,
    });
  });
});
