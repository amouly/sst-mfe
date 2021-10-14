import ContainerStack from "./ContainerStack";
import * as sst from "@serverless-stack/resources";
import DashboardStack from "./DashboardStack";
import MarketingStack from "./MarketingStack";
import AuthStack from "./AuthStack";

export default function main(app: sst.App): void {
  // Set default runtime for all functions
  app.setDefaultFunctionProps({
    runtime: "nodejs12.x"
  });

  const containerStack = new ContainerStack(app, "container-stack");

  const authStack = new AuthStack(app, "auth-stack");
  authStack.addDependency(containerStack);

  const dashboardStack = new DashboardStack(app, "dashboard-stack");
  dashboardStack.addDependency(containerStack);

  const marketingStack = new MarketingStack(app, "marketing-stack");
  marketingStack.addDependency(containerStack);
}
