// types/cart.ts
import { MenuItem } from "./menu";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  isVeg: boolean;
  lineTotal: number;
}

export interface CartState {
  items: CartItem[];
}

export type CartAction =
  | { type: "ADD_ITEM"; payload: { item: MenuItem; quantity: number } }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  | { type: "INCREASE_QUANTITY"; payload: { id: string } }
  | { type: "DECREASE_QUANTITY"; payload: { id: string } }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" };