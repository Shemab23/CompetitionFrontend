import { useState } from "react"

import { Avatar } from "@/components/Avatar"
import { Status } from "@/components/Status"
import { CoreId } from "@/components/CoreId"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { useNavigate } from "react-router-dom"
type User = {
  legal_name: string
  display_name: string
  email: string
  bio: string
  job_title: string
  industry_tags: string[]
  verification_status: string
  trust_score: number
  avatar_url: string | null
}
const user: User = {
  legal_name: "Bruno Shema",
  display_name: "Nobel Source Ops",
  email: "22243402@eul.edu.tr",
  bio: "Managing high-security logistics and mineral export verification pipelines.",
  job_title: "Senior Logistics Officer",
  industry_tags: ["Regional_Logistics", "Mineral_Exporter"],
  verification_status: "verified",
  trust_score: 73,
  avatar_url: null,
}

export const Settings = () => {
  const { theme } = useTheme()

  const navigate = useNavigate()

  const [profile, setProfile] = useState<User>(user)

  const handleChange = (field: string, value: string) => {
    setProfile({ ...profile, [field]: value })
  }

  const handleClick = (
    event: string,
    data: { field: string; value: string } | null
  ) => {
    if (event === "update") {
      if (data) {
        handleChange(data.field, data.value)
      }
    } else {
      switch (event) {
        case "avatar":
          alert("Avatar uploaded successfully!")
          break
      }
    }
  }

  return (
    <div className="mx-auto min-h-screen max-w-300 bg-background p-6 font-sans text-foreground antialiased md:p-12">
      <div className="flex justify-end">
        <Button
          className={`mb-8 ${theme === "dark" ? "bg-red-600" : "bg-red-300"} text-txt-nomarl hover:none cursor-pointer rounded-md font-bold opacity-80 hover:border-2 hover:border-blue-400 hover:bg-background`}
          variant={"default"}
          size={"default"}
          onClick={() => {
            localStorage.removeItem("user")
            navigate("/")
          }}
        >
          Logout
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-4">
          <Avatar profile={profile} handleClick={handleClick} />
          <Status {...profile} />
        </div>
        <CoreId {...profile} />
      </div>
    </div>
  )
}
// to do..
/**
1. Avatar upload must update both the entity and user_meta objects.
2. Partial updates using JSONB merge to avoid data loss.
 */
