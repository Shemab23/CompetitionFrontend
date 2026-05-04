import { EnvelopeIcon, LockIcon } from "@phosphor-icons/react"
import { InputBlock } from "./ui/InputBlock"
import { useGlobalContext } from "@/utilits/Hooks/General"
import { useEffect, useState } from "react"
type props = {
  valid: (k: boolean) => void
}
export const Register_credentials = ({ valid }: props) => {
  const { setRegisterData } = useGlobalContext()
  const [confirm_password, setConfirmPassword] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const passMismatch = password !== confirm_password

  useEffect(() => {
    setRegisterData((prev) => ({
      ...prev,
      email,
      password,
    }))

    const isValid = email && password && confirm_password && !passMismatch
    valid(!!isValid)
  }, [email, password, confirm_password, passMismatch, valid, setRegisterData])

  return (
    <>
      <InputBlock
        label="Email"
        icon={EnvelopeIcon}
        type="email"
        value={email}
        placeholder="email@here"
        onChange={setEmail}
      />
      <InputBlock
        label="Password"
        icon={LockIcon}
        type="password"
        value={password}
        placeholder="***************"
        onChange={setPassword}
      />
      <InputBlock
        label="Confirm Password"
        icon={LockIcon}
        type="password"
        value={confirm_password}
        placeholder="***************"
        onChange={setConfirmPassword}
        error={passMismatch}
        errorMessage="Passwords do not match!"
      />
    </>
  )
}
