migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vf32x86q5hhbt10")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5eftg0zk",
    "name": "catalogId",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vf32x86q5hhbt10")

  // remove
  collection.schema.removeField("5eftg0zk")

  return dao.saveCollection(collection)
})
