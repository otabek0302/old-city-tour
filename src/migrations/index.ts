import * as migration_20250728_123555 from './20250728_123555';
import * as fixReviewsForeignKey from './fix-reviews-foreign-key';
import * as fixAllForeignKeys from './fix-all-foreign-keys';
import * as fixLocalizedFields from './fix-localized-fields';
import * as fixTourLocalizedFields from './fix-tour-localized-fields';

export const migrations = [
  {
    up: migration_20250728_123555.up,
    down: migration_20250728_123555.down,
    name: '20250728_123555'
  },
  {
    up: fixReviewsForeignKey.up,
    down: fixReviewsForeignKey.down,
    name: 'fix-reviews-foreign-key'
  },
  {
    up: fixAllForeignKeys.up,
    down: fixAllForeignKeys.down,
    name: 'fix-all-foreign-keys'
  },
  {
    up: fixLocalizedFields.up,
    down: fixLocalizedFields.down,
    name: 'fix-localized-fields'
  },
  {
    up: fixTourLocalizedFields.up,
    down: fixTourLocalizedFields.down,
    name: 'fix-tour-localized-fields'
  },
];
