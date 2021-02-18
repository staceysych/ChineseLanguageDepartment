export const validateMobile = (mobile) => {
  const re = /^\+?[0-9]+(\([0-9]+\))?[0-9-]*[0-9]$/;
  return re.test(mobile);
}
