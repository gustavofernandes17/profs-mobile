import Realm from 'realm'; 

import RegistrySchema from '../schemas/RegistrySchema'; 

export default function getRealm() {
  return Realm.open({schema: [ RegistrySchema ]});
}