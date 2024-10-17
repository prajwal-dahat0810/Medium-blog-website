export type alertType = {
  alertVisible: boolean;
  content: string;
};
export const Alert = ({ alertVisible, content }: alertType) => {
  return (
    <div
      style={{ display: alertVisible ? "block" : "none" }}
      className={` absolute top-10`}
    >
      <div
        className="flex p-4 text-sm min-w-10 text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300"
        role="alert"
      >
        <svg
          className="flex-shrink-0 w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <div className="ms-3 text-sm min-w-40 text-black font-medium">
          {content}
        </div>
      </div>
    </div>
  );
};
