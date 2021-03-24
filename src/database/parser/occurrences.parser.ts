import { Occurrences as OccurrencesDbModel } from '../models/occurrences';
import { Occurrences } from '../../models/occurrences.model';

export class OccurrencesParser {
  parse(dbModel: OccurrencesDbModel): Occurrences {
    const {
      id,
      description,
      code,
      registeredAt,
    } = dbModel;

    return new Occurrences({
      id,
      description,
      code,
      registeredAt,
    });
  }
}
