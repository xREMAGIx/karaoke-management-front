import { receiptConstants } from "../constants";
import { receiptService } from "../api";
import { history } from "../store";

export const receiptActions = {
  add,
  getAll,
  getById,
  update,
  delete: _delete,
};

function getAll(url) {
  return async (dispatch) => {
    dispatch(request());
    await receiptService.getAll(url).then(
      (receipts) => dispatch(success(receipts)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: receiptConstants.GETALL_REQUEST };
  }
  function success(receipts) {
    return { type: receiptConstants.GETALL_SUCCESS, receipts };
  }
  function failure(error) {
    return { type: receiptConstants.GETALL_FAILURE, error };
  }
}

function getById(id) {
  return async (dispatch) => {
    dispatch(request(id));
    await receiptService.getById(id).then(
      (receipts) => dispatch(success(receipts)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(id) {
    return { type: receiptConstants.GETBYID_REQUEST, id };
  }
  function success(receipts) {
    return { type: receiptConstants.GETBYID_SUCCESS, receipts };
  }
  function failure(error) {
    return { type: receiptConstants.GETBYID_FAILURE, error };
  }
}

function add(receipt) {
  console.log(receipt);
  return async (dispatch) => {
    dispatch(request(receipt));
    await receiptService.add(receipt).then(
      (receipt) => {
        dispatch(success(receipt));
        history.push("/receipts");
        //window.location.reload();

        //window.location.reload();
        //dispatch(alertActions.success("Add new post successful"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        //dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(receipt) {
    return { type: receiptConstants.ADD_REQUEST, receipt };
  }
  function success(receipt) {
    return { type: receiptConstants.ADD_SUCCESS, receipt };
  }
  function failure(error) {
    return { type: receiptConstants.ADD_FAILURE, error };
  }
}

function update(id, receipt) {
  console.log(receipt);
  return async (dispatch) => {
    dispatch(request(id));
    await receiptService.update(id, receipt).then(
      (id) => {
        dispatch(success(id));
        history.push("/receipts");
        //dispatch(alertActions.success("Add new post successful"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        //dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(id) {
    return { type: receiptConstants.UPDATE_REQUEST, id };
  }
  function success(id) {
    return { type: receiptConstants.UPDATE_SUCCESS, id };
  }
  function failure(error) {
    return { type: receiptConstants.UPDATE_FAILURE, id, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return async (dispatch) => {
    dispatch(request(id));
    await receiptService.delete(id).then(
      (id) => {
        dispatch(success(id));
        window.location.reload();
      },
      (error) => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: receiptConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: receiptConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: receiptConstants.DELETE_FAILURE, id, error };
  }
}
