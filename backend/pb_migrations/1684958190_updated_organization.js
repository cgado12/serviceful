migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xhj5dt9z9xhjf3f")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uyzk81wp",
    "name": "trial",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xhj5dt9z9xhjf3f")

  // remove
  collection.schema.removeField("uyzk81wp")

  return dao.saveCollection(collection)
})
