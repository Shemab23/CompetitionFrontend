import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  SortDescendingIcon,
  SortAscendingIcon,
  MagnifyingGlassIcon,
} from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Message } from "@/components/Message"
import { fadeIn } from "@/utilits/animations"
import { FingerprintIcon } from "lucide-react"

// --- 1. TYPES & SCHEMAS ---
const COMM_FILTERS = ["proposal", "negotiation", "logistics", "system"] as const
type CommType = (typeof COMM_FILTERS)[number]
type ShipmentStatus = "collection" | "in_transit" | "delivered"

interface LogEntry {
  id: string
  user: string
  content: string
  time: string
  isSystem?: boolean
}

interface Message {
  id: string
  type: CommType
  sender: string
  title: string
  isProtected: boolean
  timestamp: Date
  details: string
  logs: LogEntry[]
  shipment?: {
    status: ShipmentStatus
    lastLog: string
    driverName: string
    manifest: string[]
  }
  proposalData?: {
    votesFor: number
    votesAgainst: number
    threshold: number
    legalId: string
  }
}

// --- 2. STATIC MOCK DATA (Outside component to avoid "Impure Function" errors) ---
const MESSAGES: Message[] = [
  {
    id: "1",
    type: "logistics",
    sender: "Alpha Traders",
    title: "Batch A: 500kg Lithium",
    isProtected: false,
    timestamp: new Date("2026-04-12T10:00:00"),
    details: "High-grade lithium shipment destined for Sector 7 manufacturing.",
    logs: [
      {
        id: "l1",
        user: "System",
        content: "Shipment Initiated",
        time: "10:00",
        isSystem: true,
      },
      {
        id: "l2",
        user: "Marcus V.",
        content: "Asset collected and secured.",
        time: "11:30",
      },
    ],
    shipment: {
      status: "in_transit",
      lastLog: "Customs cleared at Port Sector 7",
      driverName: "Marcus V.",
      manifest: ["Lithium-Ion Cells", "Safety Cert 99", "Export Permit"],
    },
  },
  {
    id: "2",
    type: "proposal",
    sender: "Global Union",
    title: "Tariff Amendment #41",
    isProtected: true,
    timestamp: new Date("2026-04-12T09:00:00"),
    details: "Voting on a 2% reduction for textile export duties.",
    logs: [
      {
        id: "p1",
        user: "Admin",
        content: "Proposal drafted for review.",
        time: "09:00",
      },
    ],
    proposalData: {
      votesFor: 14,
      votesAgainst: 3,
      threshold: 20,
      legalId: "REG-2026-44",
    },
  },
  {
    id: "3",
    type: "negotiation",
    sender: "Delta Corp",
    title: "Pricing Tier: Sapphire Grade",
    isProtected: false,
    timestamp: new Date("2026-04-11T12:00:00"),
    details: "Negotiating bulk discount requirements for the next quarter.",
    logs: [
      {
        id: "n1",
        user: "Delta Corp",
        content: "Awaiting insurance proof to lock track.",
        time: "Yesterday",
      },
    ],
  },
  {
    id: "4",
    type: "negotiation",
    sender: "Delta Corp2",
    title: "Pricing Tier: Sapphire Grade2 ",
    isProtected: false,
    timestamp: new Date("2026-08-11T12:00:00"),
    details: "Negotiating bulk discount requirements for the next quarter.",
    logs: [
      {
        id: "n1",
        user: "Delta Corp",
        content: "Awaiting insurance proof to lock track.",
        time: "Yesterday",
      },
    ],
  },
]

