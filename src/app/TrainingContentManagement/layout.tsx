"use client";

import { ReactNode } from "react";
import Aside from "@/components/TrainingContentManagement/Aside";
import { Home, Users, Settings, Book, Plus, ClipboardList } from "lucide-react";

const navItems = [
  { label: "البرامج التدريبيه", url: "/TrainingContentManagement/Programs", icon: <Home size={20} /> },
  { label: "المحتوي التدريبي", url: "/TrainingContentManagement/TrainingContent", icon: <Users size={20} /> },
  { label: "اضافه محتوي تدريبي", url: "/TrainingContentManagement/AddTriningContent", icon: <Plus size={20} /> },
  { label: "الاختبارات الالكترونيه", url: "/TrainingContentManagement/ElectronicTests", icon: <ClipboardList size={20} /> },
  { label: "بنك الاسأله", url: "/TrainingContentManagement/QuestionBank", icon: <Book size={20} /> },
];

export default function TrainingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Aside items={navItems} />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
