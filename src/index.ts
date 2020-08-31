import { Construct } from 'constructs';
import { App, TerraformStack } from 'cdktf';
import { SiteBucket } from './bucket/bucket';
import { SiteCdn } from './CDN/distribution';
import { SiteCfOriginAccessIdentity } from './CDN/identity';
import { SiteCertificate } from './CDN/cert';
import { AwsProvider } from '../.gen/providers/aws'
import { SitePolicy } from './bucket/policy';


class MySiteStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);
    
    this.bucket.policy=this.bucketPolicy.toString();
  }

  public provider = new AwsProvider(this, 'aws', {
    region: 'us-east-1'
  });

  public mydomain = "";
  public supportingDomains = [];

  public accessIdentity = new SiteCfOriginAccessIdentity(this);
  public bucket = new SiteBucket(this);
  public bucketPolicy = new SitePolicy(this, this.accessIdentity, this.bucket);
  public cert = new SiteCertificate(this, this.mydomain, this.supportingDomains);
  public cdn = new SiteCdn(this, this.bucket, this.accessIdentity, this.cert);
}

const app = new App();
new MySiteStack(app, 'static-site');
app.synth();
