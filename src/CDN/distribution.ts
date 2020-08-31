import { Construct } from 'constructs';
import { CloudfrontDistribution } from "../../.gen/providers/aws/cloudfront-distribution";
import { S3Bucket } from '../../.gen/providers/aws/s3-bucket';
import { CloudfrontOriginAccessIdentity } from '../../.gen/providers/aws/cloudfront-origin-access-identity';
import { AcmCertificate } from '../../.gen/providers/aws/acm-certificate';


export class SiteCdn extends CloudfrontDistribution {
  constructor(scope: Construct, bucket: S3Bucket, originIdentity: CloudfrontOriginAccessIdentity, cert: AcmCertificate ) {
    super(scope, "myCdn", {
      enabled: true,
      defaultCacheBehavior: [ 
        {
          allowedMethods: ["GET"],
          cachedMethods: ["GET"],
          forwardedValues: [{
            queryString: false,
            cookies: [
              { 
                forward: "none"
              }
            ],
          }],
          targetOriginId: "",
          viewerProtocolPolicy: ""
        }
      ],
      origin: [
        {
          domainName: bucket.bucketDomainName,
          originId: "",
          s3OriginConfig: [{
            originAccessIdentity: originIdentity.cloudfrontAccessIdentityPath
          }]
        }
      ],
      restrictions: [{
        geoRestriction: [{
          restrictionType: "none"
        }]
      }],
      viewerCertificate: [
        {
          acmCertificateArn: cert.arn,
          sslSupportMethod: "SSL",
        }
      ]
    });
    
  }

}