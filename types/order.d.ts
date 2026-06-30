import { AdminUserType } from "./admin";
import { CouponType } from "./coupon";
import { PaymentType } from "./payment";
import { CurrencyEnum, ProductType } from "./product";
import { QueryType } from "./query-type";
import { StudentType } from "./student";

export interface ProofImage {
  id: number;
  url: string;
  transaction_ref: string;
  is_valid: string;
  created_at: string;
}

export interface OrderType {
  id: number;
  student_id: number;
  product_id: number;
  payment_id: number;
  coupon_id: number;
  discount_amount: number;
  amount: number;
  currency: CurrencyEnum;
  status: OrderStatusEnum;
  created_at: string;
  updated_at: string;
  student: StudentType;
  product: ProductType;
  payment: PaymentType;
  coupon: CouponType;
  proofImages: ProofImage[];
  orderConfirmHistories: OrderHistoryType[];
}

export interface OrderHistoryType {
  id: number;
  admin_id: number;
  status: OrderStatusEnum;
  note: string;
  created_at: string;
  admin: AdminUserType;
}

export const orderSortableFields = [
  "id",
  "student_id",
  "product_id",
  "payment_id",
  "coupon_id",
  "discount_amount",
  "amount",
  "currency",
  "status",
  "created_at",
  "updated_at",
] as const;

export type OrderStatusEnum = "PENDING" | "APPROVED" | "REJECTED";

export type OrderSortableField = (typeof orderSortableFields)[number];

export interface OrderQueryType extends QueryType<OrderSortableField> {
  status?: OrderStatusEnum;
  currency?: CurrencyEnum;
  student_id?: number;
  product_id?: number;
  payment_id?: number;
  coupon_id?: number;
}
