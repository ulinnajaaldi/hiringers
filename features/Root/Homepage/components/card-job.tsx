import React from "react";

import { Banknote, MapPin } from "lucide-react";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";

import { cn } from "@/lib/utils";

interface CardJobProps {
  item: {
    id: string;
    slug: string;
    title: string;
    company: {
      name: string;
      photo_url: string;
      location: string;
    };
    salary_range: {
      display_text: string;
    };
  };
  slug: string;
  handleClick: () => void;
}

const CardJob: React.FC<CardJobProps> = ({ item, slug, handleClick }) => {
  return (
    <button
      className={cn(
        "border-neutral-40 flex cursor-pointer flex-col gap-2 rounded-[8px] border-2 px-4 py-3 transition-colors",
        "hover:border-primary-hover hover:bg-primary-surface",
        "focus-visible:border-primary-hover focus-visible:bg-primary-surface",
        item.slug === slug ? "border-primary-hover bg-primary-surface" : "",
      )}
      onClick={handleClick}
    >
      <div className="flex items-start gap-4">
        <div className="relative h-12 w-12 shrink-0">
          <Image
            src={item.company.photo_url}
            alt={item.company.name}
            width={240}
            height={240}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="flex flex-col text-start">
          <h2 className="text-l text-neutral-90 font-bold">{item.title}</h2>
          <p className="text-m text-neutral-90">{item.company.name}</p>
        </div>
      </div>
      <Separator dashed />
      <div className="flex items-center gap-1">
        <MapPin className="text-neutral-80 size-4" />
        <p className="text-neutral-80 text-s">{item.company.location}</p>
      </div>
      <div className="flex items-center gap-1">
        <Banknote className="text-neutral-80 size-4" />
        <p className="text-neutral-80 text-s">
          {item.salary_range.display_text}
        </p>
      </div>
    </button>
  );
};

export default CardJob;
