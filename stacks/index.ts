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

  const authStack = new AuthStack(app, "auth-stack");

  const dashboardStack = new DashboardStack(app, "dashboard-stack");

  const marketingStack = new MarketingStack(app, "marketing-stack");

  const containerStack = new ContainerStack(app, "container-stack", {
    marketingUrl: marketingStack.websiteUrl,
    authUrl: authStack.websiteUrl,
    dashboardUrl: dashboardStack.websiteUrl
  });
  containerStack.addDependency(authStack);
  containerStack.addDependency(dashboardStack);
  containerStack.addDependency(marketingStack);
}
