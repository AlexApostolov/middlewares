// Help with an async action

// Return a function from this file, which when ran will return another function & another after that.
export default function({ dispatch }) {
  return next => action => {
    // Send it on if the action does not have a payload or a .then property
    if (!action.payload || !action.payload.then) {
      return next(action);
    }

    // Make sure the action's promise resolves by creating a new action & send it through all the middlewares again
    // but with the data as the payload not the promise
    action.payload.then(function(response) {
      const newAction = { ...action, payload: response };

      // We don't use "next" here which would just forward it on to the next middleware requiring a specific order of middleware;
      // instead we use "dispatch" so the action flows through all of our middleware stack
      // Use "dispatch" function to send the action to the topmost reducer again
      dispatch(newAction);
    });
  };
}
