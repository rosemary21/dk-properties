import { format } from "number-currency-format";

export default function formatCurrency(currency: string,  number: number) {
  return format(number, {
    currency: currency,
    spacing: true,
    currencyPosition: "LEFT",
  });
}
