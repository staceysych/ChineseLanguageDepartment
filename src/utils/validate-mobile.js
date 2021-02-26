export const validateMobile = (mobile) => {
  if(!mobile) {
    return true
  }
  const re = /^\+?[0-9]+(\([0-9]+\))?[0-9-]*[0-9]$/;
  return re.test(mobile);
}
