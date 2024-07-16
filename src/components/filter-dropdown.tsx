"use client";

import { useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Filter } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

import { Button } from "@/src/components/ui/button";

export type FilterStatus = "" | "completed" | "pending";

export default function FilterDropdown() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const [fielterStatus, setFilterStatus] = useState<FilterStatus>(
    (searchParams.get("status") as FilterStatus) || ""
  );

  const handleChangeFilter = (filter: string) => {
    const params = new URLSearchParams(searchParams);

    filter ? params.set("status", filter) : params.delete("status");

    router.replace(`${pathName}?${params.toString()}`);

    setFilterStatus(filter as FilterStatus);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size={"default"}
          className="flex gap-2 text-slate-600"
        >
          <Filter className="h-4 w-4" />
          Status
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-16">
        <DropdownMenuLabel>Filtrar por:</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={fielterStatus}
          onValueChange={handleChangeFilter}
        >
          <DropdownMenuRadioItem value="">Todos</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="pending">
            Pendente
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="completed">
            Completo
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
