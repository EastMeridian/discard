export const extractFileFromURL = (path: string) =>
  path.split(/(\\|\/)/g).pop();
