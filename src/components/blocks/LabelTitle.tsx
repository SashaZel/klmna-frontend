import { TrendingUp } from "lucide-react";

export const LabelTitle = ({ title = "New" }) => {
    return (
        <div className="px-2 flex items-center gap-1 border text-sm border-teal-400 text-teal-400 rounded-2xl">
            <TrendingUp size={16} />
            {title}
        </div>
    );
};
