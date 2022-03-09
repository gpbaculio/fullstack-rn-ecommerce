const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLEnumType,
} = require("graphql");
const {
  globalIdField,
  connectionDefinitions,
  connectionArgs,
  connectionFromArray,
} = require("graphql-relay");

const { Product } = require("../../../models");

const GraphQLProductType = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
    id: globalIdField("Product"),
    display_name: {
      type: GraphQLString,
      resolve: ({ display_name }) => display_name,
    },
    barCode: {
      type: GraphQLString,
      resolve: ({ barcode }) => barcode,
    },
    price: {
      type: GraphQLString,
      resolve: ({ price }) => price,
    },
    brand: {
      type: GraphQLString,
      resolve: ({ brand }) => brand,
    },
    category: {
      type: GraphQLString,
      resolve: ({ category }) => category,
    },
  }),
});

const { connectionType: productsConnection, edgeType: GraphQLProductEge } =
  connectionDefinitions({ name: "Products", nodeType: GraphQLProductType });

const GraphQLViewerType = new GraphQLObjectType({
  name: "Viewer",
  fields: () => ({
    id: globalIdField("Viewer"),
    products: {
      type: productsConnection,
      args: {
        search: { type: GraphQLString },
        categories: {
          type: new GraphQLList(GraphQLString),
        },
        brands: {
          type: new GraphQLList(GraphQLString),
        },
        sortPrice: {
          type: new GraphQLEnumType({
            name: "SORT_PRICE",
            values: {
              ASCENDING: { value: "ascending" },
              DESCENDING: { value: "descending" },
            },
          }),
        },
        ...connectionArgs,
      },
      resolve: async (_, { search, categories, brands, ...args }) => {
        try {
          console.log(
            "JSON.STRINGIFY",
            JSON.stringify({ search, categories, brands })
          );
          console.log("ARGS", JSON.stringify({ ...args }));

          const result = await Product.find({});
          return connectionFromArray(result, args);
        } catch (e) {
          return null;
        }
      },
    },
  }),
});

module.exports = GraphQLViewerType;
