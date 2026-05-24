"use client";

import Link from "next/link";

import { usePathname }
  from "next/navigation";

export default function Sidebar() {

  const pathname =
    usePathname();

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
    },

    {
      title: "Assignments",
      href: "/assignments",
    },

    {
      title: "My Groups",
      href: "/groups",
    },

    {
      title: "AI Teacher Toolkit",
      href: "/toolkit",
    },

    {
      title: "My Library",
      href: "/library",
    },
  ];

  return (
    <aside className="w-[260px] h-screen bg-white border-r px-5 py-6 flex flex-col">

      {/* Logo */}

      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          VedaAI
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          AI Assessment Platform
        </p>
      </div>

      {/* Create Assignment Button */}

      <Link
        href="/create-assignment"
        className="w-full"
      >
        <button
          className="mt-8 bg-black text-white rounded-2xl py-3 px-4 font-medium hover:opacity-90 transition w-full"
        >
          + Create Assignment
        </button>
      </Link>

      {/* Navigation */}

      <nav className="mt-10 flex flex-col gap-2">

        {navItems.map((item) => {

          const isActive =
            pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
            >
              <div
                className={`px-4 py-3 rounded-2xl transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-black text-white font-semibold shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item.title}
              </div>
            </Link>
          );
        })}

      </nav>

      {/* School Card */}

      <div className="mt-auto bg-gray-100 rounded-3xl p-4 border">

        <p className="font-semibold text-sm text-gray-900">
          Delhi Public School
        </p>

        <p className="text-xs text-gray-500 mt-1">
          Bokaro Steel City
        </p>

      </div>

    </aside>
  );
}