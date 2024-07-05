
export function convertToCheckFormData(formData: any) {
  if (formData.type === "1") {
    return {
      "email": formData.email,
      "type": parseInt(formData.type)
    };
  } else {
    const region = `+${parseInt(formData?.mobile?.phoneLocale)}`;
    const mobile = `${region}${formData["mobile"]}`;
    return {
      "mobile": mobile,
      "type": parseInt(formData.type)
    };
  }
}

export function convertToLoginFormData(formData: any) {
  if (formData.type === "1") {
    let data: any = {
      "email": formData.email?.email,
      "type": parseInt(formData.type),
      "password": formData.email.password,
    }
    if(formData.email.is2fa) {
      data['mfaCode'] = formData.email.mfaCode
    }
    return data
  } else {
    const region = `+${parseInt(formData?.mobile?.phoneLocale)}`;
    let data: any = {
      "mobile": region + formData.mobile?.mobile,
      "type": parseInt(formData.type),
      "password": formData.mobile.password,
    }
    if(formData.email.is2fa) {
      data['mfaCode'] = formData.mobile.mfaCode
    }
    return data
  }
}

export function convertToSignUpFormData(formData: any) {
  if (formData.type === "1") {
    let data: any = {
      "email": formData.email?.email,
      "type": parseInt(formData.type),
      "password": formData.email.password,
    }
    if(formData.email.is2fa) {
      data['mfaCode'] = formData.email.mfaCode
    }
    return data
  } else {
    const region = `+${parseInt(formData?.mobile?.phoneLocale)}`;
    let data: any = {
      "mobile": region + formData.mobile?.mobile,
      "type": parseInt(formData.type),
      "password": formData.mobile.password,
    }
    if(formData.email.is2fa) {
      data['mfaCode'] = formData.mobile.mfaCode
    }
    return data
  }
}

export function convertToForgotPasswordFormData(formData: any) {
  if (formData.type === "1") {
    let data: any  = {
      "email": formData.email?.email,
      "type": parseInt(formData.type),
    };
    if(formData.email.is2fa) {
      data['mfaCode'] = formData.email.mfaCode
    }
    return data
  } else {
    const region = `+${parseInt(formData?.mobile?.phoneLocale)}`;
    let data: any = {
      "mobile": region + formData.mobile?.mobile,
      "type": parseInt(formData.type),
    }
    if(formData.email.is2fa) {
      data['mfaCode'] = formData.mobile.mfaCode
    }
    return data
  }
}


export function convertToResetPasswordFormData(formData: any) {
  if (formData.type === "1") {
    let data: any  = {
      "email": formData.email,
      "type": parseInt(formData.type),
      "password": formData.email.password,
      "code": formData.email.code,
    };
    if(formData.email.is2fa) {
      data['mfaCode'] = formData.email.mfaCode
    }
    return data
  } else {
    const region = `+${parseInt(formData?.mobile?.phoneLocale)}`;
    let data: any = {
      "mobile": region + formData.mobile?.mobile,
      "type": parseInt(formData.type),
      "password": formData.mobile.password,
      "code": formData.mobile.code,
    }
    if(formData.email.is2fa) {
      data['mfaCode'] = formData.mobile.mfaCode
    }
    return data
  }
}

