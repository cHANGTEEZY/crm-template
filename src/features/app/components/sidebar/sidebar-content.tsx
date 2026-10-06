"use client";

import { useRouterState } from "@tanstack/react-router";
import { ScrollArea } from "@/components/_ui/scroll-area";
import SidebarNavItem from "./sidebar-nav-item";
import SidebarSection from "./sidebar-section";
import SidebarUser from "./sidebar-user";
import { useCompaniesStore } from "@/features/home/stores/companies-store";
import { USERS } from "@/features/users/data/users";
import Logo from "@/public/assets/images/_common/logo.svg?react";
import BuildingIcon from "@/public/assets/images/companies/sidebar/building.svg?react";
import ClipboardIcon from "@/public/assets/images/companies/sidebar/clipboard.svg?react";
import BarChartIcon from "@/public/assets/images/companies/sidebar/bar-chart.svg?react";
import ListIcon from "@/public/assets/images/companies/sidebar/list.svg?react";
import BookClosedIcon from "@/public/assets/images/companies/sidebar/book-closed.svg?react";
import MailIcon from "@/public/assets/images/companies/sidebar/mail.svg?react";
import TargetIcon from "@/public/assets/images/companies/sidebar/target-05.svg?react";
import TargetAltIcon from "@/public/assets/images/companies/sidebar/target-03.svg?react";
import UsersIcon from "@/public/assets/images/companies/sidebar/users.svg?react";
import BarChartAltIcon from "@/public/assets/images/companies/sidebar/bar-chart-10.svg?react";
import AlertTriangleIcon from "@/public/assets/images/companies/sidebar/alert-triangle.svg?react";
import DotYellow from "@/public/assets/images/companies/sidebar/dot-yellow.svg?react";
import DotPink from "@/public/assets/images/companies/sidebar/dot-pink.svg?react";
import DotPurple from "@/public/assets/images/companies/sidebar/dot-purple.svg?react";
import UserPlusIcon from "@/public/assets/images/companies/sidebar/user-plus.svg?react";
import MessageQuestionIcon from "@/public/assets/images/companies/sidebar/message-question.svg?react";

const BASE_COMPANY_COUNT = 223;

export default function SidebarContent() {
  const companyCount = useCompaniesStore((state) => state.companies.length);
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex shrink-0 items-center gap-2.5 px-3.5 pt-4 pb-3">
        <Logo aria-hidden className="size-7 shrink-0 overflow-visible" />
        <div className="flex min-w-0 flex-col gap-1">
          <span className="lead-style block truncate font-medium tracking-[-0.01em] text-foreground">
            Sales CRM
          </span>
          <span className="caption-style text-subtle block truncate">
            Company pipeline
          </span>
        </div>
      </div>

      <ScrollArea className="min-h-0 flex-1">
        <nav aria-label="Primary" className="flex flex-col gap-1 pb-2">
          <SidebarSection>
            <SidebarNavItem
              icon={BuildingIcon}
              label="Companies"
              href="/"
              count={BASE_COMPANY_COUNT + companyCount}
              active={pathname === "/"}
            />
            <SidebarNavItem
              icon={UsersIcon}
              label="Users"
              href="/users"
              count={USERS.length}
              active={pathname === "/users"}
            />
            <SidebarNavItem icon={ClipboardIcon} label="Deals Board" />
            <SidebarNavItem icon={BarChartIcon} label="Forecast" count={9} />
            <SidebarNavItem icon={ListIcon} label="Activities" />
            <SidebarNavItem icon={BookClosedIcon} label="Contacts" count={38} />
            <SidebarNavItem icon={MailIcon} label="Email Sequences" />
          </SidebarSection>

          <SidebarSection title="Team">
            <SidebarNavItem icon={TargetIcon} label="Strategic AEs" />
            <SidebarNavItem icon={TargetAltIcon} label="Mid Market" />
            <SidebarNavItem icon={UsersIcon} label="SDR Team" />
          </SidebarSection>

          <SidebarSection title="Reporting">
            <SidebarNavItem icon={BarChartAltIcon} label="Q1 Forecast" />
            <SidebarNavItem icon={AlertTriangleIcon} label="Slipping Deals" />
          </SidebarSection>

          <SidebarSection title="Pipelines">
            <SidebarNavItem icon={DotYellow} label="North America" />
            <SidebarNavItem icon={DotPink} label="EMEA Enterprise" />
            <SidebarNavItem icon={DotPurple} label="APAC Expansion" />
          </SidebarSection>

          <SidebarSection>
            <SidebarNavItem
              icon={UserPlusIcon}
              label="Invite teammates"
              tone="quiet"
            />
            <SidebarNavItem
              icon={MessageQuestionIcon}
              label="Help"
              tone="quiet"
            />
          </SidebarSection>
        </nav>
      </ScrollArea>

      <SidebarUser />
    </div>
  );
}
