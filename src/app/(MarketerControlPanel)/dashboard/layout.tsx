"use client";

import { ReactNode } from "react";
import Aside from "@/components/dashboard/Aside";
import { Home,Users,Headphones,ListTodo,Timer ,BookOpen} from "lucide-react";
import { NavItem } from "@/interface";

const items: NavItem[] = [
  {
    label: "الصفحه الرئيسيه",
    icon: <Home />,
    url:'/dashboard'
  },
  {
    label:'المسوقين',
    icon: <Users />,
    url: '/dashboard/Marketer'
  },
  {
    label: "المهام",
    url: "/dashboard/Tasks",
    icon: <ListTodo />,
  },
   {
    label: "حضور و انصارف",
    url: "/dashboard/AttendanceAndDeparture",
    icon: <Timer />,
  },
  {
    icon:<BookOpen/>,
    label:"الطلبات",
    children: [
      {
        icon:undefined,
        label:'طلب اجازه',
        url:'/dashboard/RequestForLeave'
      },
      {
        icon:undefined,
        label:'طلب سلفه',
        url:'/dashboard/RequestAnAdvance'
      },
      
    ]
  },
  {
    label:"العملاء",
    icon:<Users/>,
    children:[
      {
        label: "عملاء جدد",
        icon: undefined,
        url:'/dashboard/NewClients'
      },
      {
        label:'عملاء مسجلين',
        icon:undefined,
        url:"/dashboard/RegisteredClients"
      }
    ]
  },
  {
    label:"الاعلانات",
    icon:<Headphones/>,
    children:[
      {
        label: "فيسبوك",
        icon: undefined,
        url:''
      },
      {
        label:'واتساب',
        icon:undefined,
        url:""
      }
    ]
  },
  {
    label:"المنافسين",
    icon:<Headphones/>,
    children:[
      {
        label: "اضافه منافس",
        icon: undefined,
        url:''
      },
      {
        label:'تقرير المنافس',
        icon:undefined,
        url:""
      },
      {
        label:'تحليل المنافس',
        icon:undefined,
        url:""
      }
    ]
  }
];



export default function TrainingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden"> 
    
      <Aside items={items} />

      <main className="flex-1 overflow-y-auto ">
        {children}
      </main>
    </div>
  );
}
