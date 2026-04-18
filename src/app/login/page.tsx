"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveMockLogin, UserRole } from "@/lib/mock-auth";

const roleOptions: Array<{
  role: UserRole;
  description: string;
}> = [
  {
    role: "信审员",
    description: "登录后只看“初审中”的任务，详情页显示“通过 / 打回”按钮。"
  },
  {
    role: "复核员",
    description: "登录后只看“复核中”的任务，详情页显示“通过 / 拒绝”按钮。"
  },
  {
    role: "管理员",
    description: "登录后可看全部任务，详情页显示全部按钮。"
  }
];

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRole>("信审员");

  function handleLogin() {
    saveMockLogin(selectedRole);
    router.push("/approvals");
  }

  return (
    <main className="min-h-screen px-6 py-10 md:px-10">
      <div className="mx-auto max-w-4xl">
        <section className="rounded-3xl border border-white/70 bg-white/85 p-8 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.35)]">
          <p className="text-sm font-medium tracking-[0.2em] text-brand-700">MOCK LOGIN</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">角色登录页</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            这一步不接真实登录系统，只用最简单的前端 mock 方式保存当前角色和 mock 用户名。
            你选择一个角色后，系统会把信息保存在浏览器本地，然后跳转到审批列表页。
          </p>
        </section>

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_16px_50px_-28px_rgba(15,23,42,0.28)]">
          <h2 className="text-lg font-semibold text-slate-900">请选择登录角色</h2>
          <div className="mt-4 grid gap-4">
            {roleOptions.map((option) => {
              const isActive = selectedRole === option.role;

              return (
                <button
                  key={option.role}
                  type="button"
                  onClick={() => setSelectedRole(option.role)}
                  className={`rounded-2xl border p-5 text-left transition ${
                    isActive
                      ? "border-brand-500 bg-brand-50 shadow-sm"
                      : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white"
                  }`}
                >
                  <div className="text-base font-semibold text-slate-900">{option.role}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{option.description}</p>
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div>
              <div className="text-sm text-slate-500">当前选择</div>
              <div className="mt-1 text-lg font-semibold text-slate-900">{selectedRole}</div>
            </div>
            <button
              type="button"
              onClick={handleLogin}
              className="rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              进入审批系统
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
