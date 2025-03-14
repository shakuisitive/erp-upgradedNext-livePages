const { configureStore, combineReducers } = require("@reduxjs/toolkit");

import mouseEvnt from "./slidebar/slidebar.slice";
import MobilBotNavSlices from "./mobilBotNav/mobilBotNav.slice";
import userSlice from "./user/userSlice";
import PurchaseSlices from "../app/(protected)/stock/(routes)/purchase/redux/Purchase.slice";
import receivingSlices from "../app/(protected)/stock/(routes)/receiving/redux/receivingSlices";
import stockSlices from "../app/(protected)/stock/(routes)/stock-order/redux/stockSlice";
import pmSlices from "../app/(protected)/stock/(routes)/product-master/redux/pmSlice";
import dashboardSlice from "../app/(protected)/dashboard/redux/dashboardSlice";
import DiscountGroupSlice from "../app/(protected)/settings/(routes)/discount-group/_redux/DiscountGroupSlice";
import PaymentTerm from "../app/(protected)/settings/(routes)/payment-term/_redux/paymentTermSlice";
import DrawerSlice from "../components/misc/pureComponents/rightdrawer/DrawerSlice";
//import UserListSlice from '../app/(protected)/security/(routes)/roles-and-permissions/redux/UserList.slice';
import customerSlice from "../app/(protected)/settings/(routes)/customer/_redux/customerSlice";
import RoleSlice from "./../app/(protected)/security/(routes)/roles-and-permissions/redux/Role.slice";
import PermissionSlice from "./../app/(protected)/security/(routes)/roles-and-permissions/redux/Permission.slice";
import supplierSlice from "../app/(protected)/settings/(routes)/supplier/redux/supplierSlice";
import warehouseSlice from "../app/(protected)/settings/(routes)/warehouse/_redux/warehouseSlice";
import taxSlice from "../app/(protected)/settings/(routes)/tax/redux/taxSlice";
import commonSlices from "./commonSlice";
import salesOrderSlice from "../app/(protected)/sales/(routes)/sales-order/redux/salesOrder.slice";
import physicalCountSlices from "./../app/(protected)/stock/(routes)/physical-count/redux/physicalCountSlice";
import sessionSlice from "../app/(protected)/settings/(routes)/sessions/_redux/sessionSlice";
import branchSlice from "../app/(protected)/settings/(routes)/branch/_redux/branchSlice";
import promotionSlice from "../app/(protected)/settings/(routes)/promotion/_redux/promotionSlice";
import prodCategorySlice from "../app/(protected)/settings/(routes)/product-category/_redux/prodCategorySlice";
import productTypeSlice from "./../app/(protected)/settings/(routes)/product-type/_redux/productTypeSlice";
import uowSlice from "../app/(protected)/settings/(routes)/uow/_redux/uowSlice";
import CycleCountSlice from "./../app/(protected)/stock/(routes)/cycle-count/redux/CycleCountSlice";
import TransferSlice from "./../app/(protected)/stock/(routes)/transfer/redux/TransferSlice";
import htCodeSlice from "./../app/(protected)/settings/(routes)/ht-code/_redux/htCodeSlice";
import varianceSlice from "./../app/(protected)/settings/(routes)/variance/_redux/varianceSlice";
import productClassSlice from "./../app/(protected)/settings/(routes)/product-class/_redux/productClassSlice";
import productGroupsSlice from "./../app/(protected)/settings/(routes)/product-groups/_redux/productGroupsSlice";
import SliceShiping from "./../app/(protected)/settings/(routes)/shipping-box/redux.js/SliceShiping";
import shippingCSlice from "../app/(protected)/settings/(routes)/shipping-carrier/_redux/shippingCSlice";
import purchaseGSlice from "./../app/(protected)/settings/(routes)/purchase-group/_redux/purchaseGSlice";
import brandSlice from "./../app/(protected)/settings/(routes)/brand/_redux/brandSlice";
import uomSlice from "../app/(protected)/settings/(routes)/uom/redux/uomSlice";
import ForexSlice from "../app/(protected)/settings/(routes)/forex/_redux/forexSlice";
import channelSlice from "../app/(protected)/settings/(routes)/channel/_redux/channelSlice";
import shippingConfigSlice from "../app/(protected)/settings/(routes)/shipping-config/_redux/ShipingConfigSlice";
import ChartSlice from "../app/(protected)/financial/(routes)/chart-of-account/_redux/chartSlice";
import glGroupSlice from "../app/(protected)/financial/(routes)/gl-group/_redux/GLGroupSlice";
import periodSlice from "../app/(protected)/financial/(routes)/period/_redux/PeriodSlice";

const rootReducer = combineReducers({
  // login:AuthSlice.reducer,
  mouseEvnt: mouseEvnt.reducer,
  MobilBotNavSlices: MobilBotNavSlices.reducer,
  commonSlices: commonSlices.reducer,
  user: userSlice.reducer,
  //UserListSlice: UserListSlice.reducer,
  RoleSlice: RoleSlice.reducer,
  PermissionSlice: PermissionSlice.reducer,
  //dashboardSlices: dashboardSlices.reducer,
  dashboardSlice: dashboardSlice.reducer,
  PurchaseSlices: PurchaseSlices.reducer,
  receivingSlices: receivingSlices.reducer,
  stockSlices: stockSlices.reducer,
  pmSlices: pmSlices.reducer,
  discountGroup: DiscountGroupSlice.reducer,
  paymentTerm: PaymentTerm.reducer,
  Drawer: DrawerSlice.reducer,
  supplierSlice: supplierSlice.reducer,
  customerSlice: customerSlice.reducer,
  sessionSlice: sessionSlice.reducer,
  tax: taxSlice.reducer,
  uow: uowSlice.reducer,
  uom: uomSlice.reducer,
  salesOrder: salesOrderSlice.reducer,
  physicalCount: physicalCountSlices.reducer,
  warehouseSlice: warehouseSlice.reducer,
  CycleCountSlice: CycleCountSlice.reducer,
  branchSlice: branchSlice.reducer,
  promotionSlice: promotionSlice.reducer,
  prodCategorySlice: prodCategorySlice.reducer,
  TransferSlice: TransferSlice.reducer,
  htCodeSlice: htCodeSlice.reducer,
  productTypeSlice: productTypeSlice.reducer,
  varianceSlice: varianceSlice.reducer,
  productClassSlice: productClassSlice.reducer,
  productGroupsSlice: productGroupsSlice.reducer,
  shippingCSlice: shippingCSlice.reducer,
  purchaseGSlice: purchaseGSlice.reducer,
  brandSlice: brandSlice.reducer,
  SliceShiping: SliceShiping.reducer,
  shippingConfigSlice:shippingConfigSlice.reducer,
  ForexSlice: ForexSlice.reducer,
  channelSlice: channelSlice.reducer,
  ChartSlice: ChartSlice.reducer,
  glGroupSlice: glGroupSlice.reducer,
  periodSlice: periodSlice.reducer,
});
export const store = configureStore({
  reducer: rootReducer,
  // reducer: {},
});
