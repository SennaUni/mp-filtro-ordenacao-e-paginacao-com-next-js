"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { Link } from "../api/orders/types";

import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/src/components/ui/pagination";

export type FormatedLinks = Link & {
  id: number;
};

export type PaginationProps = {
  links: FormatedLinks[];
  pagesLenght: number;
};

export default function Pagination({ links, pagesLenght }: PaginationProps) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const handleClickPage = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);

    console.log(pageNumber);

    pageNumber >= 1 && pageNumber <= pagesLenght
      ? params.set("page", pageNumber.toString())
      : pageNumber < 1
      ? params.set("page", "1")
      : params.set("page", pagesLenght.toString());

    router.replace(`${pathName}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <PaginationComponent>
      <PaginationContent>
        <PaginationItem
          className={`${
            links[0].url ? "cursor-pointer" : "cursor-auto text-slate-300"
          }`}
          onClick={() =>
            handleClickPage(Number(searchParams.get("page") || 1) - 1)
          }
        >
          <PaginationPrevious />
        </PaginationItem>

        {links.map((link) => {
          if (link.label.includes("Anterior") || link.label.includes("Próximo"))
            return null;

          if (link.label === "...")
            return (
              <PaginationItem key={link.id}>
                <PaginationEllipsis />
              </PaginationItem>
            );

          return (
            <PaginationItem
              key={link.id}
              className="cursor-pointer hidden md:inline-flex"
            >
              <PaginationLink
                onClick={() => handleClickPage(Number(link.label))}
                isActive={link.active}
                dangerouslySetInnerHTML={{ __html: link.label }}
              />
            </PaginationItem>
          );
        })}

        <PaginationItem
          className={`${
            links[links.length - 1].url
              ? "cursor-pointer"
              : "cursor-auto text-slate-300"
          }`}
          onClick={() =>
            handleClickPage(Number(searchParams.get("page") || pagesLenght) + 1)
          }
        >
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </PaginationComponent>
  );
}
