migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xhj5dt9z9xhjf3f")

  // remove
  collection.schema.removeField("qykfopux")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xhj5dt9z9xhjf3f")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qykfopux",
    "name": "subscriptionType",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "base",
        "plus",
        "enterprise"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
