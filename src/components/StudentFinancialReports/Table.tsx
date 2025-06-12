const Table = () =>{

    return (
        <table className="min-w-full table-fixed border-collapse">
                        <tbody>
                          <tr className="border-b border-white/30">
                            <td className="text-white text-xl py-5 w-1/3">اسم الطالب</td>
                            <td className="text-white text-xl py-5">محمد رفيق</td>
                          </tr>
                          <tr className="border-b border-white/30">
                            <td className="text-white text-xl py-5">الطالب ID</td>
                            <td className="text-white text-xl py-5">5448</td>
                          </tr>
                          <tr className="border-b border-white/30">
                            <td className="text-white text-xl py-5">الكورس / التخصص</td>
                            <td className="text-white text-xl py-5">هندسه البرمجيات</td>
                          </tr>
                          <tr className="border-b border-white/30 last:border-b-0">
                            <td className="text-white text-xl py-5">تاريخ التسجيل</td>
                            <td className="text-white text-xl py-5">22/5/2022</td>
                          </tr>
                        </tbody>
                    </table>
    )
}
export default Table;