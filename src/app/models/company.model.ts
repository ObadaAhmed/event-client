export class CompanyModel {
  companyOwner: String;
  companyName: String;
  description: String;
  location: String;
  logo: String;
  companyId: number;
  constructor(options?: {
    companyOwner: String,
    companyName: String,
    description: String,
    location: String,
    logo: String,
    companyId: number
  }) {
    if (options) {
      this.companyOwner = options.companyOwner;
      this.companyName = options.companyName;
      this.description = options.description;
      this.location = options.location;
      this.logo = options.logo;
      this.companyId = options.companyId;
    }
  }
}
