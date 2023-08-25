import visitorRoutes from "./visitors/visitors.routes.js";
import officerRoutes from "./user/officer.routes.js";
// import criminalRoutes from "./crime/criminal.routes.js";
import generalRoutes from "./general/general.routes.js";
import adminRoutes from "./admin/admin.routes.js";



const routers = (app) => {
  app.use("/visitors", visitorRoutes);
  app.use("/officers", officerRoutes);  
  app.use("/general", generalRoutes);
  app.use("/admin", adminRoutes);
};

export default routers;
