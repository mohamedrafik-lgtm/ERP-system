
import ActivityRow from "@/components/activiti";
import StatCard from "@/components/stateCard";
import { activities, stats } from "@/data";
import Link from "next/link";

export default function Home() {

  return (
  
    <div className="p-6 max-w-6xl  mx-auto" dir="ltr">
    <h1 className="text-3xl font-bold ">Dashboard</h1>
    <p className=" mt-1">
      Welcome back, Eleanor! Here&apos;s a snapshot of your academy’s performance.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      {stats.map((stat, idx) => (
        <StatCard key={idx} title={stat.title} value={stat.value} color={stat.color} />
      ))}
    </div>

    <h2 className="text-xl  font-semibold mt-10 mb-4">Quick Actions</h2>
    <div className="space-x-4">
      <button  className="bg-white px-4 py-2 rounded-2xl hover:bg-white/70">
      <Link href={"/AddStudent"}>
        Add New Student
      </Link>
      </button>
      <button className="bg-white px-4 py-2 rounded-2xl hover:bg-white/70">
       <Link href={"/AddProgram"}>
          Create New Course
       </Link>
      </button>
    </div>

    <h2 className="text-xl  font-semibold mt-10 mb-4">Recent Activities</h2>
    <div className="bg-white/70 rounded-xl shadow overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="white/20  uppercase text-xs">
          <tr>
            <th className="px-6 py-3 ">Date</th>
            <th className="px-6 py-3 ">Activity</th>
            <th className="px-6 py-3 ">Details</th>
          </tr>
        </thead>
        <tbody className="space-y-10">
          {activities.map((item, index) => (
            <ActivityRow key={index} {...item} />
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
}
