const fs = require("fs");
const path = require("path");
const {
  getIntrospectionQuery,
  graphql,
  buildClientSchema,
  printSchema,
} = require("graphql");
const mkdirp = require("mkdirp");

const schema = require("../src/schema");
// const schemaPath = "../../rnEcommerce/data/schema.json";
// graphql({ schema, source: getIntrospectionQuery() })
//   .then((result) => {
//     console.log("result", result);
//     if (result.errors) {
//       console.error(
//         "ERROR introspecting schema: ",
//         JSON.stringify(result.errors, null, 2)
//       );
//     } else {
//       console.log(JSON.stringify(result, null, 2));
//     }
//   })
//   .catch(console.error);
// const result = buildClientSchema(getIntrospectionQuery());
// console.log("result: ", result);
const result = printSchema(schema);
console.log("result: ", result);
