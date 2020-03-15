// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { elements, userdata, project } = initSchema(schema);

export {
  elements,
  userdata,
  project
};