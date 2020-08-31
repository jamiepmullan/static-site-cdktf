
import { Construct } from 'constructs';
import { CloudfrontOriginAccessIdentity } from "../../.gen/providers/aws/cloudfront-origin-access-identity";

export class SiteCfOriginAccessIdentity extends CloudfrontOriginAccessIdentity {
  constructor(scope: Construct) {
    super(scope, "myOriginIdentity", {
        comment: "mySites Origin Identity",
    });
    
  }
}