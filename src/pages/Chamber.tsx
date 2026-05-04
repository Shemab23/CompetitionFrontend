import { useState } from "react"
import { CaretRight, Plus, House } from "@phosphor-icons/react"

// UI Components
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"

// --- 1. ENHANCED MOCK DATA (SCHEMA ALIGNED) ---
type Product = {
  name: string
  images: string[]
  price_per_unit: number
}
type Analytics = {
  total_revenue: number
  monthly_growth: number[]
  active_deals: number
}
type Member = {
  id: string
  name: string
  role: string
  location: string
  avatar: string
}
type Calendar = {
  id: string
  day: string
  activity: string
  status: string
  details: string
}
type Carrer = {
  name: string
  company: string
  tel: string
}
type Shipment = {
  id: string
  sender: string
  receiver: string
  status: string
  carrier: Carrer
  route: string[]
}
type Room = {
  id: string
  name: string
  motive: string
  product: Product
  analytics: Analytics
  members: Member[]
  calendar: Calendar[]
  shipments: Shipment[]
}

const MOCK_ROOM_DATA = {
  id: "RM_NOBEL_251",
  name: "Great Lakes Mineral Corridor",
  motive:
    "Facilitating legal, artisanal lithium export from Rwanda to global refineries.",
  product: {
    name: "Lithium Ore (Battery Grade)",
    images: [
      "https://plus.unsplash.com/premium_photo-1675365666747-1cef6d17b0a5?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    price_per_unit: 4500,
  },
  analytics: {
    total_revenue: 1254000,
    monthly_growth: [12000, 45000, 32000, 89000, 102000],
    active_deals: 12,
  },
  members: [
    {
      id: "USR_01",
      name: "Bruno Shema",
      role: "Admin/Exporter",
      location: "Kigali, RW",
      avatar: "BS",
    },
    {
      id: "USR_02",
      name: "Sarah Chen",
      role: "Purchaser",
      location: "Singapore, SG",
      avatar: "SC",
    },
    {
      id: "USR_03",
      name: "Delta Logistics",
      role: "Transporter",
      location: "Mombasa, KE",
      avatar: "DL",
    },
  ],
  calendar: [
    {
      id: "EV_1",
      day: "Monday",
      activity: "Shipment Load USR_01",
      status: "pending",
      details: "12 Tons Lithium",
    },
    {
      id: "EV_2",
      day: "Friday",
      activity: "Refinery Drop-off USR_02",
      status: "suggested",
      details: "QC Inspection",
    },
  ],
  shipments: [
    {
      id: "SHIP_778",
      sender: "USR_01",
      receiver: "USR_02",
      status: "in_transit",
      carrier: {
        name: "John Logi",
        company: "Swift Kenya",
        tel: "+254 700 000",
      },
      route: ["Kigali", "Mombasa", "Singapore"],
    },
  ],
}

export default function Chamber() {
  const navigate = useNavigate()
  const [activeRoom, setActiveRoom] = useState<Room | null>(null)

  if (activeRoom) {
    const name = activeRoom.name.split(" ").join("-").toLowerCase()
    navigate(`/Chamber/${name}`)
    return null
  }

  const handleInterRoom = (room: Room) => {
    setActiveRoom(room)
  }

  return (
    <div className="min-h-screen bg-background p-12 text-txt-default">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h1 className="text-5xl font-black tracking-tighter">
              Lobby Control
            </h1>
            <p className="mt-2 text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">
              Nobel Source Operations • 2026
            </p>
          </div>
          <Button className="h-14 gap-2 rounded-[1.5rem] bg-black px-8 text-xs font-black tracking-widest text-white uppercase">
            <Plus weight="bold" /> Create Chamber
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Card
            onClick={() => {
              handleInterRoom(MOCK_ROOM_DATA as Room)
            }}
            className="group cursor-pointer rounded-[3rem] border-none bg-white p-10 shadow-xl ring-1 ring-slate-100 transition-all hover:-translate-y-2"
          >
            <div className="mb-8 flex items-start justify-between">
              <div className="flex h-16 w-16 items-center justify-center rounded-[2rem] bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <House size={32} weight="fill" />
              </div>
              <Badge className="bg-green-100 px-4 font-black text-green-700 italic">
                ACTIVE DEAL
              </Badge>
            </div>
            <h3 className="mb-2 text-2xl font-black tracking-tight italic">
              "{MOCK_ROOM_DATA.name}"
            </h3>
            <p className="line-clamp-2 text-sm leading-relaxed font-medium text-slate-500">
              {MOCK_ROOM_DATA.motive}
            </p>
            <div className="mt-8 flex items-center justify-between border-t pt-8">
              <div className="flex -space-x-2">
                <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-100" />
                <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-100" />
              </div>
              <Button
                variant="ghost"
                className="gap-2 text-xs font-black tracking-widest uppercase"
              >
                Enter Room <CaretRight weight="bold" />
              </Button>
            </div>
          </Card>

          <Card className="flex flex-col items-center justify-center rounded-[3rem] border-2 border-dashed border-slate-200 bg-slate-50 p-10 text-center opacity-60 transition-opacity hover:opacity-100">
            <Plus size={48} className="mb-4 text-slate-300" />
            <p className="text-xs font-black tracking-widest text-slate-400 uppercase">
              Secure Empty Chamber
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
