const Table = () => {
    return (
        <table className="min-w-full table-fixed border-collapse">
            <tbody>
                <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="text-gray-600 text-base font-medium py-4 w-1/3">اسم الطالب</td>
                    <td className="text-gray-900 text-base font-semibold py-4">محمد رفيق</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="text-gray-600 text-base font-medium py-4">الطالب ID</td>
                    <td className="text-gray-900 text-base font-semibold py-4">5448</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="text-gray-600 text-base font-medium py-4">الكورس / التخصص</td>
                    <td className="text-gray-900 text-base font-semibold py-4">هندسه البرمجيات</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                    <td className="text-gray-600 text-base font-medium py-4">تاريخ التسجيل</td>
                    <td className="text-gray-900 text-base font-semibold py-4">22/5/2022</td>
                </tr>
            </tbody>
        </table>
    )
}

export default Table;