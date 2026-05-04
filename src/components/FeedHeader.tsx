import { slideInRight } from "@/utilits/animations"
import { motion } from "framer-motion"
import { Button } from "./ui/button"
import { GlobeIcon, MagnifyingGlassIcon } from "@phosphor-icons/react"
import { useGlobalContext } from "@/utilits/Hooks/General"
import { Input } from "./ui/input"
import { CATEGORIES } from "@/utilits/General"

type props = {
  searchQuery: string
  setSearchQuery: (query: string) => void
  setSelectedCategory: (category: string) => void
}

export const FeedHeader = ({
  searchQuery,
  setSearchQuery,
  setSelectedCategory,
}: props) => {
  const { prefCurrency } = useGlobalContext()
  return (
    <header className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <motion.div variants={slideInRight}>
          <h1 className="text-4xl font-black tracking-tight uppercase">
            Trading Floor
          </h1>
          <Button
            variant="outline"
            className="flex w-fit cursor-pointer items-center gap-2 rounded-xl border-2 px-2 py-1 text-sm font-bold text-muted-foreground"
          >
            <GlobeIcon /> {prefCurrency}
          </Button>
        </motion.div>
        <div className="flex flex-wrap gap-3">
          {/* --- search bar */}
          <div className="relative min-w-50 flex-1 rounded-xl border-2 border-muted-foreground/30">
            <MagnifyingGlassIcon
              className="absolute top-3 left-3 text-muted-foreground"
              size={18}
            />
            <Input
              placeholder="Find assets..."
              className="rounded-xl pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {/* --- category selector */}
          <select
            className="h-10 rounded-xl border bg-card px-4 text-[10px] font-black uppercase outline-none focus:ring-2 focus:ring-primary/20"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Sectors</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  )
}
