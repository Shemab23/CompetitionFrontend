import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { fadeUp, staggerContainer, Swap } from "@/utilits/animations"
import { useGlobalContext } from "@/utilits/Hooks/General"
import { CATEGORIES } from "@/utilits/General"
import { FeedHeader } from "@/components/FeedHeader"
import { MarketCard } from "@/components/MarketCard"
import { PostOverlay } from "@/components/PosterOverlay"
import { MarketCardSkeleton } from "@/components/MarketCardSkeleton"

// --- 1. TYPES & MOCK CONSTANTS ---

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

// --- 2. MAIN COMPONENT ---

export function MarketFeed() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const { prefCurrency } = useGlobalContext()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  // MOCK DATA GENERATION
  const posts: Post[] = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: `post-${i}`,
      author: {
        name: i % 2 === 0 ? "Global Logistics Corp" : "John O'Sourcing",
        type: i % 2 === 0 ? "entity" : "individual",
        bio: "Specializing in high-yield trade routes and certified supply chains.",
        verified: true,
        country: i % 2 === 0 ? "Germany" : "Kenya",
        flag: i % 2 === 0 ? "🇩🇪" : "🇰🇪",
      },
      title: `${CATEGORIES[i % 4]} High-Grade Supply #${200 + i}`,
      content:
        "Verified batch with full documentation. Sourced directly from local hubs with Nobel integrity standards.",
      category: CATEGORIES[i % 4],
      price: { amount: 2500 + i * 400, currency: "USD" },
      images: [
        {
          url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          url: "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          url: "https://images.unsplash.com/photo-1584699006710-3ad3b82fce7f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
      ],
      status: i === 3 ? "pending" : "active",
      location: {
        address: "Industrial Way 12",
        city: "Berlin",
        country: "Germany",
      },
    }))
  }, [])

  const filteredPosts = posts.filter(
    (p) =>
      (selectedCategory === "All" || p.category === selectedCategory) &&
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnimatePresence mode="wait">
        <motion.div
          key="feed"
          variants={Swap}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <FeedHeader
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setSelectedCategory={setSelectedCategory}
          />

          <main className="mx-auto max-w-7xl px-4 pb-20">
            {/* 1. Applying staggerContainer to the grid */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {isLoading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <MarketCardSkeleton key={i} />
                  ))
                : filteredPosts.map((p) => (
                    <MarketCard
                      key={p.id}
                      post={p}
                      prefCurrency={prefCurrency}
                      onClick={setSelectedPost}
                      // 2. Each card now inherits the fadeUp motion
                      variants={fadeUp}
                    />
                  ))}
            </motion.div>
          </main>
        </motion.div>
      </AnimatePresence>
      <AnimatePresence>
        {selectedPost && (
          <PostOverlay
            post={selectedPost}
            prefCurrency={prefCurrency}
            onClose={() => setSelectedPost(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
