import { IamPolicy } from "../../.gen/providers/aws/iam-policy";
import { Construct } from "constructs";
import { CloudfrontOriginAccessIdentity } from "../../.gen/providers/aws/cloudfront-origin-access-identity";
import { S3Bucket } from "../../.gen/providers/aws";

export class SitePolicy extends IamPolicy {
    constructor(scope: Construct, cfId: CloudfrontOriginAccessIdentity, bucket: S3Bucket) {
        super(scope, "policy", {
            policy: {
                "Version": "2012-10-17",
                "Statement": [
                    {
                    "Sid": "PublicReadGetObject",
                    "Effect": "Allow",
                    "Principal": {
                        "AWS": `arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity ${cfId.id}`
                    },
                    "Action": [
                        "s3:GetObject"
                    ],
                    "Resource": [
                        `${bucket.arn}/*`
                    ]
                    }
                ]
            }.toString()
        })
    }
}
