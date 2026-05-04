import { BriefcaseIcon, ShieldCheckIcon } from "@phosphor-icons/react"
import { InputBlock } from "./ui/InputBlock"
import { useGlobalContext } from "@/utilits/Hooks/General"
import { useEffect, useState } from "react"
type props = {
  valid: (k: boolean) => void
}
/**
(alias) type Register = Omit<User, "id" | "created_at" | "updated_at" | "role" | "metadata"> & {
    metadata: {
        profile: {
            name: string;
            phone?: string;
            country?: string;
            website?: string;
            currency?: string;
        };
        permissions: {
            right: string;
        }[];
    };
    permission_keys: string[];
    display_image?: File | null;
    permissions: File[];
}
import Register

 */
export const Register_integrity = ({ valid }: props) => {
  const { setRegisterData } = useGlobalContext()
  const [name, setName] = useState("")
  const [summary, setSummary] = useState("")
  const [phone, setPhone] = useState("")
  const [country, setCountry] = useState("")
  const [website, setWebsite] = useState("")
  const [image, setImage] = useState<File | null>(null)

  useEffect(() => {
    setRegisterData((prev) => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        profile: {
          ...prev.metadata.profile,
          name: name + "^" + summary,
          phone,
          country,
          website,
        },
      },
      display_image: image,
    }))

    const isValid = name && image
    valid(!!isValid)
  }, [name, summary, phone, country, website, image, valid, setRegisterData])

  return (
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
            <FileIcon size={14} className="mr-1 inline" /> Proof of Registration
          </label>
          <FileUpload
            onUpload={(data, name) => updateField("reg_proof_url", data, name)}
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
            (t) => !formData.business_tags.find((bt) => bt.name === t)
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
                  <TagChevronIcon weight="fill" /> {tag.name} Certification
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
                onUpload={(data, name) => updateTagFile(tag.name, data, name)}
                fileName={tag.fileName}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </>
  )
}

/**
latter preview.

const preview = image ? URL.createObjectURL(image) : null

{preview && (
  <img
    src={preview}
    className="h-16 w-16 rounded-full object-cover"
  />
)}
 */
