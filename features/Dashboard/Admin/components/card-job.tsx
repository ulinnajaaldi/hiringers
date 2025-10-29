"use client";

import React from "react";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { useMediaQuery } from "@/hooks/useMediaQuery";

import { firstLetterUppercase } from "@/lib/text";

interface CardJobProps {
  item: {
    id: string;
    slug: string;
    status: "draft" | "active" | "inactive";
    title: string;
    salary_range: {
      display_text: string;
    };
    list_card: {
      started_on_text: string;
      cta: string;
    };
  };
}

const CardJob: React.FC<CardJobProps> = ({ item }) => {
  const isMobile = useMediaQuery("(max-width: 1024px)");
  return (
    <div
      key={item.id}
      className="bg-neutral-10 flex flex-col gap-3 rounded-[16px] p-6"
      style={{
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.10)",
      }}
    >
      <div className="flex flex-wrap items-center gap-2 lg:gap-4">
        <Badge
          size={isMobile ? "default" : "lg"}
          variant={item.status}
          className="font-bold"
        >
          {firstLetterUppercase(item.status)}
        </Badge>
        <Badge
          size={isMobile ? "default" : "lg"}
          variant="outline"
          className="font-normal!"
        >
          {item.list_card.started_on_text}
        </Badge>
      </div>
      <div className="flex flex-col gap-0.5 md:flex-row md:items-end md:justify-between md:gap-0">
        <div className="flex flex-col gap-0.5 md:gap-1 lg:gap-2">
          <p className="text-l font-bold text-neutral-100 lg:text-xl">
            {item.title}
          </p>
          <p className="text-m lg:text-l text-neutral-80">
            {item.salary_range.display_text}
          </p>
        </div>
        {item.list_card.cta && (
          <Button size="sm" asChild>
            <Link href={`/admin/manage-candidate/${item.slug}`}>
              {item.list_card.cta}
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default CardJob;
