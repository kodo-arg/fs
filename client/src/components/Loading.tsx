import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <Loader className="animate-spin w-8 h-8 text-primary" />
    </div>
  );
};

export default Loading;
