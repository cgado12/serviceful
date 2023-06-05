migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("orochhhtqld6amy")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "15yzoxjg",
    "name": "subscriptionPlanId",
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
  collection.schema.removeField("15yzoxjg")

  return dao.saveCollection(collection)
})
