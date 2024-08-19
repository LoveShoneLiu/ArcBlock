const validationRules = {
  required(value: string) {
    const validateResult = value.trim() !== '';
    return validateResult;
  },
  email(value: string) {
    const reg = /^[a-zA-Z0-9]+([_\.\-]\w+)*@\w+([_\-\.]\w+)*\.\w+([_\.]\w+)*$/;
    const validateResult = reg.test(value);
    return validateResult;
  },
  phone(value: string) {
    const reg = /^1[3-9]\d{9}$/;
    const validateResult = reg.test(value);
    return validateResult;
  }
};

export {
  validationRules,
}