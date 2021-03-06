import * as sst from "@serverless-stack/resources";
import { StaticSite } from "@serverless-stack/resources";

export default class DashboardStack extends sst.Stack {
  readonly websiteUrl: string;

  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props);

    const website = new StaticSite(this, "DashboardReactSite", {
      path: "packages/dashboard",
      buildOutput: "dist",
      buildCommand: "npm run build",
      environment: {
      },
    });

    this.websiteUrl = website.url;

    // Show the endpoint in the output
    this.addOutputs({
      "DashboardUrl": this.websiteUrl,
    });
  }
}
