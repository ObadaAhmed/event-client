export class EventModel {
  name: String;
  companyName: String;
  description: String;
  startDate: Date;
  endDate: Date;
  eventId: number;
  constructor(options?: {
    name: String,
    companyName: String,
    description: String,
    starDate: Date,
    endDate: Date,
    eventId: number
  }) {
    if (options) {
      this.name = options.name;
      this.companyName = options.companyName;
      this.description = options.description;
      this.startDate = options.starDate;
      this.endDate = options.endDate;
      this.eventId = options.eventId;
    }
  }
}
