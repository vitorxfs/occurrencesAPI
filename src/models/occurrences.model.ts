export interface OccurrencesAttributes{
  id?: number;
  description: string;
  code: string;
  registeredAt: Date;
}

export class Occurrences implements OccurrencesAttributes {
  id?: number;
  description: string;
  code: string;
  registeredAt: Date;

  constructor(attributes: OccurrencesAttributes) {
    this.id = attributes.id;
    this.description = attributes.description;
    this.code = attributes.code;
    this.registeredAt = attributes.registeredAt;
  }
}
