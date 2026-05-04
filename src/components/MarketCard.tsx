import {
  ArrowRightIcon,
  BuildingsIcon,
  CheckCircleIcon,
  ImageSquareIcon,
  UserIcon,
} from "@phosphor-icons/react"
import { motion, type Variants } from "framer-motion"

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

const CURRENCY_RATES: Record<string, number> = { USD: 1, EUR: 0.92, GBP: 0.79 }

export function MarketCard({
  post,
  prefCurrency,
  onClick,
  variants,
}: {
  post: Post
  prefCurrency: string
  onClick: (p: Post) => void
  variants: Variants
}) {
  const convertedPrice = (
    post.price.amount * CURRENCY_RATES[prefCurrency]
  ).toLocaleString()

  return (
    <motion.div
      variants={variants}
      layoutId={post.id}
      onClick={() => onClick(post)}
      className="group cursor-pointer rounded-2xl border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-2xl"
    >
      <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-xl bg-muted">
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1 rounded-full bg-background/90 px-2 py-0.5 text-[9px] font-black tracking-tighter uppercase shadow-sm">
          <span>{post.author.flag}</span> {post.author.country}
        </div>
        <div className="flex h-full items-center justify-center opacity-10 transition-transform group-hover:scale-110">
          <ImageSquareIcon size={64} />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-1.5 text-[9px] font-bold tracking-widest text-primary uppercase">
          {post.author.type === "entity" ? (
            <BuildingsIcon weight="fill" />
          ) : (
            <UserIcon weight="fill" />
          )}
          {post.author.name}{" "}
          {post.author.verified && <CheckCircleIcon size={12} weight="fill" />}
        </div>
        <h3 className="text-md line-clamp-1 leading-tight font-bold">
          {post.title}
        </h3>

        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-muted-foreground uppercase">
              Offer
            </span>
            <span className="text-lg font-black">
              {convertedPrice} {prefCurrency}
            </span>
          </div>
          <ArrowRightIcon className="text-muted-foreground transition-colors group-hover:text-primary" />
        </div>
      </div>
    </motion.div>
  )
}
