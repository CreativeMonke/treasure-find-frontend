import { setAlert } from "../features/alert/alertSlice";

const alertMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  // Only process relevant actions
  if (action.type.endsWith("/fulfilled") || action.type.endsWith("/rejected")) {
    let message;
    let severity;
    const { type, payload, error } = action;
    console.log(action);

    if (action.type.endsWith("/fulfilled")) {
      severity = "success";
      message = payload?.message || "Operation successful";
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

    if (severity !== "success") {
      store.dispatch(
        setAlert({
          message,
          severity,
          actionName: type,
        })
      );
    }
  }

  return result;
};

export default alertMiddleware;
