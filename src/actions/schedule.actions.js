import { scheduleConstants } from "../constants";
import { scheduleService } from "../api";
import { history } from "../store";

export const scheduleActions = {
  add,
  getAll,
  getById,
  update,
  delete: _delete,
};

function getAll() {
  return (dispatch) => {
    dispatch(request());

    scheduleService.getAll().then(
      (schedules) => {
        console.log(schedules);
        dispatch(success(schedules));
      },
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: scheduleConstants.GETALL_REQUEST };
  }
  function success(schedules) {
    return { type: scheduleConstants.GETALL_SUCCESS, schedules };
  }
  function failure(error) {
    return { type: scheduleConstants.GETALL_FAILURE, error };
  }
}

function getById(id) {
  return async (dispatch) => {
    dispatch(request(id));
    await scheduleService.getById(id).then(
      (schedules) => dispatch(success(schedules)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(id) {
    return { type: scheduleConstants.GETBYID_REQUEST, id };
  }
  function success(schedules) {
    return { type: scheduleConstants.GETBYID_SUCCESS, schedules };
  }
  function failure(error) {
    return { type: scheduleConstants.GETBYID_FAILURE, error };
  }
}

function add(schedule) {
  return async (dispatch) => {
    dispatch(request(schedule));
    await scheduleService.add(schedule).then(
      (schedule) => {
        dispatch(success(schedule));
        //history.push("/schedules");
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

  function request(schedule) {
    return { type: scheduleConstants.ADD_REQUEST, schedule };
  }
  function success(schedule) {
    return { type: scheduleConstants.ADD_SUCCESS, schedule };
  }
  function failure(error) {
    return { type: scheduleConstants.ADD_FAILURE, error };
  }
}

function update(id, schedule) {
  return async (dispatch) => {
    dispatch(request(id));
    await scheduleService.update(id, schedule).then(
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
    return { type: scheduleConstants.UPDATE_REQUEST, id };
  }
  function success(id) {
    return { type: scheduleConstants.UPDATE_SUCCESS, id };
  }
  function failure(error) {
    return { type: scheduleConstants.UPDATE_FAILURE, id, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return async (dispatch) => {
    dispatch(request(id));
    await scheduleService.delete(id).then(
      (id) => {
        dispatch(success(id));
        window.location.reload();
      },
      (error) => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: scheduleConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: scheduleConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: scheduleConstants.DELETE_FAILURE, id, error };
  }
}
