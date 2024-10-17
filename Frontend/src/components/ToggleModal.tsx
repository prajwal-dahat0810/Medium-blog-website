export type AlertType = {
  alert?: string;
  message: string;
};
export const ToggleModal = ({ message }: AlertType) => {
  return (
    <>
      <div
        id="popup-modal"
        tabIndex={-1}
        className="absolute overflow-y-auto   left-28 md:left-60  z-50 justify-center items-center max-sm:left-1 max-sm:w-4/6  max-h-full"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="p-2 md:p-3 text-center">
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                {message}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
