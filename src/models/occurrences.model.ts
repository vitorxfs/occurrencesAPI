export interface OccurrenceAttributes{
  id?: number;
  description: string;
  code: string;
  registeredAt: Date;
}

export class Occurrence implements OccurrenceAttributes {
  id?: number;
  description: string;
  code: string;
  registeredAt: Date;

  constructor(attributes: OccurrenceAttributes) {
    this.id = attributes.id;
    this.description = attributes.description;
    this.code = attributes.code;
    this.registeredAt = attributes.registeredAt;
  }
}
