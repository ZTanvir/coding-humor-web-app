const app = require("./index");
const config = require("./utils/config");

const PORT = config.port || 3001;

// a sample comment has been added to see pull request

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
