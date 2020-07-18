# categories-api

![api](https://github.com/gowda/categories/workflows/api-lint-test-and-deploy/badge.svg)
![client](https://github.com/gowda/categories/workflows/client-lint-test-and-deploy/badge.svg)

## Setup

```bash
$ bin/setup
```

Create text indexes:

```bash
$ bin/rails db:mongoid:create_indexes
```

## Run development server

```bash
$ foreman start
```

Development server listens at [http://localhost:3000](http://localhost:3000).

## Linter

```bash
$ bin/rails cop
```

```bash
$ npm --prefix client run lint
```

## Tests

```bash
$ bin/rails test
```

```bash
$ npm --prefix client run test
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
  "label": "sample label - 1"
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
  "label": "sample label - in request"
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

## Deployment

Application is deployed using AWS CodeDeploy.

### Setup CodeDeploy configuration

Create an IAM Service Role for CodeDeploy using AWS Console by following
the instructions on [AWS documentation](https://docs.aws.amazon.com/codedeploy/latest/userguide/getting-started-create-service-role.html#getting-started-get-service-role-cli).

Get ARN for service role:

```bash
$ export CAPI_CODE_DEPLOY_ROLE=$(aws iam get-role --role-name CategoriesAPICodeDeployRole --query "Role.Arn" --output text)
```

#### Create application

```bash
$ aws deploy create-application --application-name categories-api
```

#### Create deployment group

```bash
$ aws deploy create-deployment-group --application-name categories-api \
      --ec2-tag-filters Key=application,Type=KEY_AND_VALUE,Value=categories-api \
      --deployment-group-name categories-api-deployment-group \
      --service-role-arn $CAPI_CODE_DEPLOY_ROLE
```

### Prepare EC2 instance

Create an EC2 instance using AWS Console by following instructions at [AWS Documentation](https://docs.aws.amazon.com/codedeploy/latest/userguide/instances-ec2-create.html).

### Deploy the revision

To deploy from the current `HEAD`:

```bash
$ aws deploy create-deployment \
  --application-name categories-api \
  --deployment-config-name CodeDeployDefault.OneAtATime \
  --deployment-group-name categories-api-deployment-group \
  --description "Deployment from master at $(date)" \
  --github-location repository=repository,commitId=$(git rev-parse HEAD)
```

## License

> "THE BEER-WARE LICENSE" (Revision 42):
> [Gowda](https://github.com/gowda) wrote this file. As long as you retain
> this notice you can do whatever you want with this stuff. If we meet
> some day, and you think this stuff is worth it, you can buy me a beer in return.
