import { ChangeEvent } from "react";

interface LabelledInput {
  placeholder: string;
  label: string;
  onchange: (e: ChangeEvent<HTMLInputElement>) => void;
}
export const LabelledInput = ({
  label,
  placeholder,
  onchange,
}: LabelledInput) => {
  return (
    <div className="py-2">
      <div className="w-full">
        <label className="block mb-2 text-md font-lg font-bold text-gray-900 dark:text-white pt-2">
          {label}
        </label>
        <input
          type="text"
          onChange={onchange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-lg font-semibold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  );
};
