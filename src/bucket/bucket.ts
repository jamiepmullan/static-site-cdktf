import { Construct } from 'constructs';
import { S3Bucket } from "../../.gen/providers/aws/s3-bucket";

export class SiteBucket extends S3Bucket {
  constructor(scope: Construct) {
    super(scope, "myBucket", {
        acl: "private",
        website: [{
            indexDocument: "index.html"
        }],
        serverSideEncryptionConfiguration: [{
            rule: [{
                applyServerSideEncryptionByDefault: [{
                    sseAlgorithm: "AES256"
                }]
            }]
        }]
    });
  }
}