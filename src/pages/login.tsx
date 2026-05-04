import { useTheme } from "@/components/theme-provider"
import { Reveal } from "@/components/MotionWrappers"
import { TermsOverlay } from "@/components/TermsOverLay"
import { Logo_Name } from "@/components/Logo_Name"
import { backgroundUrl } from "@/utilits/services/login"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { TermsProvider } from "@/utilits/Hooks/login"
import { LoginCard } from "@/components/LoginCard"

export function Login() {
  const navigate = useNavigate()
  const { theme } = useTheme()
  // Standard Login Flow

  // check if we allready know user
  const knownUser = !!localStorage.getItem("user")

  useEffect(() => {
    if (knownUser) navigate("/MarketFeed")
  }, [knownUser, navigate])

  return (
    <TermsProvider>
      <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4">
        <Reveal>
          <Logo_Name />
        </Reveal>

        {/* BACKGROUND ELEMENTS */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${backgroundUrl})`,
          }}
        />

        {/* 1. BACKDROP blurry layer */}
        <div
          className={`absolute inset-0 z-10 backdrop-blur-[2px] ${theme === "dark" ? "bg-background/60" : "bg-background/40"}`}
        />

        {/* 2. LOGIN CARD (Main Reveal Wrapper) */}
        <Reveal className="flex w-full items-center justify-center">
          <LoginCard />
        </Reveal>

        <TermsOverlay />
      </div>
    </TermsProvider>
  )
}
