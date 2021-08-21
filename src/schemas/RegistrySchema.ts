export default class RegistrySchema {
  static schema = {
    name: 'Registry', 
    primaryKey: 'id',
    properties: {
      id: 'string', 
      title: 'string', 
      username: 'string', 
      content: 'string', 
      child_name: 'string', 
      date_created: 'string',
      date_updated: 'string'
    }, 
  }
}