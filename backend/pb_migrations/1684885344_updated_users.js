migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ptwbxw1u",
    "name": "role",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 3,
      "values": [
        "admin",
        "staff",
        "customer"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "los2wimm",
    "name": "orgId",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "xhj5dt9z9xhjf3f",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yzbbcwiq",
    "name": "address",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "36ov39md",
    "name": "phone",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ksp6141g",
    "name": "createdBy",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3lzo6gpg",
    "name": "updatedBy",
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
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // remove
  collection.schema.removeField("ptwbxw1u")

  // remove
  collection.schema.removeField("los2wimm")

  // remove
  collection.schema.removeField("yzbbcwiq")

  // remove
  collection.schema.removeField("36ov39md")

  // remove
  collection.schema.removeField("ksp6141g")

  // remove
  collection.schema.removeField("3lzo6gpg")

  return dao.saveCollection(collection)
})
