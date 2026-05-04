import type { FC } from "react"
interface InputBlockProps {
  label: string
  icon: React.ElementType
  value: string
  onChange: (val: string) => void
  type?: string
  error?: boolean
  errorMessage?: string
  placeholder?: string
  maxLength?: number
}
export const InputBlock: FC<InputBlockProps> = ({
  label,
  icon: Icon,
  value,
  onChange,
  maxLength = 100,
  type = "text",
  error = false,
  errorMessage = "",
  placeholder = "",
}) => (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase">
      <Icon size={14} /> {label}
    </label>
    <input
      type={type}
      maxLength={maxLength}
      className={`h-12 w-full rounded-xl border bg-card px-4 transition-all outline-none ${error ? "border-red-500 ring-red-500/10 focus:ring-4" : "focus:ring-2 focus:ring-primary/20"}`}
      value={value || ""}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
    {error && (
      <p className="text-[10px] font-bold text-red-500">{errorMessage}</p>
    )}
  </div>
)
