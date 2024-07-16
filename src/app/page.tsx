import { getOrdersData } from "../api/orders";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

import Pagination from "@/src/components/pagination";
import SearchInput from "@/src/components/search-input";
import OrdersTable from "@/src/components/orders-table";
import FilterDropdown, { FilterStatus } from "@/src/components/filter-dropdown";

export type MainPageProps = {
  searchParams?: {
    sort?: string;
    page?: string;
    search?: string;
    status?: FilterStatus;
  };
};

export default async function MainPage({ searchParams }: MainPageProps) {
  const { data, meta } = await getOrdersData(searchParams);

  const formatedLinks = meta.links.map((link, index) => ({
    ...link,
    id: index,
  }));

  return (
    <main className="container px-1 py-10 md:p-10">
      <Card>
        <CardHeader className="px-7">
          <CardTitle>Pedidos</CardTitle>

          <CardDescription>
            Uma listagem de pedidos do seu negócio.
          </CardDescription>

          <div className="flex pt-10 gap-4">
            <SearchInput />
            <FilterDropdown />
          </div>
        </CardHeader>

        <CardContent>
          <OrdersTable orders={data} />

          <div className="mt-8">
            <Pagination links={formatedLinks} pagesLenght={meta.last_page} />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
