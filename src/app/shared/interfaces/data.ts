export interface registerData {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}

export interface email {
  email: string;
}

export interface Address {
  details : string;
  phone : string;
  city : string;
}

export interface resetcode {
  resetCode: string;
}

export interface newPassword {
  email: string;
  newPassword: string;
}