import * as sst from "@serverless-stack/resources";
import { ReactStaticSite } from "@serverless-stack/resources";

export default class MarketingStack extends sst.Stack {
  readonly websiteUrl: string;

  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props);

    const website = new ReactStaticSite(this, "MarketingReactSite", {
      path: "packages/marketing",
      buildOutput: "dist",
      buildCommand: "npm run build",
      environment: {
      },
    });

    this.websiteUrl = website.url;

    // Show the endpoint in the output
    this.addOutputs({
      "MarketingUrl": this.websiteUrl,
    });
  }
}
