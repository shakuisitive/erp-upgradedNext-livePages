import { ENUM_API } from "../../../../../../constants/apis.constants";
import { useFetchHook } from "../../../../../../customHook/useApiFetch";
import { checkNull } from "../../../../../../utils/utils";
import * as slice from "./salesOrder.slice";

// export const dataListingSetter = (resp) => (dispatch) => {
//   dispatch(slice.salesOrderDefaultState());
//   if (resp?.CODE === "SUCCESS") {
//     const data = checkNull(resp?.Result) ? {} : resp?.Result;
//     dispatch(slice.dataListSetter(data));
//   }
// };

export const payloadBuilder = (payload) => {
  let salesConst = { ...ENUM_API.GetSaleOrderList };
  if (checkNull(payload)) return salesConst;

  for (let key of Object.keys(payload) ?? []) {
    salesConst = {
      ...salesConst,
      PAYLOAD: {
        ...salesConst.PAYLOAD,
        data: { ...salesConst.PAYLOAD.data, [key]: payload[key] },
      },
    };
  }
  return salesConst;
};

export const dataListingSetter = (apiCall, payload) => async (dispatch) => {
  dispatch(slice.salesOrderDefaultState());
  dispatch(slice.setSalesStateProperty({ title: "loading", value: true }));
  const resp = await apiCall.post(payloadBuilder(payload));
  if (resp?.CODE === "SUCCESS") {
    const data = checkNull(resp?.Result) ? {} : resp?.Result;
    dispatch(slice.dataListSetter(data));
  }
  dispatch(slice.setSalesStateProperty({ title: "loading", value: false }));
};

export const ncWebOrderSetter = (apiCall, payload) => async (dispatch) => {
  dispatch(slice.salesOrderDefaultState());
  dispatch(slice.setSalesStateProperty({ title: "loading", value: true }));
  const resp = await apiCall.post(payloadBuilder(payload));
  if (resp?.CODE === "SUCCESS") {
    const data = checkNull(resp?.Result) ? {} : resp?.Result;
    dispatch(slice.setSalesStateProperty({ title: "ncWebOrder", value: data }));
  }
  dispatch(slice.setSalesStateProperty({ title: "loading", value: false }));
};

export const boltonWebOrderSetter = (apiCall, payload) => async (dispatch) => {
  dispatch(slice.salesOrderDefaultState());
  dispatch(slice.setSalesStateProperty({ title: "loading", value: true }));
  const resp = await apiCall.post(payloadBuilder(payload));
  if (resp?.CODE === "SUCCESS") {
    const data = checkNull(resp?.Result) ? {} : resp?.Result;
    dispatch(slice.setSalesStateProperty({ title: "boltonWebOrder", value: data }));
  }
  dispatch(slice.setSalesStateProperty({ title: "loading", value: false }));
};

// export const ncWebOrderSetter = (resp) => (dispatch) => {
//   dispatch(slice.salesOrderDefaultState());
//   if (resp?.CODE === "SUCCESS") {
//     const data = checkNull(resp?.Result) ? {} : resp?.Result;
//     dispatch(slice.setSalesStateProperty({ title: "ncWebOrder", value: data }));
//   }
// };

// export const boltonWebOrderSetter = (resp) => (dispatch) => {
//   dispatch(slice.salesOrderDefaultState());
//   if (resp?.CODE === "SUCCESS") {
//     const data = checkNull(resp?.Result) ? {} : resp?.Result;
//     dispatch(
//       slice.setSalesStateProperty({ title: "boltonWebOrder", value: data })
//     );
//   }
// };
