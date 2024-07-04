
export function convertToCheckFormData(formData: any) {
  if (formData.type === "1") {
    return {
      "email": formData.email,
      "type": parseInt(formData.type)
    };
  } else {
    const region = `+${parseInt(formData["phoneLocale"])}`;
    const mobile = `${region}${formData["mobile"]}`;
    return {
      "mobile": mobile,
      "type": parseInt(formData.type)
    };
  }
}

export function convertToLoginFormData(formData: any, mfaCode: boolean) {
  const data  = {
    "email": formData.email,
    "type": parseInt(formData.type),
    "password": formData.password,
    "mobile": formData.mobile,
    "mfaCode": formData.mfaCode,
  };
  if (formData.type === "1") {
    delete data["mobile"];
  } else {
    const region = `+${parseInt(formData["phoneLocale"])}`;
    data["mobile"] = `${region}${data["mobile"]}`;
    delete data["email"];
  }
  if(mfaCode === false) {
    delete data["mfaCode"];
  }
  return data;
}

export function convertToSignUpFormData(formData: any, mfaCode: boolean) {
  const data  = {
    "email": formData.email,
    "type": parseInt(formData.type),
    "password": formData.password,
    "mobile": formData.mobile,
    "mfaCode": formData.mfaCode,
  };
  if (formData.type === "1") {
    delete data["mobile"];
  } else {
    const region = `+${parseInt(formData["phoneLocale"])}`;
    data["mobile"] = `${region}${data["mobile"]}`;
    delete data["email"];
  }
  if(mfaCode === false) {
    delete data["mfaCode"];
  }
  return data;
}

export function convertToForgotPasswordFormData(formData: any, mfaCode: boolean) {
  const data  = {
    "email": formData.email,
    "type": parseInt(formData.type),
    "mobile": formData.mobile,
    "mfaCode": formData.mfaCode,
  };
  if (formData.type === "1") {
    delete data["mobile"];
  } else {
    const region = `+${parseInt(formData["phoneLocale"])}`;
    data["mobile"] = `${region}${data["mobile"]}`;
    delete data["email"];
  }
  if(mfaCode === false) {
    delete data["mfaCode"];
  }
  return data;
}


export function convertToResetPasswordFormData(formData: any, mfaCode: boolean) {
  const data  = {
    "type": parseInt(formData.type),
    "email": formData.email,
    "password": formData.password,
    "mobile": formData.mobile,
    "code": formData.code,
    "mfaCode": formData.mfaCode,
  };
  if (formData.type === "1") {
    delete data["mobile"];
  } else {
    const region = `+${parseInt(formData["phoneLocale"])}`;
    data["mobile"] = `${region}${data["mobile"]}`;
    delete data["email"];
  }
  if(mfaCode === false) {
    delete data["mfaCode"];
  }
  return data;
}

