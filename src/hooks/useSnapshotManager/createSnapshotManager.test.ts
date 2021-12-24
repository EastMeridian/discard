import { createSnapshotManager } from "./createSnapshotManager";

describe("createSnapshotManager", () => {
  const manager = createSnapshotManager(2);

  const A = jest.fn();
  const B = jest.fn();
  const C = jest.fn();

  it("should add ID to list and subscribe at given ID", () => {
    manager.add("A", A);
    expect(manager.value.IDs).toStrictEqual(["A"]);
    expect(manager.value.listeners).toStrictEqual({ A });

    manager.add("B", B);
    expect(manager.value.IDs).toStrictEqual(["A", "B"]);
    expect(manager.value.listeners).toStrictEqual({ A, B });
  });

  it("should not add twice data", () => {
    manager.add("B", B);
    expect(manager.value.IDs).toStrictEqual(["A", "B"]);
    expect(manager.value.listeners).toStrictEqual({ A, B });
  });

  it("should pop latest element when limit reached", () => {
    manager.add("C", C);
    expect(manager.value.IDs).toStrictEqual(["A", "C"]);
    expect(B).toHaveBeenCalled();
    expect(manager.value.listeners).toStrictEqual({ A, C });
  });

  it("should unsubscribe all elements when clear", () => {
    manager.clear();
    expect(A).toHaveBeenCalled();
    expect(C).toHaveBeenCalled();
  });
});
