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
      title: "Admin",
      links: [
        {
          icon: "user",
          label: "Users",
          href: "/dashboard/admin/user",
        },
        {
          icon: "games",
          label: "Games",
          href: "/dashboard/admin/games",
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
