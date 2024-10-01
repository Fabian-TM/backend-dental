import {app, server} from "./app";

const PORT = process.env.PORT || 4000;

app.set('port', PORT);

server.listen(app.get('port'), () => {
  console.log(`Server listening at port ${app.get('port')}`);
});
