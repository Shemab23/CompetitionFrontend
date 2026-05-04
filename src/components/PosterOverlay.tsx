import {
  CheckCircleIcon,
  ImageSquareIcon,
  MapPinIcon,
  XIcon,
} from "@phosphor-icons/react"
import { motion } from "framer-motion"
import { useState } from "react"
import { Button } from "./ui/button"

interface Post {
  id: string
  author: AuthorSummary
  title: string
  content: string
  category: string
  price: Money
  images: PostImage[]
  status: "active" | "sold" | "pending"
  location: { address: string; city: string; country: string }
}
interface Money {
  amount: number
  currency: string
}
interface PostImage {
  url: string
  alt?: string
}

interface AuthorSummary {
  name: string
  type: "individual" | "entity"
  bio: string
  verified: boolean
  country: string
  flag: string // Emoji flag for quick hint
}

const CURRENCY_RATES: Record<string, number> = { USD: 1, EUR: 0.92, GBP: 0.79 }

export function PostOverlay({
  post,
  prefCurrency,
  onClose,
}: {
  post: Post
  prefCurrency: string
  onClose: () => void
}) {
  const [activeImg, setActiveImg] = useState(0)
  const convertedPrice = (
    post.price.amount * CURRENCY_RATES[prefCurrency]
  ).toLocaleString()

  const openMaps = () => {
    const query = encodeURIComponent(
      `${post.location.address}, ${post.location.city}, ${post.location.country}`
    )
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${query}`,
      "_blank"
    )
  }

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-background/90 backdrop-blur-md"
      />
      <motion.div
        layoutId={post.id}
        className="relative flex h-full max-h-187.5 w-full max-w-5xl flex-col overflow-hidden rounded-[2.5rem] border bg-card shadow-2xl md:flex-row"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 rounded-full bg-background/50 p-2 transition-colors hover:bg-red-500 hover:text-white"
        >
          <XIcon size={22} weight="bold" />
        </button>

        {/* Left: Gallery */}
        <div className="flex w-full flex-col bg-muted p-4 md:w-1/2">
          <div className="flex flex-1 items-center justify-center overflow-hidden rounded-3xl bg-background/40">
            <ImageSquareIcon size={100} weight="thin" className="opacity-10" />
          </div>
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
            {post.images.map((img, i) => (
              <div
                key={i}
                className={`h-16 w-16 cursor-pointer rounded-xl border-2 transition-all ${activeImg === i ? "border-primary" : "border-transparent"}`}
                onClick={() => setActiveImg(i)}
              >
                <div className="h-full w-full rounded-lg bg-background/50" />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Detailed Analysis */}
        <div className="flex w-full flex-col overflow-y-auto p-10 md:w-1/2">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-xl font-black text-primary">
              {post.author.flag}
            </div>
            <div>
              <h4 className="flex items-center gap-1 text-sm leading-none font-black uppercase">
                {post.author.name}{" "}
                <CheckCircleIcon
                  size={14}
                  className="text-primary"
                  weight="fill"
                />
              </h4>
              <p className="mt-1 line-clamp-1 text-[10px] text-muted-foreground italic">
                {post.author.bio}
              </p>
            </div>
          </div>

          <h2 className="mb-4 text-3xl font-black tracking-tight uppercase">
            {post.title}
          </h2>
          <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
            {post.content}
          </p>

          <div className="mb-8 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border bg-muted/30 p-4">
              <span className="text-[10px] font-bold text-muted-foreground uppercase">
                Compliance
              </span>
              <p className="mt-1 text-xs font-bold">Verified Audit #892</p>
            </div>
            <div className="rounded-2xl border bg-muted/30 p-4">
              <span className="text-[10px] font-bold text-muted-foreground uppercase">
                Sector
              </span>
              <p className="mt-1 text-xs font-bold">{post.category}</p>
            </div>
          </div>

          <div className="mt-auto space-y-5 border-t pt-8">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-[10px] font-black tracking-widest text-primary uppercase">
                  Market Valuation
                </span>
                <div className="text-4xl font-black">
                  {convertedPrice}{" "}
                  <span className="text-lg font-medium text-muted-foreground">
                    {prefCurrency}
                  </span>
                </div>
              </div>
              <div
                className={`rounded-full px-3 py-1 text-[10px] font-black uppercase ${post.status === "active" ? "bg-green-500 text-white" : "bg-orange-500 text-white"}`}
              >
                {post.status}
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="h-16 flex-1 rounded-[1.25rem] text-sm font-black tracking-widest uppercase shadow-xl shadow-primary/20">
                Initiate Deal
              </Button>
              <Button
                variant="outline"
                className="h-16 w-16 rounded-[1.25rem] border-2 hover:bg-muted"
                onClick={openMaps}
              >
                <MapPinIcon size={26} />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
