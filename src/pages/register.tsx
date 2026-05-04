import * as React from "react"
import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import {
  BriefcaseIcon,
  ShieldCheckIcon,
  TagChevronIcon,
  CloudArrowUpIcon,
  CheckCircleIcon,
  WarningCircleIcon,
  FileIcon,
  TrashIcon,
} from "@phosphor-icons/react"
import { Register_credentials } from "@/components/Register_credentials"
import { useGlobalContext } from "@/utilits/Hooks/General"
import { Register_profile } from "@/components/Register_profile"

// import { useState } from "react"
// import { authService } from "@/services/auth"
// import { Button } from "@/components/ui/button"
// import type { Register, RegisterResponse } from "@/types/api"

// // helper → normalize custom claim
// const normalize = (s: string) => s.toLowerCase().trim().replace(/\s+/g, "_")

// const CLAIM_OPTIONS = ["fish_trader", "fish_supplier", "driver", "mineral_sale"]

// export const Test = () => {
//   const [step, setStep] = useState(1)

//   const [form, setForm] = useState<Register>({
//     email: "",
//     password: "",
//     registration_number: "",

//     metadata: {
//       profile: {
//         name: "",
//         phone: "",
//         country: "",
//         website: "",
//         currency: "USD",
//       },
//       permissions: [],
//     },

//     permission_keys: [],
//     display_image: undefined,
//     permissions: [],
//   })

//   const [customClaim, setCustomClaim] = useState("")
//   const [result, setResult] = useState<RegisterResponse | null>(null)

//   // =========================
//   // PROFILE UPDATE
//   // =========================
//   const updateProfile = (key: string, value: string) => {
//     setForm((prev) => ({
//       ...prev,
//       metadata: {
//         ...prev.metadata,
//         profile: {
//           ...prev.metadata.profile,
//           [key]: value,
//         },
//       },
//     }))
//   }

//   // =========================
//   // CLAIM TOGGLE
//   // =========================
//   const toggleClaim = (claim: string) => {
//     setForm((prev) => {
//       const exists = prev.permission_keys.includes(claim)

//       const updatedKeys = exists
//         ? prev.permission_keys.filter((c) => c !== claim)
//         : [...prev.permission_keys, claim]

//       return {
//         ...prev,
//         permission_keys: updatedKeys,
//         metadata: {
//           ...prev.metadata,
//           permissions: updatedKeys.map((c) => ({ right: c })),
//         },
//       }
//     })
//   }

//   // =========================
//   // ADD CUSTOM CLAIM
//   // =========================
//   const addCustomClaim = () => {
//     if (!customClaim) return

//     const normalized = normalize(customClaim)

//     if (form.permission_keys.includes(normalized)) return

//     toggleClaim(normalized)
//     setCustomClaim("")
//   }

//   // =========================
//   // FILE HANDLING
//   // =========================
//   const handlePermissionFile = (index: number, file: File) => {
//     setForm((prev) => {
//       const files = [...prev.permissions]
//       files[index] = file

//       return {
//         ...prev,
//         permissions: files,
//       }
//     })
//   }

//   const handleDisplayImage = (file: File) => {
//     setForm((prev) => ({
//       ...prev,
//       display_image: file,
//     }))
//   }

//   // =========================
//   // SUBMIT
//   // =========================
//   const handleSubmit = async () => {
//     // 🚨 IMPORTANT: ensure files match claims
//     if (form.permission_keys.length !== form.permissions.length) {
//       alert("Each claim must have a file")
//       return
//     }

//     const res = await authService.register(form)
//     setResult(res)
//   }

//   // =========================
//   // UI
//   // =========================
//   return (
//     <div style={{ display: "grid", gap: 20 }}>
//       {/* STEP NAV */}
//       <div>
//         <Button onClick={() => setStep(1)}>Auth</Button>
//         <Button onClick={() => setStep(2)}>Profile</Button>
//         <Button onClick={() => setStep(3)}>Claims</Button>
//       </div>

