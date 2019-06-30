# AWS Elasticsearch with Axios [![CircleCI](https://circleci.com/gh/possibilities/aws-elasticsearch-axios.svg?style=svg)](https://circleci.com/gh/possibilities/aws-elasticsearch-axios)

A small client for [AWS Elasticsearch](https://aws.amazon.com/elasticsearch-service/) based on the [Axios request library](https://github.com/axios/axios) and [AWS4](https://github.com/mhart/aws4).

## Usage

For now see [test suite](./__tests__) for usage

## API

### Client

#### Configure

###### `elasticsearch()`

##### Operations

In addition to the [HTTP verb-based API provided by Axios](https://github.com/axios/axios#axios-api) a helper is added for making bulk requests.

###### `bulk(arr)`
