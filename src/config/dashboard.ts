import { DashboardConfig } from "@/types/config";

export const dashboardConfig: DashboardConfig = {
  nav: [
    {
      title: "Services",
      links: [
        {
          icon: "dashboard",
          label: "Dashboard",
          href: "/dashboard",
        },
        {
          icon: "tag",
          label: "Promotions",
          href: "/dashboard/promotion",
        },
      ],
    },
    {
      title: "Account",
      links: [
        {
          icon: "settings",
          label: "Settings",
          href: "/dashboard/settings",
        },
      ],
    },
  ],
};
