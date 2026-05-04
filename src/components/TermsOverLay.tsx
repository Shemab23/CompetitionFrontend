import { termsData } from "@/utilits/services/login"
import { AnimatePresence } from "framer-motion"
import { ModalCard, Overlay } from "./MotionWrappers"
import { useTerms } from "@/utilits/Hooks/login"

export function TermsOverlay() {
  const { showTerms, setShowTerms } = useTerms()
  return (
    <AnimatePresence>
      {showTerms && (
        <Overlay
          className="bg-black/60 backdrop-blur-md"
          onClick={() => setShowTerms(false)} // Closes modal if you click outside the card
        >
          <ModalCard className="relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
            {/* Header */}
            <div className="border-b bg-muted/20 p-6">
              <h2 className="heading-chamber text-2xl">{termsData.title}</h2>
              <p className="label-serious mt-1">
                Version {termsData.version} • {termsData.lastUpdated}
              </p>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 space-y-6 overflow-y-auto p-8 text-sm leading-relaxed">
              {termsData.sections.map((section) => (
                <div key={section.id} className="space-y-2">
                  <h3 className="font-heading font-bold text-foreground">
                    0{section.id}. {section.heading}
                  </h3>
                  <p className="text-muted-foreground">{section.content}</p>
                </div>
              ))}

              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-xs text-txt-primary italic">
                By utilizing the NobelSource Hub, you agree to facilitate a fair
                and transparent supply chain.
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end border-t bg-muted/10 p-6">
              <button
                onClick={() => setShowTerms(false)}
                className="rounded-xl bg-primary px-8 py-3 font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Accept & Continue
              </button>
            </div>
          </ModalCard>
        </Overlay>
      )}
    </AnimatePresence>
  )
}