//       {/* ================= STEP 1 ================= */}
//       {step === 1 && (
//         <div>
//           <h3>Auth</h3>

//           <input
//             placeholder="email"
//             value={form.email}
//             onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
//           />

//           <input
//             placeholder="password"
//             value={form.password}
//             onChange={(e) =>
//               setForm((p) => ({ ...p, password: e.target.value }))
//             }
//           />

//           <input
//             placeholder="registration number"
//             value={form.registration_number}
//             onChange={(e) =>
//               setForm((p) => ({
//                 ...p,
//                 registration_number: e.target.value,
//               }))
//             }
//           />
//         </div>
//       )}

//       {/* ================= STEP 2 ================= */}
//       {step === 2 && (
//         <div>
//           <h3>Profile</h3>

//           <input
//             placeholder="name"
//             value={form.metadata.profile.name}
//             onChange={(e) => updateProfile("name", e.target.value)}
//           />

//           <input
//             placeholder="phone"
//             value={form.metadata.profile.phone}
//             onChange={(e) => updateProfile("phone", e.target.value)}
//           />

//           <input
//             placeholder="country"
//             value={form.metadata.profile.country}
//             onChange={(e) => updateProfile("country", e.target.value)}
//           />

//           <input
//             placeholder="website"
//             value={form.metadata.profile.website}
//             onChange={(e) => updateProfile("website", e.target.value)}
//           />

//           <input
//             placeholder="currency"
//             value={form.metadata.profile.currency}
//             onChange={(e) => updateProfile("currency", e.target.value)}
//           />

//           <input
//             type="file"
//             onChange={(e) =>
//               e.target.files && handleDisplayImage(e.target.files[0])
//             }
//           />
//         </div>
//       )}

//       {/* ================= STEP 3 ================= */}
//       {step === 3 && (
//         <div>
//           <h3>Claims</h3>

//           {/* predefined */}
//           {CLAIM_OPTIONS.map((claim) => (
//             <div key={claim}>
//               <label>
//                 <input
//                   type="checkbox"
//                   checked={form.permission_keys.includes(claim)}
//                   onChange={() => toggleClaim(claim)}
//                 />
//                 {claim}
//               </label>
//             </div>
//           ))}

//           {/* custom */}
//           <div>
//             <input
//               placeholder="custom claim"
//               value={customClaim}
//               onChange={(e) => setCustomClaim(e.target.value)}
//             />
//             <Button onClick={addCustomClaim}>Add</Button>
//           </div>

//           {/* files */}
//           {form.permission_keys.map((claim, index) => (
//             <div key={claim}>
//               <p>{claim}</p>
//               <input
//                 type="file"
//                 onChange={(e) =>
//                   e.target.files &&
//                   handlePermissionFile(index, e.target.files[0])
//                 }
//               />
//             </div>
//           ))}
//         </div>
//       )}

//       {/* SUBMIT */}
//       <Button onClick={handleSubmit}>Register</Button>

//       {/* RESULT */}
//       {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
//     </div>
//   )
// }

// --- TYPES & INTERFACES ---

interface BusinessTag {
  name: string
  file: string | null
  fileName: string
}

interface RegistrationFormData {
  email: string
  password_hash: string
  confirm_password: string
  legal_name: string
  phone?: string
  avatar_url: string
  avatar_url_filename?: string
  registration_number: string
  reg_proof_url: string
  reg_proof_url_filename?: string
  job_title: string
  business_tags: BusinessTag[]
}

const SUPPORTED_TAGS = [
  "Agriculture",
  "Logistics",
  "Manufacturing",
  "Textiles",
] as const
// type SupportedTag = (typeof SUPPORTED_TAGS)[number]

// --- MAIN COMPONENT ---

