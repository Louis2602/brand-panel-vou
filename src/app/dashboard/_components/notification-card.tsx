import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
    link: "/dashboard/a",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
    link: "/dashboard/b",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
    link: "/dashboard/c",
  },
];

export const NotificationCard = () => {
  return (
    <>
      <div>
        {notifications.map((notification, index) => (
          <Link
            href={`${notification.link}`}
            key={index}
            className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 hover:bg-gray-100 rounded-lg transition-colors duration-200 px-4 py-2"
          >
            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500 animate-pulse" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                {notification.title}
              </p>
              <p className="text-sm text-muted-foreground">
                {notification.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <Button className="w-full mt-4">
        <Check className="mr-2 h-4 w-4" /> Mark all as read
      </Button>
    </>
  );
};
