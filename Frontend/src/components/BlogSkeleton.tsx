import { AppBar } from "./AppBar";

export const BlogSkeleton = () => {
  return (
    <div>
     
      <div className="flex justify-center">
        <div role="status" className="pb-4 w-screen max-w-5xl animate-pulse">
          <div className=" p-4 border-b border-slate-200 pb-4 w-screen max-w-5xl cursor-pointer">
            <div className="flex items-center">
              <div className="justify-center flex-col	">
                <div className="h-4 w-4 bg-gray-200 rounded-full   mb-4"></div>
              </div>

              <div className="font-medium justify-center items-center flex-col	 pl-2">
                <div className="h-2 bg-gray-200 rounded-full  max-w-[360px] mb-2.5"></div>
              </div>
              <div className="font-extralight  justify-center flex-col pl-2 flex justify-center  items-center">
                <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
              </div>
              <div className="font-thin pl-2 flex justify-center text-slate-400">
                <div className="h-2 bg-gray-200 rounded-full  max-w-[300px] mb-2.5"></div>
              </div>
            </div>
            <div className="text-xl pt-3 font-semibold">
              {" "}
              <div className="h-2 bg-gray-200 rounded-full  max-w-[330px] mb-2.5"></div>
            </div>
            <div className="text-md font-extralight">
              <div className="h-2 bg-gray-200 rounded-full  max-w-[360px]"></div>
            </div>
            <div className=" text-sm font-thin pt-4 text-slate-400">
              <div className="h-2.5 bg-gray-200 rounded-full  w-48 mb-4"></div>
            </div>
          </div>

          <span className="sr-only">Loading...</span>
        </div>{" "}
      </div>
    </div>
  );
};
