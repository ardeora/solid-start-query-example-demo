// import {
//   StartServer,
//   createHandler,
//   renderAsync,
// } from "solid-start/entry-server";

// export default createHandler(
//   renderAsync((event) => <StartServer event={event} />)
// );

import {
  createHandler,
  renderStream,
  StartServer,
} from "solid-start/entry-server";

export default createHandler(
  renderStream((event) => <StartServer event={event} />)
);
