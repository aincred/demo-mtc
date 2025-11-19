"use client";

import Link from "next/link";
import {
  FileText,
  Scale,
  Pill,
  FileCheck,
  ClipboardList,
  Wrench,
  Users,
  BedDouble,
  BookOpen,
  Mail,
  HeartPulse,
} from "lucide-react";

export default function MtcDashboard() {
  const cards = [
    { title: "Child Registration", icon: <FileText size={28} />, color: "from-blue-500 to-blue-700", href: "/mtc-user/dashboard/child-registration" },
    { title: "Daily Weight Entry", icon: <Scale size={28} />, color: "from-purple-400 to-purple-600", href: "/mtc-user/dashboard/daily-weight" },
    { title: "Micronutrients & Antibiotics", icon: <Pill size={28} />, color: "from-cyan-600 to-green-600", href: "/mtc-user/dashboard/micronutrients" },
    { title: "Child Discharge", icon: <FileCheck size={28} />, color: "from-green-500 to-emerald-600", href: "/mtc-user/dashboard/discharge" },
    { title: "Follow-Up", icon: <ClipboardList size={28} />, color: "from-orange-400 to-yellow-500", href: "/mtc-user/dashboard/follow-up" },
    { title: "Equipment Section", icon: <Wrench size={28} />, color: "from-teal-400 to-cyan-500", href: "/mtc-user/dashboard/equipment" },
    { title: "Staff Details", icon: <Users size={28} />, color: "from-blue-600 to-green-600", href: "/mtc-user/dashboard/staff" },
    { title: "Bed Occupancy", icon: <BedDouble size={28} />, color: "from-pink-500 to-rose-500", href: "/mtc-user/dashboard/bed-occupancy" },
    { title: "Child Records", icon: <BookOpen size={28} />, color: "from-orange-500 to-red-500", href: "/mtc-user/dashboardr/child-records" },
    { title: "MPR / Follow-Up Report", icon: <Mail size={28} />, color: "from-red-500 to-pink-500", href: "/mtc-user/dashboardmpr-followup" },
    { title: "Maternal Nutrition", icon: <HeartPulse size={28} />, color: "from-pink-500 to-rose-600", href: "/mtc-user/dashboard/maternal-nutrition" },
    { title: "Samar", icon: <HeartPulse size={28} />, color: "from-blue-500 to-rose-600", href: "/mtc-user/dashboard/maternal-nutrition" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4 sm:px-6 md:px-8 lg:px-10 transition-all">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-8 text-center md:text-left">
        Malnutrition Treatment Center Dashboard
      </h1>

      <div
        className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          xl:grid-cols-5 
          gap-4 
          sm:gap-6
        "
      >
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className={`
              p-4 sm:p-5 md:p-6 
              rounded-2xl 
              shadow-lg 
              bg-linear-to-r ${card.color} 
              text-white 
              flex 
              flex-col 
              items-start 
              gap-3 
              hover:scale-[1.03] 
              hover:shadow-xl 
              transition-all 
              duration-200
            `}
          >
            <div className="bg-white/20 p-3 rounded-xl">
              {card.icon}
            </div>
            <h2 className="text-base sm:text-lg md:text-xl font-semibold leading-snug">
              {card.title}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
