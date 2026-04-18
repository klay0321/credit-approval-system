export type UserRole = "信审员" | "复核员" | "管理员";

export const ROLE_STORAGE_KEY = "credit-approval-role";
export const USERNAME_STORAGE_KEY = "credit-approval-username";

export const roleTaskStatusMap: Record<UserRole, "初审中" | "复核中" | "全部"> = {
  信审员: "初审中",
  复核员: "复核中",
  管理员: "全部"
};

export const roleUserNameMap: Record<UserRole, string> = {
  信审员: "张初审",
  复核员: "李复核",
  管理员: "王管理员"
};

export function saveMockLogin(role: UserRole) {
  window.localStorage.setItem(ROLE_STORAGE_KEY, role);
  window.localStorage.setItem(USERNAME_STORAGE_KEY, roleUserNameMap[role]);
}

export function getMockRole(): UserRole | null {
  const role = window.localStorage.getItem(ROLE_STORAGE_KEY);

  if (role === "信审员" || role === "复核员" || role === "管理员") {
    return role;
  }

  return null;
}

export function getMockUserName(): string | null {
  return window.localStorage.getItem(USERNAME_STORAGE_KEY);
}

export function clearMockLogin() {
  window.localStorage.removeItem(ROLE_STORAGE_KEY);
  window.localStorage.removeItem(USERNAME_STORAGE_KEY);
}
