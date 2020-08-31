
import { Construct } from 'constructs';
import { AcmCertificate } from "../../.gen/providers/aws/acm-certificate";

export class SiteCertificate extends AcmCertificate {
  constructor(scope: Construct, domain: string, supportingDomains: string[]) {
    super(scope, "myCert", {
        domainName: domain,
        subjectAlternativeNames: supportingDomains
    });
  }
}