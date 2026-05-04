import type { User } from "./general"

export type BodyProps = Login | Register | LoginResponse| RegisterResponse | FormData;

export type APIResponse<T> = {
  msg: string
  ans: T
}

export type Login = Pick<User, "email" | "password">
export type Logout = { msg: string, ans: string }
export type LoginResponse = APIResponse<{
  user: User
  token: string
}>
export type Me = APIResponse<
  {
    token: string,
    entity_id: string,
    expires_at: string
  }>

export type Register = Omit<
  User,
  "id" | "created_at" | "updated_at" | "role" | "metadata"
> & {
  metadata: {
    profile: {
      name: string
      phone?: string
      country?: string
      website?: string
      currency?: string
    }
    permissions: { right: string }[]
  }

  permission_keys: string[]
  display_image?: File | null
  permissions: File[]
}

export type RegisterResponse = APIResponse<{
  user: User
  token: string
}>

