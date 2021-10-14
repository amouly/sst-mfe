import * as sst from "@serverless-stack/resources";
import { ReactStaticSite } from "@serverless-stack/resources";

export default class DashboardStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props);

    const website = new ReactStaticSite(this, "DashboardReactSite", {
      path: "packages/dashboard",
      buildOutput: "dist",
      buildCommand: "npm run build",
      environment: {
      },
    });

    // Show the endpoint in the output
    this.addOutputs({
      "DashboardUrl": website.url,
    });
  }
}
