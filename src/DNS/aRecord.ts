
import { Construct } from 'constructs';
import { Route53Record } from "../../.gen/providers/aws/route53-record";
import { Route53Zone } from "../../.gen/providers/aws/route53-zone";
import { S3Bucket } from '../../.gen/providers/aws';

export class SiteARecord extends Route53Record {
  constructor(scope: Construct, domain: string, bucket: S3Bucket) {
    super(scope, "myRecord", {
       name: domain,
       records: [bucket.bucketDomainName],
       type: "A",
       zoneId: new Route53Zone(scope, "lookup", {
           name: domain
       }).zoneId
    });
    
  }

}