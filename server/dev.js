const app = require("./handler");
const port = 3001;

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
