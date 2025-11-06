import { LuLoader } from "react-icons/lu";

export default function Home() {
  return (
    <div className="flex justify-center items-center flex-col">
      <LuLoader size={15} className="animate-spin" />
      Loading slugs... Please wait
    </div>
  );
}
