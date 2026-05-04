/* eslint-disable react-refresh/only-export-components */
import { useTheme } from "@/components/theme-provider"
import type { Register } from "@/types/api"
// import type { User } from '@/types/general'
import {
  createContext,
  useState,
  useContext,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react"

export const option = ["feed", "notifications", "profile", "chamber"] as const
type Option = (typeof option)[number]

interface GeneralContextType {
  notification: number
  setNotification: (notification: number) => void
  logo: string
  prefCurrency: string
  setPrefCurrency: (currency: string) => void
  view: Option
  setView: (view: Option) => void
  registerData: Register
  setRegisterData: Dispatch<SetStateAction<Register>>
}

type Props = {
  children: ReactNode
}

const GlobalContext = createContext<GeneralContextType | undefined>(undefined)

export const GlobalProvider = ({ children }: Props) => {
  const { theme } = useTheme()
  const logo =
    theme === "dark"
      ? "CompetitionFrontend/logo_white.png"
      : "CompetitionFrontend/logo_black.png"
  const [notification, setNotification] = useState(0)
  const [prefCurrency, setPrefCurrency] = useState("USD")
  const [view, setView] = useState<Option>("feed")

  const [registerData, setRegisterData] = useState<Register>({
    email: "",
    password: "",
    registration_number: "",
    metadata: {
      profile: {
        name: "",
        phone: "",
        country: "",
        website: "",
        currency: "",
      },
      permissions: [],
    },
    permission_keys: [],
    display_image: null,
    permissions: [],
  })

  return (
    <GlobalContext.Provider
      value={{
        notification,
        setNotification,
        logo,
        prefCurrency,
        setPrefCurrency,
        view,
        setView,
        registerData,
        setRegisterData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = (): GeneralContextType => {
  const context = useContext(GlobalContext)

  if (!context) {
    throw new Error("useTerms must be used within a TermsProvider")
  }

  return context // 3. MUST return the context
}
