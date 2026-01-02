[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=21581365)

# Spell Sheet

An API that keeps track of your character, spells and spell slots.

[spellsheet live on Render](https://spellsheet.onrender.com)

## Sources 🗃️

List **ALL your used sources** here:

- [Gemini mongodb crash course](https://gemini.google.com/share/5a65f7f29434)
  - no code directly given
- [mongodb crud manual](https://www.mongodb.com/docs/manual/crud/#std-label-crud)
  - used in server.js
- [zod documentation](https://zod.dev/api)

### Used packages

- [zod](https://www.npmjs.com/package/zod)
  - used in server.js to run json checks in a maintainable way

### Endpoints

#### GET /pingMe

This is useless. But it sends back Bee Gees lyrics. Used to minimise server downtime to effectively 0.

#### POST /auth/characters

Get character data from this endpoint. Requires name and character ID.
Order of the keys is not important.

body:

```json
{
  "id": "id",
  "name": "name"
}
```

#### POST /characters

Add characters here. This returns the character object with the new ID.
Please save the ID, you won't be able to see your character again otherwise.
Order of the keys is not important.

body:

```json
{
  "name": "Mike the Almighty",
  "class": "Wizard",
  "level": 20,
  "stats": {
    "STR": 12,
    "DEX": 8,
    "CON": 14,
    "INT": 20,
    "WIS": 16,
    "CHA": 15
  },
  "spellSlots": [4, 3, 3, 3, 3, 2, 2, 1, 1],
  "spellList": ["wish"]
}
```

#### PATCH /characters

`name` and `level` can be replaced with any key in the character object. This only updates their respective fields. There is no "automatic" level up in this api at this moment.
Order of the keys is not important.

```json
{
  "id": "6945c27c15977d49a2d87e76",
  "name": "Franz",
  "level": 16
}
```

#### DELETE /characters/:id

Deletes your character.  
No second chances, don't do this by accident.
Or do... Like I care...

##### variables

id
