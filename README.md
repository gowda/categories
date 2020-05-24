# categories-api

## Run
### Install dependencies
```bash
$ bundle install
```

### Development server
```bash
$ bin/rails server
```

### RuboCop
```bash
$ bin/rails cop
```

### RSpec
```bash
$ bin/rails spec
```

## API
Every request must have `Content-Type` set to `application/json` & `Accept` must be `application/json` or `*/*`

### Get all categories
```
GET /api/categories
```

Response:

Status: `200`

Body:
```json
[
  {
    "id": "1",
    "label": "sample label - 1",
  },
  {
    "id": "2",
    "label": "sample label - 2",
  },
  ...
]
```

Only `16` entries are returned in the response.
Further entries can be fetched by passing `page` parameter:
```
GET /api/categories?page=2
```

### Get category details
```
GET /api/categories/1
```

Response:

Status: `200`

Body:
```json
{
  "id": "1",
  "label": "sample label - 1",
}
```

When a non-existant `id` is passed:
Status: `422`

Body:
```json
{
  "message": "Not found"
}
```

### Create a category
```
POST /api/categories
```

Request:

Body:
```json
{
  "label": "sample label - in request",
}
```

Response:

Status: `200`

Body:
```json
{
  "id": 3,
  "label": "sample label - in request"
}
```

When request body is missing or `label` is missing or blank or `null`:

Status: `422`

Body:
```json
{
  "message": "Validation failed",
  "errors": { "label": ["can't be blank"] }
}
```
