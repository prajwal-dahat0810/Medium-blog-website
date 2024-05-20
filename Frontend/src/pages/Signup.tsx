import { Quote } from "../components/Quote.tsx";
import { Auth } from "../components/Auth.tsx";
export const Signup = () => {
  return (
    <div className="grid grid-cols-1 px-1 lg:grid-cols-2">
      <div className="">
        <Auth type="signup" />
      </div>
      <div className="invisible lg:visible">
        <Quote />
      </div>
    </div>
  );
};
