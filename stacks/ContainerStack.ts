import * as sst from "@serverless-stack/resources";
import { ReactStaticSite } from "@serverless-stack/resources";

interface ContainerStackProps extends sst.StackProps {
  marketingUrl: string;
  authUrl: string;
  dashboardUrl: string;
}

export default class ContainerStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props: ContainerStackProps) {
    super(scope, id, props);

    const website = new ReactStaticSite(this, "ContainerReactSite", {
      path: "packages/container",
      buildOutput: "dist",
      buildCommand: "npm run build",
      environment: {
        REACT_APP_MARKETING_URL: props.marketingUrl,
        REACT_APP_AUTH_URL: props.authUrl,
        REACT_APP_DASHBOARD_URL: props.dashboardUrl,
      },
    });

    // Show the endpoint in the output
    this.addOutputs({
      "ContainerUrl": website.url,
    });
  }
}
