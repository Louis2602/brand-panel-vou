import { DashboardConfig } from "@/types/config";

export const dashboardConfig: DashboardConfig = {
  nav: [
    {
      title: "Services",
      links: [
        {
          icon: "dashboard",
          label: "Dashboard",
          href: "/dashboard/main",
        },
        {
          icon: "tag",
          label: "Events",
          href: "/dashboard/event",
        },
        {
          icon: "ticket",
          label: "Vouchers",
          href: "/dashboard/voucher",
        },
        {
          icon: "games",
          label: "Games",
          href: "/dashboard/games",
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
