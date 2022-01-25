import { DocumentData, QuerySnapshot } from "firebase/firestore";

import { Message } from "models/message";

export const dispatchMessageSnapshot = (
  snapshot: QuerySnapshot<DocumentData>
) => {
  const added: Message[] = [];
  const modified: Message[] = [];
  snapshot.docChanges().forEach(({ doc, type }) => {
    if (type === "added") added.push({ id: doc.id, ...doc.data() } as Message);
  });
  return { added, modified };
};
