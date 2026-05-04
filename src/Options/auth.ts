import type { Login, LoginResponse, Logout, Me, Register } from '@/types/api';
import { BaseApiUrl } from '@/utilits/constant';
import {mutationOptions, queryOptions } from '@tanstack/react-query';
import { FetchTemplate } from './FetchTemplate';


// ==========================
// Login
// ==========================
const LoginFn = async (data:Login):Promise<LoginResponse> =>{
    await new Promise((resolve) => setTimeout(resolve, 500)) //realistic delay
    return await FetchTemplate<LoginResponse>(
        BaseApiUrl+"/auth/login",
        "POST",
        data
    );
}
export const LoginOption = () =>{
    return mutationOptions({
        mutationKey: ["Login"] as const,
        mutationFn: (data:Login) => LoginFn(data),
    })
}

const LogoutFN = async ():Promise<Logout> =>{
    await new Promise((resolve) => setTimeout(resolve, 500))
    return await FetchTemplate<Logout>(
        BaseApiUrl+"/auth/logout",
        "POST"
    );
}
export const LogoutOption = () =>{
    return mutationOptions({
        mutationKey: ["Logout"] as const,
        mutationFn: LogoutFN,
    })
}


// ===========================
// me
// =============================
const MeFn = async ():Promise<Me> =>{
    await new Promise((resolve) => setTimeout(resolve, 500)) //realistic delay
    return await FetchTemplate<Me>(
        BaseApiUrl+"/auth/me",
        "GET"
    );
}
export const MeOption = () => {
    return queryOptions({
        queryKey: ["Me"] as const,
        queryFn: MeFn,
    })
}


// ==========================
// Login
// ==========================
const RegisterFn = async (data: Register): Promise<LoginResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 500))

  if (!data.display_image) {
    return Promise.reject("Display image is required")
  }

  const form = new FormData()

  // basic fields
  form.append("email", data.email)
  form.append("password", data.password)
  form.append("registration_number", data.registration_number)

  form.append("metadata", JSON.stringify(data.metadata))

  form.append("display_image", data.display_image)

  data.permission_keys.forEach((p) => {
    form.append("permission_keys", p)
  })

  data.permissions.forEach((file) => {
    form.append("permissions", file)
  })

  return await FetchTemplate<LoginResponse>(
    BaseApiUrl + "/auth/register",
    "POST",
    form
  )
}

export const RegisterOption = () =>{
    return mutationOptions({
        mutationKey: ["Register"] as const,
        mutationFn: (data:Register) => RegisterFn(data),
    })
}
