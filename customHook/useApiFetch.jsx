"use client";

import { useState } from "react";
import { ENUM_USER } from "../constants/user.constants";
import { checkNull } from "../utils/utils";
import { useDispatch } from "react-redux";

function useApiFetch() {
  let [errorMessage, setErrorMessage] = useState();
  function sendHttpRequest(
    url,
    method,
    payload = null,
    action,
    accessToken = null,
    key = null
  ) {
    fetch(url, {
      method: method,
      body: JSON.stringify(payload),
      // headers: {
      //     'Content-Type': 'application/json'
      // }

      headers: {
        "Content-Type": "application/json",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }), // Add the Authorization header if accessToken is provided
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        return response.json();
      })
      .then((data) => {
        action(data, key);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }

  return [errorMessage, sendHttpRequest];
}

export const useFetchHook = () => {
  const dispatch = useDispatch();

  const getCallRequest = async (
    apiConstant = {},
    callback,
    headerToken = true
  ) => {
    if (checkNull(apiConstant?.ENDPOINT)) return;
    let requestHeader = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(headerToken && { Authorization: `Bearer ${ENUM_USER?.token}` }),
      },
    };

    try {
      const response = await fetch(
        endpointPrefix(apiConstant?.ENDPOINT),
        requestHeader
      ).then((resp) => handleResponse(resp));
      const json = await response;
      if (checkNull(callback)) {
        return json;
      } else {
        return dispatch(callback(json));
      }
    } catch (error) {
      throw new Error("Something went wrong " + error);
    }
  };

  const postCallRequest = async (
    apiConstant = {},
    callback,
    headerToken = true
  ) => {
    if (checkNull(apiConstant?.ENDPOINT) || checkNull(apiConstant?.PAYLOAD)) {
      return;
    }
    console.log("postCallRequest", ENUM_USER?.token, ENUM_USER);
    const payload = { ...apiConstant?.PAYLOAD, tid: "144", type: "rpc" };
    let requestHeader = {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        ...(headerToken && { Authorization: `Bearer ${ENUM_USER?.token}` }),
      },
    };

    try {
      const response = await fetch(
        endpointPrefix(apiConstant?.ENDPOINT),
        requestHeader
      ).then((resp) => handleResponse(resp));
      const json = await response;
      if (checkNull(callback)) {
        return json;
      } else {
        return dispatch(callback(json));
      }
    } catch (error) {
      throw new Error("Something went wrong " + error);
    }
  };

  const apiCall = { get: getCallRequest, post: postCallRequest };

  return { apiCall };
};

export const endpointPrefix = (endpoint) => {
  const serverLink = process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL;

  if (checkNull(serverLink) || checkNull(endpoint)) return "";

  if (serverLink.trim().endsWith("/") && endpoint.trim().startsWith("/")) {
    return serverLink.trim() + endpoint.trim().slice(1);
  } else if (serverLink.trim().endsWith("/")) {
    return serverLink.trim() + endpoint.trim();
  } else if (endpoint.trim().startsWith("/")) {
    return serverLink.trim() + endpoint.trim();
  } else {
    return serverLink.trim() + "/" + endpoint.trim();
  }
};

const handleResponse = (response) => {
  return response
    .text()
    .then((text) => {
      const data = text && JSON.parse(text);
      console.log("handleResponse", data, response);
      if (data?.CODE === "SUCCESS" || data?.CODE === "FAIL") {
        return data;
      } else {
        alert(
          "Your session has been expired. You will redirect on login screen"
        );
        // window.location.href = "/";
      }
    })
    .catch((e) => {
      throw new Error("Something went wrong " + error);
    });
};

export default useApiFetch;
