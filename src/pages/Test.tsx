import { Button } from "@/components/ui/button"
import { LoginOption, RegisterOption } from "@/Options/auth"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
const Register = () => {
  const [permissions, setPermissions] = useState<
    { name: string; file: File }[]
  >([])

  const [image, setImage] = useState<File | null>(null)

  const { mutate, data, error, isPending } = useMutation(RegisterOption())

  const handle = () => {
    const valid = permissions.filter((p) => p.name && p.file)

    mutate({
      email: "farmer@bijbhaj.co",
      password: "pass12345",
      registration_number: "123456",
      metadata: {
        profile: {
          name: "Cyusa Bwana",
          phone: "+250737492832",
          country: "Rwanda",
          website: "www.cyprusfarm.co",
          currency: "USD",
        },
        permissions: valid.map((p) => ({ right: p.name })),
      },
      permission_keys: valid.map((p) => p.name),
      display_image: image,
      permissions: valid.map((p) => p.file),
    })
  }

  const addPermission = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setPermissions((prev) => [...prev, { name: "", file: null as any }])
  }

  const updateName = (index: number, value: string) => {
    setPermissions((prev) =>
      prev.map((p, i) => (i === index ? { ...p, name: value } : p))
    )
  }

  const updateFile = (index: number, file: File | null) => {
    if (!file) return

    setPermissions((prev) =>
      prev.map((p, i) => (i === index ? { ...p, file } : p))
    )
  }

  const removePermission = (index: number) => {
    setPermissions((prev) => prev.filter((_, i) => i !== index))
  }

  if (error) {
    return <h1>error</h1>
  }

  return (
    <>
      <pre>{isPending ? "loading..." : JSON.stringify(data, null, 2)}</pre>
      <Button
        onClick={handle}
        variant="default"
        size="default"
        className="absolute top-2 left-2"
      >
        login
      </Button>
      <div className="absolute top-2 right-2 space-y-4 p-4">
        <h2 className="text-lg font-bold">Permissions</h2>

        {permissions.map((p, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Permission name"
              value={p.name}
              onChange={(e) => updateName(i, e.target.value)}
              className="border p-2"
            />

            <input
              type="file"
              onChange={(e) => updateFile(i, e.target.files?.[0] || null)}
            />

            <button onClick={() => removePermission(i)}>❌</button>
          </div>
        ))}

        <button onClick={addPermission}>➕ Add Permission</button>

        <div>
          <label>Display Image:</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
        </div>

        <Button onClick={handle}>
          {isPending ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </>
  )
}

export const Login = () => {
  const { mutate, data, error, isPending } = useMutation(LoginOption())

  const handle = () => {
    mutate({
      email: "farmer@cyprusfarm.co",
      password: "pass12345",
    })
  }

  if (error) {
    return <h1>error</h1>
  }

  return (
    <>
      <pre>{isPending ? "loading..." : JSON.stringify(data, null, 2)}</pre>
      <Button
        onClick={handle}
        variant="default"
        size="default"
        className="absolute top-2 left-2"
      >
        login
      </Button>
    </>
  )
}

export const Test = () => <Register />
/**
 * later to re use it:
 * const { data, isLoading } = useQuery(MeOption());

if (isLoading) return <div>Loading...</div>;

return <div>{data?.ans?.user?.email}</div>;
 */
// const { data, error, isFetching } = useQuery({
//   ...LoginOption({ email: "farmer@cyprusfarm.co", password: "pass12345" }),
//   enabled: login,
// })

// const { data, isFetching, refetch, error } = useSuspenseQuery(TestOptions(id))

// const { mutate, data, error, isPending } = useMutation(LoginOption())
