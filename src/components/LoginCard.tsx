import { FormItem, StaggeredForm } from "./MotionWrappers"
import { useNavigate } from "react-router-dom"
import { useTerms } from "@/utilits/Hooks/login"
import { useState } from "react"

export const LoginCard = () => {
  const navigate = useNavigate()
  const { setShowTerms } = useTerms()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    localStorage.setItem(
      "user",
      JSON.stringify({
        email: "shema@bruno",
        password: "123,,11",
        registration_number: "REG_22243402",
        metadata: {
          profile: {
            name: "SHema bruno",
            phone: "+23455000",
            country: "Rwanda",
            website: "http://shema.com",
            currency: "USD",
          },
          permissions: [],
        },

        permission_keys: [],
        display_image:
          "https://plus.unsplash.com/premium_photo-1689977807477-a579eda91fa2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        permissions: [],
      })
    )

    navigate("/MarketFeed")
  }

  return (
    <div className="chamber-surface relative z-20 w-full max-w-md border-4 border-border bg-card/80 p-10 backdrop-blur-xl">
      <div className="mb-10 text-center">
        <h2 className="heading-chamber text-3xl">Login Form</h2>
        <p className="label-serious mt-2">-- Secure Logistics Access --</p>
      </div>

      {/* 3. THE FORM (Orchestrated Staggering) */}
      <form onSubmit={handleLogin}>
        <StaggeredForm className="space-y-6">
          <FormItem className="space-y-2">
            <label className="label-serious block">Business Email</label>
            <input
              type="email"
              name="email"
              value={email}
              required
              placeholder="name@domain.com"
              autoComplete="username"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 ring-primary/30 transition-all outline-none focus:ring-2"
            />
          </FormItem>

          <FormItem className="space-y-2">
            <label className="label-serious block">Credentials</label>
            <input
              type="password"
              name="password"
              value={password}
              required
              placeholder="••••••••"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 ring-primary/30 transition-all outline-none focus:ring-2"
            />
          </FormItem>

          <FormItem className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 rounded-xl bg-primary py-4 font-bold text-primary-foreground shadow-lg shadow-primary/10 transition-all hover:brightness-110 active:scale-95"
              onClick={() => handleLogin}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => navigate("/Register")}
              className="flex-1 rounded-xl border border-border bg-muted/20 py-4 font-bold transition-all hover:bg-muted/40"
            >
              Register
            </button>
          </FormItem>

          <FormItem className="text-center">
            <button
              type="button"
              onClick={() => setShowTerms(true)}
              className="text-[10px] font-black tracking-widest text-txt-cta uppercase hover:underline"
            >
              Review Smart Contract Terms
            </button>
          </FormItem>
        </StaggeredForm>
      </form>
    </div>
  )
}
