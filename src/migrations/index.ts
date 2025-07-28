import * as migration_20250728_123555 from './20250728_123555';

export const migrations = [
  {
    up: migration_20250728_123555.up,
    down: migration_20250728_123555.down,
    name: '20250728_123555'
  },
];
