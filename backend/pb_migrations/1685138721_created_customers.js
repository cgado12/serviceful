migrate((db) => {
  const collection = new Collection({
    "id": "748hwtp34tged7y",
    "created": "2023-05-26 22:05:21.151Z",
    "updated": "2023-05-26 22:05:21.151Z",
    "name": "customers",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "actkdeer",
        "name": "firstName",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "jab5owfw",
        "name": "lastName",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "smhqfw2u",
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
      },
      {
        "system": false,
        "id": "fsotfw6f",
        "name": "address",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "hms3po1x",
        "name": "phone",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "udrnhpku",
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
      },
      {
        "system": false,
        "id": "n0dbj1kc",
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
      },
      {
        "system": false,
        "id": "2fsrpk6b",
        "name": "jobs",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "orochhhtqld6amy",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": []
        }
      }
    ],
    "indexes": [],
    "listRule": "@request.auth.role:each ~ 'admin' && @request.auth.orgId = orgId ",
    "viewRule": "",
    "createRule": "",
    "updateRule": "id = @request.auth.id",
    "deleteRule": "id = @request.auth.id",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("748hwtp34tged7y");

  return dao.deleteCollection(collection);
})
