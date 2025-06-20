import Cart from "@/components/dashboard/tasks/cart";

const Tasks = () => {

    return (
        <div>
            <div className="w-10/12 mx-auto space-y-10  mt-14">
                  <div className="space-y-3 text-center">
                        <h1 className=" text-3xl">المهام اليومية</h1>
                        <p className="text-md  text-black/20">إجمالي عدد المهام : 8</p>
                  </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                   <Cart />
                   <Cart />
                   <Cart />
                   <Cart />
                   <Cart />
                   <Cart />
                   <Cart />
                   <Cart />
                 </div>
            </div>
        </div>
    )
}
export default Tasks;