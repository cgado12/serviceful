migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xhj5dt9z9xhjf3f")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "n5n0yec8",
    "name": "orgAdminId",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xhj5dt9z9xhjf3f")

  // remove
  collection.schema.removeField("n5n0yec8")

  return dao.saveCollection(collection)
})
