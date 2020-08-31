
import { Construct } from 'constructs';
import { Route53Record } from "../../.gen/providers/aws/route53-record";
import { Route53Zone } from "../../.gen/providers/aws/route53-zone";

export class SiteARecord extends Route53Record {
  constructor(scope: Construct, domain: string) {
    super(scope, "myCert", {
       name: "site",
       type: "site",
       zoneId: new Route53Zone(scope, "lookup", {
           name: domain
       }).zoneId
    });
    
  }

}