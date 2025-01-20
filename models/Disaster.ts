import { BiDataQueryOptions, BiDataTable, TableCellValue } from 'mobx-lark';

import { larkClient } from './Base';

export type Disaster = Record<
  | 'id'
  | 'name'
  | 'englishName'
  | 'type'
  | `${'start' | 'end'}edAt`
  | 'originLocation'
  | 'coordinate'
  | 'impactScope',
  TableCellValue
>;

export const BASE_ID = process.env.NEXT_PUBLIC_BASE_ID!,
  DISASTER_TABLE_ID = process.env.NEXT_PUBLIC_DISASTER_TABLE_ID!;

export class DisasterModel extends BiDataTable<Disaster>() {
  client = larkClient;

  queryOptions: BiDataQueryOptions = { text_field_as_array: false };

  constructor(appId = BASE_ID, tableId = DISASTER_TABLE_ID) {
    super(appId, tableId);
  }
}
