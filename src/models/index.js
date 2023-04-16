// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Report, DropStackNum, DropObject } = initSchema(schema);

export {
  Report,
  DropStackNum,
  DropObject
};