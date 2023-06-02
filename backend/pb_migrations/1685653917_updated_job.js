migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("orochhhtqld6amy")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ixnm4hcs",
    "name": "subscriptionId",
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
  const collection = dao.findCollectionByNameOrId("orochhhtqld6amy")

  // remove
  collection.schema.removeField("ixnm4hcs")

  return dao.saveCollection(collection)
})
