import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice({
  name: "customerSlice",
  initialState: {
    distributionFormIndex: null,
    shipToFormIndex: null,
    formIndex: null,
    isModal: false,
    newFormModal: false,
    CusteditDetForm: [],
    refresh: false,
    province: [],
    purchaseGroup: [],
    warehouse: [],
    discount: [],
    taxes: [],
    taxDetails: [],
    promoDetails: [],
    newDistribution: false,
    newShipTo: false,
    promotionList: [],
    PartPriceList: [],
    countryList: [],
    partPriceOverrideList: [],
    accessFlag: null,
    newPartPriceId: null,
    partPricePayload: [],
    taxPayload: [],
    promoPayload: [],
    custBranchList: [],
    shipToList: [],
    clearPartPricePayload: false,
    distributionEditForm: [],
    shipToEditForm: [],
    pageCount: 25,
    FTTo: {},
    paymentTerm: [],
  },
  reducers: {
    setPaymentTerm(state, action) {
      state.paymentTerm = action.payload;
    },
    setNewDistribution(state, action) {
      state.newDistribution = action.payload;
    },
    setNewShipTo(state, action) {
      state.newShipTo = action.payload;
    },
    setEditDistribution(state, action) {
      state.distributionFormIndex = action.payload;
    },
    setEditShipTo(state, action) {
      state.shipToFormIndex = action.payload;
    },
    setCustBranchList(state, action) {
      state.custBranchList = action.payload;
    },
    setShipToList(state, action) {
      state.shipToList = action.payload;
    },
    CustEditForm(state, action) {
      state.formIndex = action.payload;
      state.isModal = true;
    },
    NewModal(state, action) {
      state.isModal = true;
    },
    closeModal(state, action) {
      state.newFormModal = false;
      state.isModal = false;
      state.formIndex = null;
      state.CusteditDetForm = [];
    },
    setNewModal(state, ation) {
      state.newFormModal = true;
    },
    setRefresh(state, action) {
      state.refresh = true;
    },
    setPartPriceOverrideList(state, action) {
      state.partPriceOverrideList = action.payload;
    },
    setNewPartPriceId(state, action) {
      state.newPartPriceId = action.payload;
    },
    setCustEditDetForm(state, action) {
      state.CusteditDetForm = action?.payload[0];
    },
    setDistributionEditForm(state, action) {
      state.distributionEditForm = action?.payload[0];
    },
    setShipToEditForm(state, action) {
      state.shipToEditForm = action?.payload[0];
    },
    setClearEditDistForm(state, action) {
      state.distributionEditForm = [];
      state.distributionFormIndex = null;
    },
    setClearEditShipToForm(state, action) {
      state.shipToEditForm = [];
      state.shipToFormIndex = null;
    },
    setProvince(state, action) {
      state.province = action.payload;
    },
    setPurchaseG(state, action) {
      state.purchaseGroup = action.payload;
    },
    setDiscountG(state, action) {
      state.discount = action.payload;
    },
    setWarehouse(state, action) {
      state.warehouse = action.payload;
    },
    setPartPriceList(state, action) {
      state.PartPriceList = action.payload;
    },
    setCountryList(state, action) {
      state.countryList = action.payload;
    },
    setAccessFlag(state, action) {
      state.accessFlag = action.payload;
    },
    setPartPricePayload(state, action) {
      const newRow = {
        PARPRICOVE_ID: action.payload.obj.PARPRICOVE_ID,
        PARPRICLIST_ID: action.payload.obj.PARPRICLIST_ID,
        CUS_ID: action.payload.obj.CUS_ID,
        PAR_ID: action.payload.obj.PAR_ID,
        ACTIVE_FLAG: action.payload.obj.ACTIVE_FLAG,
        BOLTON_FLAG: action.payload.obj.BOLTON_FLAG,
        PURGRO_ID: action.payload.obj.PURGRO_ID,
        LIST_PRICE: action.payload.list_price,
      };
      const index = state.partPricePayload.find((data) => {
        action.payload.id == data.PAR_ID;
      });
      if (index) {
        state.partPricePayload[index].LIST_PRICE == action.payload.LIST_PRICE;
      } else {
        state.partPricePayload.push(newRow);
      }
    },
    setTaxDetails(state, action) {
      state.taxDetails = action.payload;
    },
    setPromoDetails(state, action) {
      state.promoDetails = action.payload;
    },

    setTaxPayload(state, action) {
      const { TAX_ID, TAX_PERCENTAGE_RATE } = action.payload;
      const newRow = {
        CUSARTAX_ID: "",
        CUS_ID: state.formIndex.CUS_ID,
        TAX_ID: TAX_ID,
        REGISTRATION_NUMBER: null,
        TAX_PERCENTAGE_RATE: TAX_PERCENTAGE_RATE,
        TAX_EXEMPT_FLAG: "N",
        ACTIVE_FLAG: "Y",
        EXEMPTION_ID: "",
      };
      state.taxPayload.push(newRow);
    },
    setPromoPayload(state, action) {
      const { PROMO_ID } = action.payload;
      const newRow = {
        CUSPROMO_ID: "",
        PROMO_ID: PROMO_ID,
        CUS_ID: state.formIndex.CUS_ID,
        ACTIVE_FLAG: "Y",
      };
      state.promoPayload.push(newRow);
    },
    setClearPartPricePayload(state, action) {
      state.partPricePayload = [];
    },
    setClearTaxPayload(state, action) {
      state.taxPayload = [];
    },
    setClearPromoPayload(state, action) {
      state.promoPayload = [];
    },
    setPageCount(state, action) {
      state.pageCount = action.payload;
    },
    setFToT(state, action) {
      state.FTTo = action.payload;
    },
    setTaxes(state, action) {
      state.taxes = action.payload;
    },
    setPromotionList(state, action) {
      state.promotionList = action.payload;
    },
  },
});

export default customerSlice;

export const {
  CustEditForm,
  setShipToEditForm,
  setClearEditShipToForm,
  NewModal,
  closeModal,
  setTaxes,
  setEditDistribution,
  setPromotionList,
  setNewModal,
  setRefresh,
  setClearEditDistForm,
  setCustEditDetForm,
  setDiscountG,
  setPurchaseG,
  setWarehouse,
  setEditShipTo,
  setCustBranchList,
  setProvince,
  setPartPriceList,
  setShipToList,
  setCountryList,
  setPartPriceOverrideList,
  setAccessFlag,
  setNewPartPriceId,
  setTaxPayload,
  setNewShipTo,
  setPromoPayload,
  setPromoDetails,
  setPaymentTerm,
  setClearTaxPayload,
  setClearPromoPayload,
  setPartPricePayload,
  setClearPartPricePayload,
  setPageCount,
  setFToT,
  setTaxDetails,
  setNewDistribution,
  setDistributionEditForm,
} = customerSlice.actions;
