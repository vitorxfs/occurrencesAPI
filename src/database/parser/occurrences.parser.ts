import { Occurrence as OccurrenceDbModel } from '../models/occurrences';
import { Occurrence } from '../../models/occurrences.model';

export class OccurrenceParser {
  parse(dbModel: OccurrenceDbModel): Occurrence {
    const {
      id,
      description,
      code,
      registeredAt,
    } = dbModel;

    return new Occurrence({
      id,
      description,
      code,
      registeredAt,
    });
  }
}
