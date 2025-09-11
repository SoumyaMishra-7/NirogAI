// utils/role.ts
export const getRole = (user: any) => {
  // 1️⃣ Try Clerk publicMetadata
  const roleFromClerk = user?.publicMetadata?.role;
  if (roleFromClerk) return roleFromClerk.toLowerCase();

  // 2️⃣ Try localStorage fallback
  const roleFromLocal = localStorage.getItem("selectedRole");
  if (roleFromLocal) return roleFromLocal.toLowerCase();

  // 3️⃣ Default role
  return "user";
};