// --- 3. MAIN COMPONENT ---
export const Communicate = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMsg, setSelectedMsg] = useState<Message | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isPrivateMode, setIsPrivateMode] = useState(false)
  const [sort, setSort] = useState("asc") // desc
  const [filter, setFilter] = useState("All") // CommType

  const filteredMessages = useMemo(() => {
    const sortfx =
      sort === "asc"
        ? (a: Message, b: Message) =>
            a.timestamp.getTime() - b.timestamp.getTime()
        : (a: Message, b: Message) =>
            b.timestamp.getTime() - a.timestamp.getTime()

    return MESSAGES.filter((m) => {
      const matchesSearch =
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.sender.toLowerCase().includes(searchQuery.toLowerCase())

      // Check if category matches (handling the "All" case)
      const matchesCategory =
        filter === "All" || m.type === filter.toLowerCase()

      return matchesSearch && matchesCategory
    }).sort(sortfx)
  }, [searchQuery, sort, filter]) // Added filter here

  const counts = useMemo(() => {
    return MESSAGES.reduce(
      (acc, msg) => {
        acc[msg.type] = (acc[msg.type] || 0) + 1
        acc["All"] = (acc["All"] || 0) + 1
        return acc
      },
      { All: 0 } as Record<string, number>
    )
  }, [])

  const handleOpen = (msg: Message) => {
    if (msg.isProtected && !isPrivateMode) {
      setIsVerifying(true)
      // Simulate biometric check
      setTimeout(() => {
        setIsVerifying(false)
        setIsPrivateMode(true)
        setSelectedMsg(msg)
      }, 1200)
    } else {
      setSelectedMsg(msg)
    }
  }

  return (
    <div className="mx-auto min-h-screen max-w-full bg-background p-4 font-sans text-foreground md:p-8">
      {/* HEADER */}
      <header className="mb-8 flex flex-col items-start justify-between gap-6 border-b pb-6 sm:gap-2 md:flex-row md:items-center">
        {/* Search */}
        <div className="flex w-full items-center gap-3 md:w-auto">
          <div className="relative flex-1 md:w-64">
            <MagnifyingGlassIcon
              className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
              size={16}
            />
            <Input
              placeholder="Search..."
              className="h-10 rounded-xl border-none bg-muted/50 pl-10 text-xs shadow-none focus-visible:ring-1 focus-visible:ring-primary/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Button
            variant="outline"
            size="icon"
            className="interactive-quiet rounded-xl border-none bg-muted/50"
            onClick={() => setSort((prev) => (prev === "asc" ? "desc" : "asc"))}
          >
            {sort === "asc" ? (
              <SortAscendingIcon size={18} />
            ) : (
              <SortDescendingIcon size={18} />
            )}
          </Button>
        </div>
        {/* filters */}
        <div className="md: flex items-center gap-2 md:gap-0">
          {/* Desktop Tabs */}
          <div className="hidden gap-1 rounded-2xl bg-muted/30 p-1 md:flex md:gap-0">
            {["All", ...COMM_FILTERS].map((f) => {
              // Normalize key: COMM_FILTERS are lowercase, "All" is capitalized
              const countKey = f === "All" ? "All" : f.toLowerCase()
              const count = counts[countKey] || 0

              return (
                <Button
                  key={f}
                  variant="ghost"
                  size="sm"
                  className={`relative cursor-pointer rounded-xl px-4 text-xs font-bold transition-all ${
                    filter === f
                      ? "bg-card text-primary shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setFilter(f)}
                >
                  <span className="capitalize">{f}</span>

                  {/* Floating Number: Only show if > 0 */}
                  {count > 0 && (
                    <span className="ml-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary/10 px-1 text-[9px] font-black text-primary">
                      {count}
                    </span>
                  )}
                </Button>
              )
            })}
          </div>

          {/* Mobile Dropdown - Connect the value and onChange */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="block h-10 rounded-xl border-none bg-muted/50 px-4 text-xs font-bold outline-none md:hidden"
          >
            {["All", ...COMM_FILTERS].map((f) => {
              const countKey = f === "All" ? "All" : f.toLowerCase()
              const count = counts[countKey] || 0
              return (
                <option key={f} value={f}>
                  {f} {count > 0 ? `(${count})` : ""}
                </option>
              )
            })}
          </select>
        </div>
      </header>

      <main className="grid grid-cols-1 gap-8 md:min-w-auto lg:grid-cols-12">
        {/* LEFT: LIST VIEW */}
        <div
          className={`space-y-3 lg:col-span-4 ${selectedMsg ? "hidden lg:block" : "block"}`}
        >
          <div className="mb-4 flex items-center justify-between px-2"></div>
          {filteredMessages.map((msg) => (
            <div
              key={msg.id}
              onClick={() => handleOpen(msg)}
              className={`group cursor-pointer rounded-xl border p-5 transition-all hover:bg-muted/30 ${
                selectedMsg?.id === msg.id
                  ? "border-primary bg-primary/5"
                  : "border-transparent bg-card"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div
                    className={`mt-1 h-2 w-2 rounded-full ${msg.isProtected ? "bg-orange-500" : "bg-green-500"}`}
                  />
                  <div>
                    <h3 className="text-sm leading-tight font-bold">
                      {msg.title}
                    </h3>
                    <p className="mt-1 text-[9px] font-black text-muted-foreground uppercase">
                      {msg.sender}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col">
                  <Badge variant="outline" className="text-[8px] uppercase">
                    {msg.type}
                  </Badge>
                  <p className="self-end pt-4 text-xs text-muted-foreground">
                    {msg.timestamp.getHours()}:
                    {msg.timestamp.getMinutes() < 10
                      ? "0" + msg.timestamp.getMinutes().toString()
                      : msg.timestamp.getMinutes()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: THREAD VIEW */}
        <Message selectedMsg={selectedMsg} setSelectedMsg={setSelectedMsg} />
      </main>

      {/* BIOMETRIC OVERLAY */}
      <AnimatePresence>
        {isVerifying && (
          <motion.div
            variants={fadeIn}
            className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-background/95 backdrop-blur-xl"
          >
            <FingerprintIcon size={64} className="animate-pulse text-primary" />
            <h3 className="mt-6 text-2xl font-black tracking-tighter uppercase italic">
              Verifying Authorization
            </h3>
            <p className="mt-2 text-[10px] font-black tracking-[0.4em] text-muted-foreground uppercase">
              Nobel Protocol Secure Ledger Access
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