export const Register: React.FC = () => {
  const { theme } = useTheme()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<number>(0)

  const [formData, setFormData] = useState<RegistrationFormData>({
    email: "",
    password_hash: "",
    confirm_password: "",
    legal_name: "",
    avatar_url: "",
    registration_number: "",
    reg_proof_url: "",
    job_title: "",
    business_tags: [],
  })

  // --- CORE UPDATE LOGIC ---
  const updateField = <K extends keyof RegistrationFormData>(
    name: K,
    value: RegistrationFormData[K],
    filename?: string
  ) => {
    setFormData((prev) => {
      const updated = { ...prev, [name]: value }
      if (filename) {
        // We use a type assertion here because dynamic filename keys
        // are tricky for TS to map perfectly to the interface
        //eslint-disable-next-line
        ;(updated as any)[`${String(name)}_filename`] = filename
      }
      localStorage.setItem("reg_draft", JSON.stringify(updated))
      return updated
    })
  }

  // --- MULTI-TAG HANDLERS ---
  const addTag = (tagName: string) => {
    if (!tagName) return
    const exists = formData.business_tags.find((t) => t.name === tagName)
    if (!exists) {
      const newTags: BusinessTag[] = [
        ...formData.business_tags,
        { name: tagName, file: null, fileName: "" },
      ]
      updateField("business_tags", newTags)
    }
  }

  const removeTag = (tagName: string) => {
    const newTags = formData.business_tags.filter((t) => t.name !== tagName)
    updateField("business_tags", newTags)
  }

  const updateTagFile = (
    tagName: string,
    fileData: string,
    fileName: string
  ) => {
    const newTags = formData.business_tags.map((t) =>
      t.name === tagName ? { ...t, file: fileData, fileName: fileName } : t
    )
    updateField("business_tags", newTags)
  }

  // --- VALIDATION LOGIC ---
  const passMismatch =
    formData.password_hash !== formData.confirm_password &&
    !!formData.confirm_password
  const [tab1Valid, setTab1Valid] = useState(false)
  const [tab2Valid, setTab2Valid] = useState(false)

  const stepIsInvalid = useMemo(() => {
    switch (activeTab) {
      case 0:
        return !tab1Valid
      case 1:
        return !tab2Valid
      case 2: {
        const hasBaseInfo = !!(
          formData.registration_number && formData.reg_proof_url
        )
        const hasTags = formData.business_tags.length > 0
        const allTagsUploaded = formData.business_tags.every((t) => !!t.file)
        return !hasBaseInfo || !hasTags || !allTagsUploaded
      }
      default:
        return false
    }
  }, [formData, activeTab, tab1Valid, tab2Valid])

  const logoSrc = theme === "dark" ? "/logo_white.png" : "/logo_black.png"

  const { registerData } = useGlobalContext()
  return (
    <div className="flex min-h-screen flex-col gap-8 bg-background p-6 text-foreground md:p-12">
      <header className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoSrc} className="h-10 w-10" alt="Logo" />
            <h1 className="text-xl font-black tracking-tighter uppercase italic">
              NOBEL SOURCE
            </h1>
          </div>
          <Button
            variant="destructive"
            onClick={() => {
              localStorage.removeItem("reg_draft")
              navigate("/Login")
            }}
          >
            Cancel
          </Button>
        </div>
        <div className="flex w-full max-w-md gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${activeTab >= i ? "bg-primary" : "bg-muted"}`}
            />
          ))}
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-start gap-10 md:flex-row">
        <div className="w-full flex-1 space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold tracking-tight">
                {activeTab === 0 && "Credentials"}
                {activeTab === 1 && "Profile Setup"}
                {activeTab === 2 && "Seal of Integrity"}
                {activeTab === 3 && "Final Review"}
              </h2>

              <div className="grid grid-cols-1 gap-5">
                {activeTab === 0 && (
                  <Register_credentials valid={setTab1Valid} />
                )}
                {activeTab === 1 && <Register_profile valid={setTab2Valid} />}
                {activeTab === 2 && (
                  <>
                    <InputBlock
                      label="Job Title"
                      icon={BriefcaseIcon}
                      value={formData.job_title}
                      onChange={(v) => updateField("job_title", v)}
                    />
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      <InputBlock
                        label="Registration Number"
                        icon={ShieldCheckIcon}
                        value={formData.registration_number}
                        onChange={(v) => updateField("registration_number", v)}
                      />
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase">
                          <FileIcon size={14} className="mr-1 inline" /> Proof
                          of Registration
                        </label>
                        <FileUpload
                          onUpload={(data, name) =>
                            updateField("reg_proof_url", data, name)
                          }
                          fileName={formData.reg_proof_url_filename}
                        />
                      </div>
                    </div>

                    <div className="space-y-4 border-t pt-6">
                      <label className="text-[10px] font-bold text-primary uppercase">
                        Industry Expertise & Certifications
                      </label>
                      <select
                        className="h-12 w-full rounded-xl border bg-card px-4 outline-none focus:ring-2 focus:ring-primary/20"
                        onChange={(e) => addTag(e.target.value)}
                        value=""
                      >
                        <option value="">+ Add Industry Tag</option>
                        {SUPPORTED_TAGS.filter(
                          (t) =>
                            !formData.business_tags.find((bt) => bt.name === t)
                        ).map((tag) => (
                          <option key={tag} value={tag}>
                            {tag}
                          </option>
                        ))}
                      </select>
                      <div className="flex flex-col gap-3">
                        {formData.business_tags.map((tag) => (
                          <motion.div
                            layout
                            key={tag.name}
                            className="space-y-3 rounded-xl border border-primary/10 bg-primary/5 p-4"
                          >
                            <div className="flex items-center justify-between">
                              <span className="flex items-center gap-2 text-xs font-bold">
                                <TagChevronIcon weight="fill" /> {tag.name}{" "}
                                Certification
                              </span>
                              <button
                                onClick={() => removeTag(tag.name)}
                                className="rounded-full p-1 text-red-500 transition-colors hover:bg-red-50"
                              >
                                <TrashIcon size={16} />
                              </button>
                            </div>
                            <FileUpload
                              compact
                              label={`Attach ${tag.name} Proof`}
                              onUpload={(data, name) =>
                                updateTagFile(tag.name, data, name)
                              }
                              fileName={tag.fileName}
                            />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {activeTab === 3 && (
                  <div className="space-y-4 rounded-2xl bg-muted/30 p-6 text-sm italic">
                    <p>
                      All documentation has been prepared for{" "}
                      {formData.legal_name}.
                    </p>
                    <p>
                      Review the sidebar audit to ensure all green checks are
                      present.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between border-t pt-8">
            <Button
              variant="ghost"
              disabled={activeTab === 0}
              onClick={() => setActiveTab((t) => t - 1)}
            >
              Back
            </Button>
            <Button
              disabled={stepIsInvalid}
              className="rounded-full px-10"
              onClick={() =>
                activeTab < 3
                  ? setActiveTab((t) => t + 1)
                  : console.log("Final Submission:", formData)
              }
            >
              {activeTab === 3 ? "Submit Application" : "Continue"}
            </Button>
          </div>
        </div>

        <aside className="sticky top-12 hidden w-80 space-y-6 lg:block">
          <div className="space-y-6 rounded-3xl border bg-card p-6 shadow-sm">
            <h3 className="border-b pb-2 text-xs font-black tracking-widest uppercase">
              Application Audit
            </h3>
            <AuditItem
              label="Account"
              status={!!registerData.email && !passMismatch}
              sub={registerData.email}
            />
            <AuditItem
              label="Identity"
              status={!!registerData.display_image}
              sub={registerData.metadata.profile.name}
            />
            <AuditItem
              label="Verification"
              status={!!registerData.registration_number}
              sub={registerData.registration_number}
            />
            <div className="border-t pt-2">
              <p className="mb-2 text-[10px] font-bold text-muted-foreground uppercase">
                Selected Industries
              </p>
              {formData.business_tags.length === 0 && (
                <p className="text-[10px] text-red-400 italic">No tags added</p>
              )}
              {formData.business_tags.map((t) => (
                <div
                  key={t.name}
                  className="flex items-center justify-between py-1 text-xs"
                >
                  <span>{t.name}</span>
                  {t.file ? (
                    <CheckCircleIcon
                      size={18}
                      className="text-green-500"
                      weight="fill"
                    />
                  ) : (
                    <WarningCircleIcon size={18} className="text-red-400" />
                  )}
                </div>
              ))}
            </div>
            {formData.avatar_url && (
              <div className="flex flex-col items-center gap-2 border-t pt-4">
                <img
                  src={formData.avatar_url}
                  className="h-16 w-16 rounded-full object-cover ring-4 ring-primary/10"
                  alt="Preview"
                />
                <span className="text-[10px] font-bold italic">
                  {formData.legal_name || "New Entity"}
                </span>
              </div>
            )}
          </div>
        </aside>
      </main>
    </div>
  )
}

// --- TYPED UI COMPONENTS ---

interface InputBlockProps {
  label: string
  icon: React.ElementType
  value: string
  onChange: (val: string) => void
  type?: string
  error?: boolean
  errorMessage?: string
}

const InputBlock: React.FC<InputBlockProps> = ({
  label,
  icon: Icon,
  value,
  onChange,
  type = "text",
  error = false,
  errorMessage = "",
}) => (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase">
      <Icon size={14} /> {label}
    </label>
    <input
      type={type}
      className={`h-12 w-full rounded-xl border bg-card px-4 transition-all outline-none ${error ? "border-red-500 ring-red-500/10 focus:ring-4" : "focus:ring-2 focus:ring-primary/20"}`}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
    />
    {error && (
      <p className="text-[10px] font-bold text-red-500">{errorMessage}</p>
    )}
  </div>
)

interface FileUploadProps {
  onUpload: (data: string, name: string) => void
  fileName?: string
  label?: string
  compact?: boolean
}

const FileUpload: React.FC<FileUploadProps> = ({
  onUpload,
  fileName,
  label = "Upload Document",
  compact = false,
}) => (
  <div
    className={`group relative flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed transition-all hover:bg-primary/5 ${compact ? "h-14" : "h-24"}`}
  >
    <input
      type="file"
      className="absolute inset-0 cursor-pointer opacity-0"
      onChange={(e) => {
        const file = e.target.files?.[0]
        if (file) {
          const reader = new FileReader()
          reader.onloadend = () => onUpload(reader.result as string, file.name)
          reader.readAsDataURL(file)
        }
      }}
    />
    <div className="px-4 text-center">
      {!compact && (
        <CloudArrowUpIcon
          size={20}
          className="mx-auto mb-1 text-muted-foreground group-hover:text-primary"
        />
      )}
      <p className="max-w-50 truncate text-[10px] font-bold">
        {fileName || label}
      </p>
    </div>
  </div>
)

interface AuditItemProps {
  label: string
  status: boolean
  sub?: string
}

const AuditItem: React.FC<AuditItemProps> = ({ label, status, sub }) => (
  <div className="group flex items-center justify-between">
    <div className="flex flex-col">
      <span className="text-[10px] font-bold text-muted-foreground">
        {label}
      </span>
      <span
        className={`w-32 truncate text-xs ${status ? "text-foreground" : "text-red-400 italic"}`}
      >
        {sub || "Missing"}
      </span>
    </div>
    {status ? (
      <CheckCircleIcon size={20} className="text-green-500" weight="fill" />
    ) : (
      <WarningCircleIcon size={20} className="text-red-400" weight="fill" />
    )}
  </div>
)
