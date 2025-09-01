import { Plus } from "lucide-react"; // icon library
export default function navbar() {
    return (
        <nav className="flex items-center justify-between bg-white dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            

            <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                platform launch
            </h1>
            <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow">
                    <Plus size={18} />
                    <span>
                        add new Task
                    </span>

                </button>
                <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                    ⋮
                </button>
            </div>




        </nav>

    )


}
