migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("orochhhtqld6amy")

  // remove
  collection.schema.removeField("wakatibu")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dcawbszi",
    "name": "customerId",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "748hwtp34tged7y",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qweowc8v",
    "name": "createdBy",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("orochhhtqld6amy")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wakatibu",
    "name": "userId",
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

  // remove
  collection.schema.removeField("dcawbszi")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qweowc8v",
    "name": "employeeId",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
