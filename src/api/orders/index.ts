import { OrdersContent } from "./types";

export const getOrdersData = async (
  params?: Record<string, string>
): Promise<OrdersContent> => {
  const url = "https://apis.codante.io/api/orders-api/orders";

  const queryString = new URLSearchParams(params).toString();

  const fullUrl = `${url}?${queryString}`;

  const response = await fetch(fullUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
};
