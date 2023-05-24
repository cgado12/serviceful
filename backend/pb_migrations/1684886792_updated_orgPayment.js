migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h9e37uqwhptki9r")

  // remove
  collection.schema.removeField("tvqhumnr")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0a03apnx",
    "name": "orgID",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "xhj5dt9z9xhjf3f",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h9e37uqwhptki9r")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tvqhumnr",
    "name": "name",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("0a03apnx")

  return dao.saveCollection(collection)
})
