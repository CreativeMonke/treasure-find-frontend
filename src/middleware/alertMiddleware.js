import { setAlert } from "../features/alert/alertSlice";

const alertMiddleware = (store) => (next) => async (action) => {
  let result;

  try {
    result = await next(action);
    if (action.type.startsWith("auth/")) {
      return result;
    }
    if (
      action.type.endsWith("/fulfilled") ||
      action.type.endsWith("/rejected")
    ) {
      let message;
      let severity;
      const { type, payload, error } = action;

      if (action.type.endsWith("/fulfilled")) {
        severity = payload?.data?.status || payload?.status || "success";
        message =
          payload?.data?.message || payload?.message || "Operation successful";
      } else if (action.type.endsWith("/rejected")) {
        severity = "error";
        message = error?.message || "An error occurred";

        if (payload && payload.response) {
          const { data, status } = payload.response;

          if (data?.data?.[0]) {
            message = data.data[0];
          } else if (data?.message) {
            message = data.message;
          } else if (payload?.message) {
            message = payload.message;
          } else if (error?.message) {
            message = error.message;
          } else {
            message = "Unknown error";
          }

          if (status >= 400 && status < 500) {
            severity = "warning";
          } else if (status >= 500) {
            severity = "error";
          }
        } else if (payload?.message) {
          message = payload.message;
        }
      }

      //Get function name from 'type', and send it to actionName
      const typeParts = type.split("/");
      const functionName = typeParts[typeParts.length - 2];

      if (true || severity !== "success") {
        store.dispatch(
          setAlert({
            message,
            severity,
            actionName: functionName,
          })
        );
      }
    }
  } catch (err) {
    console.error("Middleware error:", err);
    store.dispatch(
      setAlert({
        message: "An unexpected error occurred in middleware",
        severity: "error",
        actionName: action.type,
      })
    );
  } finally {
    return result;
  }
};

export default alertMiddleware;
