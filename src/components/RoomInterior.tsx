import { useState } from "react"
import { Button } from "./ui/button"
import {
  AirplaneTilt,
  CaretRightIcon,
  ChartLineUp,
  Chats,
  MapPin,
  Plus,
  QrCode,
  VideoCamera,
} from "@phosphor-icons/react"
import { useNavigate, useParams } from "react-router-dom"
import { Tabs, TabsContent } from "./ui/tabs"
import { Badge } from "./ui/badge"
import { Card } from "./ui/card"
import React from "react"
import { Textarea } from "./ui/textarea"
import { XIcon } from "lucide-react"
import { Input } from "./ui/input"
import { AnimatePresence } from "framer-motion"

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
const MOCK_ROOM_DATA: Room = {
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

const getRoom = (name: string): Room | null => {
  const NameOrg = MOCK_ROOM_DATA.name.split(" ").join("-").toLowerCase()
  return NameOrg === name ? MOCK_ROOM_DATA : null
}

import { QRCodeCanvas } from "qrcode.react"

const QRWorkflow = ({ shipment }: any) => {
  const baseUrl = window.location.origin

  //   const qrUrl = `${baseUrl}/verify-shipment/${shipment.id}`
  const qrUrl = `http://www.netflix.com`

  return (
    <Card className="rounded-[2rem] border-2 border-dashed border-primary/20 bg-primary/5 p-6">
      <div className="space-y-4 text-center">
        <div className="mx-auto flex items-center justify-center rounded-2xl bg-white p-4 shadow-inner">
          <QRCodeCanvas value={qrUrl} size={160} />
        </div>

        <h4 className="text-xs font-black uppercase italic">
          Shipment QR Code
        </h4>

        <p className="text-[10px] text-muted-foreground">
          Scan this QR → opens verification link
        </p>

        <p className="text-[10px] break-all text-slate-400">{qrUrl}</p>
      </div>
    </Card>
  )
}

const RevenueChart = ({ data }: { data: number[] }) => (
  <div className="mt-6 flex h-32 items-end gap-1">
    {data.map((val, i) => (
      <div key={i} className="group flex flex-1 flex-col items-center gap-2">
        <div className="relative flex h-full w-full items-end rounded-t-lg bg-slate-200 transition-all group-hover:bg-primary">
          <div
            className="w-full rounded-t-lg bg-primary/40 group-hover:bg-primary"
            style={{ height: `${(val / 110000) * 100}%` }}
          />
        </div>
        <span className="text-[8px] font-black text-slate-400">M{i + 1}</span>
      </div>
    ))}
  </div>
)

const RenderSetMeeting = ({
  setMeeting,
}: {
  setMeeting: (ans: boolean) => void
}) => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    platform: "zoom",
  })

  const handleSave = () => {
    console.log("Saving Meeting:", formData)
    setMeeting(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-2xl">
        {/* Header Section */}
        <div className="border-b bg-muted/20 p-8 pb-6">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-6 right-6 rounded-full"
            onClick={() => setMeeting(false)}
          >
            <XIcon size={20} />
          </Button>
          <h2 className="heading-chamber text-3xl">Schedule Sync</h2>
          <p className="label-serious mt-1">Great Lakes Mineral Corridor</p>
        </div>

        {/* Form Body */}
        <div className="grid grid-cols-1 gap-8 p-8 md:grid-cols-2">
          {/* Left Column: Context & Title */}
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="label-serious opacity-60">
                Meeting Subject
              </label>
              <Input
                placeholder="e.g. Logistics Review"
                className="h-12 rounded-xl border-none bg-muted/50 shadow-none focus-visible:ring-1 focus-visible:ring-primary"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="label-serious opacity-60">
                Select Platform
              </label>
              <div className="grid grid-cols-2 gap-2">
                {["zoom", "teams"].map((p) => (
                  <button
                    key={p}
                    onClick={() => setFormData({ ...formData, platform: p })}
                    className={`flex h-12 items-center justify-center rounded-xl border-2 text-xs font-bold capitalize transition-all ${
                      formData.platform === p
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-transparent bg-muted/50 text-muted-foreground"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Time & Calendar */}
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="label-serious opacity-60">Date & Time</label>
              <Input
                type="datetime-local"
                className="h-12 rounded-xl border-none bg-muted/50 shadow-none focus-visible:ring-1 focus-visible:ring-primary"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </div>

            <div className="rounded-2xl border border-dashed bg-muted/10 p-4 text-center">
              <p className="text-[10px] leading-relaxed text-muted-foreground">
                Automated invites will be sent to all{" "}
                <span className="font-bold">Active Members</span> of this
                Chamber.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 bg-muted/20 p-6">
          <Button
            variant="ghost"
            className="rounded-xl text-xs font-bold tracking-widest uppercase"
            onClick={() => setMeeting(false)}
          >
            Cancel
          </Button>
          <Button
            className="h-12 rounded-xl bg-primary px-10 text-xs font-black tracking-widest text-white uppercase transition-opacity hover:opacity-90"
            onClick={handleSave}
          >
            Confirm & Save
          </Button>
        </div>
      </div>
    </div>
  )
}

const RenderOverview = ({ room }: { room: Room }) => (
  <TabsContent
    value="overview"
    className="grid grid-cols-1 gap-10 outline-none lg:grid-cols-12"
  >
    {/* LEFT */}
    <div className="space-y-10 lg:col-span-8">
      {/* HERO / MISSION */}
      <section className="rounded-[2.5rem] border bg-gradient-to-br from-white to-slate-50 p-10 shadow-sm">
        <Badge className="mb-4 bg-primary/10 px-4 py-1 font-black text-primary">
          MISSION STATEMENT
        </Badge>

        <h3 className="mb-6 text-3xl leading-tight font-black tracking-tight italic">
          {room.motive}
        </h3>

        <div className="grid grid-cols-2 gap-8 border-t pt-6">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase">
              Current Asset
            </p>
            <p className="mt-1 text-lg font-black">{room.product.name}</p>
          </div>

          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase">
              Baseline Unit Price
            </p>
            <p className="mt-1 text-lg font-black text-green-600">
              ${room.product.price_per_unit} / TON
            </p>
          </div>
        </div>
      </section>

      {/* ANALYTICS */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* REVENUE */}
        <Card className="group rounded-[2rem] p-8 shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-black text-slate-400 uppercase">
              Total Revenue
            </p>
            <ChartLineUp
              size={20}
              className="text-green-500 transition-transform group-hover:scale-110"
            />
          </div>

          <p className="mt-3 text-4xl font-black tracking-tight">
            ${room.analytics.total_revenue.toLocaleString()}
          </p>

          <RevenueChart data={room.analytics.monthly_growth} />
        </Card>

        {/* MEMBERS MAP */}
        <Card className="rounded-[2rem] p-8 shadow-sm ring-1 ring-slate-100">
          <p className="mb-6 text-[10px] font-black text-slate-400 uppercase">
            Room Activity Map
          </p>

          <div className="space-y-4">
            {room.members.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between rounded-xl px-2 py-2 transition hover:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <MapPin size={14} className="text-primary" />
                  </div>
                  <span className="text-xs font-bold">{m.name}</span>
                </div>

                <Badge variant="outline" className="text-[9px] font-black">
                  {m.location}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>

    {/* RIGHT */}
    <aside className="space-y-6 lg:col-span-4">
      {/* MEETINGS CARD */}
      <Card className="relative overflow-hidden rounded-[2rem] bg-black p-6 text-white shadow-lg">
        <div className="relative z-10">
          <h4 className="text-xs font-black tracking-widest uppercase opacity-60">
            Pending Meetings
          </h4>

          <div className="mt-4 space-y-3 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
            <p className="text-xs italic opacity-80">
              No meetings scheduled yet.
            </p>

            <Button className="w-full rounded-lg bg-white text-[10px] font-black text-black uppercase transition hover:bg-slate-200">
              Upload Minutes
            </Button>
          </div>
        </div>

        {/* subtle glow instead of harsh icon */}
        <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-white/5 blur-2xl" />

        <VideoCamera
          size={100}
          className="absolute -right-6 -bottom-6 rotate-12 text-white/10"
        />
      </Card>

      {/* QUICK STATS (new but minimal) */}
      <Card className="rounded-[2rem] p-6 shadow-sm ring-1 ring-slate-100">
        <p className="mb-4 text-[10px] font-black text-slate-400 uppercase">
          Quick Stats
        </p>

        <div className="space-y-3 text-xs font-bold">
          <div className="flex justify-between">
            <span>Active Deals</span>
            <span>{room.analytics.active_deals}</span>
          </div>

          <div className="flex justify-between">
            <span>Members</span>
            <span>{room.members.length}</span>
          </div>
        </div>
      </Card>
    </aside>
  </TabsContent>
)

const RenderLogistics = ({ room }: { room: Room }) => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "in_transit":
        return "bg-blue-100 text-blue-700"
      case "delivered":
        return "bg-green-100 text-green-700"
      case "pending":
        return "bg-amber-100 text-amber-700"
      default:
        return "bg-slate-100 text-slate-600"
    }
  }

  return (
    <TabsContent value="logistics" className="space-y-6 outline-none">
      {room.shipments.map((ship) => (
        <Card
          key={ship.id}
          className="rounded-[2.5rem] bg-white p-10 shadow-sm ring-1 ring-slate-100 transition hover:shadow-md"
        >
          <div className="flex flex-col gap-10 md:flex-row">
            {/* LEFT */}
            <div className="flex-1 space-y-8">
              {/* HEADER */}
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black tracking-tight italic">
                  Shipment {ship.id}
                </h3>

                <Badge
                  className={`px-4 font-black ${getStatusStyle(ship.status)}`}
                >
                  {ship.status.replace("_", " ").toUpperCase()}
                </Badge>
              </div>

              {/* INFO BLOCK */}
              <div className="grid grid-cols-2 gap-8">
                {/* Carrier */}
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase">
                    Carrier
                  </p>
                  <p className="text-sm font-black">{ship.carrier.name}</p>
                  <p className="text-[11px] text-slate-500">
                    {ship.carrier.company}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {ship.carrier.tel}
                  </p>
                </div>

                {/* Parties */}
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase">
                    Parties
                  </p>
                  <p className="text-xs font-bold">
                    Sender: <span className="text-primary">{ship.sender}</span>
                  </p>
                  <p className="text-xs font-bold">
                    Receiver:{" "}
                    <span className="text-primary">{ship.receiver}</span>
                  </p>
                </div>
              </div>

              {/* ROUTE */}
              <div className="rounded-xl border bg-slate-50 px-4 py-5">
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-slate-400" />

                  <div className="flex flex-1 items-center justify-between text-[10px] font-black uppercase">
                    {ship.route.map((p, i) => (
                      <React.Fragment key={p}>
                        <span className="tracking-wider">{p}</span>

                        {i < ship.route.length - 1 && (
                          <div className="mx-2 flex-1 border-t border-dashed border-slate-300" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  <AirplaneTilt size={18} className="text-primary" />
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-4 pt-2">
                <Button
                  variant="outline"
                  className="h-12 flex-1 rounded-xl border-red-200 text-[10px] font-black text-red-500 uppercase hover:bg-red-50"
                >
                  Cancel
                </Button>

                <Button className="h-12 flex-1 rounded-xl bg-black text-[10px] font-black text-white uppercase hover:opacity-90">
                  Update Location
                </Button>
              </div>
            </div>

            {/* RIGHT (QR stays same) */}
            <div className="w-full md:w-80">
              <QRWorkflow
                shipment={ship}
                onConfirm={() => alert("Shipment Verified!")}
              />
            </div>
          </div>
        </Card>
      ))}
    </TabsContent>
  )
}

const RenderCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [open, setOpen] = useState(false)
  const [events, setEvents] = useState(mockEvents)

  const monthKey = date
    ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
    : ""

  const currentMonthEvents = events.filter((e) => e.date.startsWith(monthKey))

  const sortedEvents = [...currentMonthEvents].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )

  return (
    <TabsContent value="calendar" className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="rounded-2xl p-4">
          <input
            type="date"
            value={date ? date.toISOString().split("T")[0] : ""}
            onChange={(e) =>
              setDate(e.target.value ? new Date(e.target.value) : undefined)
            }
            className="w-full rounded-md border p-2"
          />
        </Card>

        <Card className="rounded-2xl p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-black uppercase">
              Month Events ({monthKey})
            </h2>

            <Button onClick={() => setOpen(true)}>Add Event</Button>
          </div>

          {sortedEvents.length === 0 ? (
            <p className="text-xs text-muted-foreground">
              No events this month
            </p>
          ) : (
            <div className="space-y-3">
              {sortedEvents.map((e) => (
                <div
                  key={e.id}
                  className="flex justify-between rounded-xl border bg-white p-4"
                >
                  <div>
                    <p className="text-sm font-black">{e.activity}</p>
                    <p className="text-xs text-muted-foreground">{e.details}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs font-bold">{e.date}</p>
                    <span className="text-[10px] text-primary uppercase">
                      {e.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {open && (
        <AddEventModal
          onClose={() => setOpen(false)}
          onSave={(newEvent) => {
            setEvents((prev) => [...prev, newEvent])
            setOpen(false)
          }}
        />
      )}
    </TabsContent>
  )
}

const AddEventModal = ({
  onClose,
  onSave,
}: {
  onClose: () => void
  onSave: (e: CalendarEvent) => void
}) => {
  const [form, setForm] = useState({
    date: "",
    activity: "",
    details: "",
  })

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 p-4">
      <Card className="w-full max-w-lg space-y-4 rounded-2xl p-6">
        <h2 className="text-sm font-black uppercase">Create Event</h2>

        <Input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <Input
          placeholder="Activity"
          value={form.activity}
          onChange={(e) => setForm({ ...form, activity: e.target.value })}
        />

        <Textarea
          placeholder="Details"
          value={form.details}
          onChange={(e) => setForm({ ...form, details: e.target.value })}
        />

        <div className="flex gap-2">
          <Button
            className="flex-1"
            onClick={() =>
              onSave({
                id: crypto.randomUUID(),
                date: form.date,
                activity: form.activity,
                details: form.details,
                status: "pending",
              })
            }
          >
            Save
          </Button>

          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  )
}

const RenderContract = ({ room }: { room: Room }) => {
  const [signed, setSigned] = useState<string[]>([])

  const toggleSign = (id: string) => {
    setSigned((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  return (
    <TabsContent value="contract" className="space-y-8 outline-none">
      {/* HEADER */}
      <Card className="rounded-[2.5rem] border-none bg-white p-10 shadow-sm ring-1 ring-slate-100">
        <h2 className="text-2xl font-black tracking-tight">
          Trade Contract Agreement
        </h2>
        <p className="mt-2 text-xs text-slate-500">
          This contract governs the extraction, transport, and sale of{" "}
          <span className="font-bold">{room.product.name}</span> under the
          chamber <span className="font-bold">{room.name}</span>.
        </p>
      </Card>

      {/* ROLE DISTRIBUTION */}
      <Card className="rounded-[2rem] border-none bg-white p-8 shadow-sm ring-1 ring-slate-100">
        <p className="mb-6 text-[10px] font-black text-slate-400 uppercase">
          Benefit Distribution
        </p>

        <div className="space-y-4">
          {room.members.map((m) => (
            <div
              key={m.id}
              className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3"
            >
              <div>
                <p className="text-sm font-black">{m.name}</p>
                <p className="text-[10px] text-slate-400">{m.role}</p>
              </div>

              {/* mock percentage logic */}
              <Badge className="bg-primary/10 font-black text-primary">
                {m.role.includes("Admin")
                  ? "40%"
                  : m.role.includes("Purchaser")
                    ? "35%"
                    : "25%"}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* LEGAL TERMS */}
      <Card className="rounded-[2rem] border-none bg-white p-8 shadow-sm ring-1 ring-slate-100">
        <p className="mb-6 text-[10px] font-black text-slate-400 uppercase">
          Legal Terms & Conditions
        </p>

        <div className="space-y-4 text-xs leading-relaxed text-slate-600">
          <p>
            • All mineral exports must comply with origin country mining laws
            and international trade regulations.
          </p>
          <p>
            • Payment settlement is required before final shipment release
            unless otherwise negotiated and recorded.
          </p>
          <p>
            • Quality verification must be completed at destination refinery
            before acceptance.
          </p>
          <p>
            • Disputes will be resolved through neutral arbitration agreed upon
            by all parties.
          </p>
        </div>
      </Card>

      {/* CLARIFICATIONS */}
      <Card className="rounded-[2rem] border-none bg-white p-8 shadow-sm ring-1 ring-slate-100">
        <p className="mb-6 text-[10px] font-black text-slate-400 uppercase">
          Required Clarifications
        </p>

        <div className="space-y-3">
          {[
            "Confirm lithium grade purity (%)",
            "Finalize transport insurance coverage",
            "Verify export licensing documents",
            "Agree on delivery deadlines",
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg border px-4 py-3"
            >
              <span className="text-xs font-bold">{item}</span>
              <Badge variant="outline" className="text-[9px] font-black">
                Pending
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* SIGNATURES */}
      <Card className="rounded-[2.5rem] border-none bg-black p-8 text-white shadow-sm">
        <p className="mb-6 text-[10px] font-black uppercase opacity-60">
          Digital Signatures
        </p>

        <div className="space-y-4">
          {room.members.map((m) => {
            const isSigned = signed.includes(m.id)

            return (
              <div
                key={m.id}
                className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-black">{m.name}</p>
                  <p className="text-[10px] opacity-60">{m.role}</p>
                </div>

                <Button
                  onClick={() => toggleSign(m.id)}
                  className={`h-10 rounded-lg text-[10px] font-black uppercase ${
                    isSigned
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-white text-black hover:bg-slate-200"
                  }`}
                >
                  {isSigned ? "Signed" : "Sign"}
                </Button>
              </div>
            )
          })}
        </div>

        <div className="mt-6 text-right text-[10px] opacity-60">
          {signed.length}/{room.members.length} parties signed
        </div>
      </Card>
    </TabsContent>
  )
}
type CalendarEvent = {
  id: string
  date: string // ISO: "2026-04-03"
  activity: string
  status: "pending" | "confirmed" | "done"
  details: string
}
const mockEvents: CalendarEvent[] = [
  // April (current focus example)
  {
    id: "1",
    date: "2026-04-03",
    activity: "Shipment Load",
    status: "pending",
    details: "12 tons lithium loading",
  },
  {
    id: "2",
    date: "2026-04-03",
    activity: "Compliance Check",
    status: "confirmed",
    details: "Legal verification",
  },

  // May
  {
    id: "3",
    date: "2026-05-05",
    activity: "Refinery Drop",
    status: "pending",
    details: "Singapore delivery",
  },

  // January (past)
  {
    id: "4",
    date: "2026-01-20",
    activity: "Contract Signing",
    status: "done",
    details: "Initial agreement signed",
  },
  {
    id: "5",
    date: "2026-01-20",
    activity: "First Shipment",
    status: "done",
    details: "Export initiated",
  },
]
export const RoomInterior = () => {
  const navigate = useNavigate()
  const { roomName } = useParams<{ roomName: string }>()
  const [activeTab, setActiveTab] = useState("overview")
  const [meeting, setMeeting] = useState(false)

  if (!roomName) {
    alert("select a room first")
    navigate("/Chamber")
    return null
  }

  const handleBack = () => {
    navigate("/Chamber")
  }

  const room = getRoom(roomName)
  if (room === null) {
    alert(`no room of ${roomName} found`)
    navigate("/Chamber")
    return null
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-txt-default">
      <AnimatePresence>
        {meeting && <RenderSetMeeting setMeeting={setMeeting} />}
      </AnimatePresence>
      {/* ROOM HEADER */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b bg-background px-4 py-2">
        <div className="flex items-center gap-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="rounded-xl border-2 border-border"
          >
            <CaretRightIcon className="rotate-180" size={20} />
          </Button>
          <img
            src={room.product.images[0]}
            alt="Product"
            className="hidden h-14 w-14 overflow-hidden rounded-2xl border-2 border-slate-100 object-cover md:block"
          />
          <div className="flex flex-col justify-end">
            <h2 className="text-xl font-black tracking-tighter">
              {room!.name}
            </h2>
            <p className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">
              {room.id}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button
            className="h-10 rounded-xl bg-black px-5 text-xs font-bold tracking-widest text-white uppercase"
            onClick={() => setMeeting(true)}
          >
            Schedule Meeting
          </Button>
          <div className="flex -space-x-3">
            {room.members.map((m: any) => (
              <div
                key={m.id}
                className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-slate-100 text-[10px] font-black shadow-sm"
                title={m.role}
              >
                {m.avatar}
              </div>
            ))}
            <button className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-primary text-white shadow-sm">
              <Plus size={16} weight="bold" />
            </button>
          </div>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <nav className="flex h-16 items-center gap-8 border-b bg-white px-8">
        {["overview", "contract", "logistics", "calendar", "chat"].map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`h-full border-b-2 text-[10px] font-black tracking-widest uppercase transition-all ${activeTab === tab ? "border-primary text-primary" : "border-transparent text-slate-400 hover:text-slate-600"}`}
            >
              {tab}
            </button>
          )
        )}
      </nav>

      <main className="mx-auto w-full max-w-[1400px] flex-1 p-8">
        <Tabs value={activeTab} className="w-full">
          {/* 1. OVERVIEW: ANALYTICS & MOTIVE */}
          <RenderOverview room={room} />
          {/* Contract */}
          <RenderContract room={room} />
          {/* 2. LOGISTICS: SHIPMENTS & QR */}
          <RenderLogistics room={room} />

          {/* 3. CALENDAR: ACTIVITIES & SUGGESTIONS */}
          <RenderCalendar room={room} />

          {/* 4. CHAT AREA */}
          <TabsContent
            value="chat"
            className="flex h-[600px] flex-col overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-100 outline-none"
          >
            <div className="flex-1 space-y-4 overflow-y-auto p-8">
              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-full bg-slate-200" />
                <div className="max-w-md rounded-2xl rounded-tl-none bg-slate-100 p-4">
                  <p className="text-xs font-medium">
                    Hello team, the mining certificate has been renewed. Please
                    check the contract tab.
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <div className="max-w-md rounded-2xl rounded-tr-none bg-primary p-4 text-white">
                  <p className="text-xs font-medium">
                    Understood. I'll verify the shipment scan now.
                  </p>
                </div>
                <div className="h-10 w-10 shrink-0 rounded-full bg-slate-200" />
              </div>
            </div>
            <div className="flex gap-4 border-t bg-slate-50 p-6">
              <Input
                placeholder="Type a secure message..."
                className="h-12 rounded-xl border-slate-200 bg-white"
              />
              <Button className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white">
                <Chats size={24} />
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
