import { CurrencyEnum } from "@/types/product";

export const formatCurrency = (amount: number, currency: CurrencyEnum) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    currencyDisplay: "code", // Forces 'USD' / 'MMK' instead of '$'
    maximumFractionDigits: 0, // Removes decimal values completely
  });

  const parts = formatter.formatToParts(amount);

  const currencyCode =
    parts.find((part) => part.type === "currency")?.value || "";
  const numericValue = parts
    .filter((part) => part.type !== "currency")
    .map((part) => part.value)
    .join("")
    .trim();

  // Returns exactly: "100 USD" or "20,000 MMK"
  return `${numericValue} ${currencyCode}`;
};
