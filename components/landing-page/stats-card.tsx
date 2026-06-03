import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
    icon: LucideIcon;
    value: string;
    label: string;
    hasBorder?: boolean;
}

export default function StatsCard({icon:Icon, value, label, hasBorder}: StatsCardProps) {
    return (
        <div className={cn("space-y-2", hasBorder && "border-x border-border/20")}>
            <div className="flex items-center justify-center gap-2 ">
                <Icon className="size-5 text-primary/70"/>
                <p className="text-3xl sm:text-4xl font-bold">
                    {value}
                </p>
            </div>
            <p className="text-sm text-muted-foreground">
                {label}
            </p>
        </div>
    );
};