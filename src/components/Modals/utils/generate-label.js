export const generateLabel = (name) => {
  switch (name) {
    case 0:
      return 'Email';
    case 1:
      return 'Mobile';
    default:
      return 'Website';
  }
};
