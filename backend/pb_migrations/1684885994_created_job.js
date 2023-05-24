migrate((db) => {
  const collection = new Collection({
    "id": "orochhhtqld6amy",
    "created": "2023-05-23 23:53:14.157Z",
    "updated": "2023-05-23 23:53:14.157Z",
    "name": "job",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "vhnbqpek",
        "name": "title",
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
        "id": "hba6a6v0",
        "name": "services",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "okxvfq3a",
        "name": "notes",
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
        "id": "hqqchz10",
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
        "id": "jh0mhlry",
        "name": "start",
        "type": "date",
        "required": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "fqevfszn",
        "name": "end",
        "type": "date",
        "required": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "yyo3slwx",
        "name": "actualDuration",
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
        "id": "csdfymdc",
        "name": "payment",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "i2a8phyb2ly0x5a",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "8mqndvoy",
        "name": "jobStatus",
        "type": "select",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "pending",
            "in-progress",
            "complete"
          ]
        }
      },
      {
        "system": false,
        "id": "488mozhv",
        "name": "isJobRecurring",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "ikurjtnx",
        "name": "isPaymentRecurring",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "zq0fhuvl",
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
      },
      {
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
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("orochhhtqld6amy");

  return dao.deleteCollection(collection);
})
