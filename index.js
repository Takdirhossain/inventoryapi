const app = require("./config/config");
const PORT = process.env.PORT || 5000;
const stockRoutes = require('./routes/stock')
app.use('/stock', stockRoutes);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
