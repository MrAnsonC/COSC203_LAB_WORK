/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "arpqugp60vkxemt",
    "created": "2024-08-25 22:58:13.110Z",
    "updated": "2024-08-25 22:58:13.110Z",
    "name": "Lab12",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "odb34ubh",
        "name": "author",
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
        "id": "jmf1cybg",
        "name": "content",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
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
  const collection = dao.findCollectionByNameOrId("arpqugp60vkxemt");

  return dao.deleteCollection(collection);
})
