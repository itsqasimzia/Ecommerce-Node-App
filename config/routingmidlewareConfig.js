const { loginValidation } = require("../middlewares/loginvalidation");
const { authRouter } = require("../routes/authRoutes");
const { inventoryRoutes } = require("../routes/inventory/inventory.routes");
const { publicRoutes } = require("../routes/Public/public.routes");

exports.routingMiddlewares = (app) =>{
    app.use("/auth", authRouter);
    app.use(loginValidation);
app.use("", publicRoutes);
app.use("/inventory", inventoryRoutes);
}