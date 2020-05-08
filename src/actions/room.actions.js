import { roomConstants } from "../constants";
import { roomService } from "../api";
import { history } from "../store";

export const roomActions = {
  add,
  getAll,
  getById,
  update,
  delete: _delete,
};

function getAll() {
  return (dispatch) => {
    dispatch(request());

    roomService.getAll().then(
      (rooms) => {
        console.log(rooms);
        dispatch(success(rooms));
      },
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: roomConstants.GETALL_REQUEST };
  }
  function success(rooms) {
    return { type: roomConstants.GETALL_SUCCESS, rooms };
  }
  function failure(error) {
    return { type: roomConstants.GETALL_FAILURE, error };
  }
}

function getById(id) {
  return async (dispatch) => {
    dispatch(request(id));
    await roomService.getById(id).then(
      (rooms) => dispatch(success(rooms)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(id) {
    return { type: roomConstants.GETBYID_REQUEST, id };
  }
  function success(rooms) {
    return { type: roomConstants.GETBYID_SUCCESS, rooms };
  }
  function failure(error) {
    return { type: roomConstants.GETBYID_FAILURE, error };
  }
}

function add(room) {
  return async (dispatch) => {
    dispatch(request(room));
    await roomService.add(room).then(
      (room) => {
        dispatch(success(room));
        //history.push("/rooms");
        window.location.reload();

        //window.location.reload();
        //dispatch(alertActions.success("Add new post successful"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        //dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(room) {
    return { type: roomConstants.ADD_REQUEST, room };
  }
  function success(room) {
    return { type: roomConstants.ADD_SUCCESS, room };
  }
  function failure(error) {
    return { type: roomConstants.ADD_FAILURE, error };
  }
}

function update(id, room) {
  return async (dispatch) => {
    dispatch(request(id));
    await roomService.update(id, room).then(
      (id) => {
        dispatch(success(id));
        window.location.reload();
        //dispatch(alertActions.success("Add new post successful"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        //dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(id) {
    return { type: roomConstants.UPDATE_REQUEST, id };
  }
  function success(id) {
    return { type: roomConstants.UPDATE_SUCCESS, id };
  }
  function failure(error) {
    return { type: roomConstants.UPDATE_FAILURE, id, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return async (dispatch) => {
    dispatch(request(id));
    await roomService.delete(id).then(
      (id) => {
        dispatch(success(id));
        window.location.reload();
      },
      (error) => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: roomConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: roomConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: roomConstants.DELETE_FAILURE, id, error };
  }
}
