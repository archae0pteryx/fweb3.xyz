import { ReactNode } from "react"
import { useUser } from "../providers"
import { Unauthorized } from "./Unauthorized"

export function RoleGuard({ children, roles }: { children: ReactNode, roles: string[] }) {
  const { role } = useUser()
  if (!roles.includes(role)) {
    return <Unauthorized />
  }
  return <div>{children}</div>
}
