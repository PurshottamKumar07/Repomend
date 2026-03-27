import { cn } from "@/lib/utils"
import Feed from "./feed"

export default function Container({ className }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className="w-full flex justify-between flex-row max-w-full flex-col justify-center text-base gap-10 leading-loose p-6 mt-5">
            <div className="w-full h-64 sm:h-72 lg:w-96 lg:h-96 bg-gray-800 shadow-md border border-red-900 p-6 flex flex-col rounded-lg">
                <div className="flex justify-center text-xl font-mono ml-4 font-bold">Disliked</div>
                <div className={cn("w-full h-full flex items-center justify-center bg-black text-white rounded-lg shadow-md p-6", className)}>
                    This is the disliked
                </div>
            </div>
            <div className="w-full h-72 sm:h-80 lg:w-1/2 lg:h-96 xl:w-[50%] bg-gray-900 rounded-lg p-6">
                <div className={cn("w-full h-full flex items-center justify-center rounded-lg shadow-md p-2", className)}>
                    <Feed />
                </div>
            </div>
            <div className="w-full h-64 sm:h-72 lg:w-96 lg:h-96 bg-gray-800 shadow-md border border-green-900 p-6 flex flex-col rounded-lg">
                <div className="flex justify-center text-xl font-mono ml-4 font-bold"> Liked</div>
                <div className={cn("w-full h-full flex items-center bg-black justify-center text-white rounded-lg shadow-md p-6", className)}>
                    This is the liked
                </div>
            </div>
        </div>
    )
}