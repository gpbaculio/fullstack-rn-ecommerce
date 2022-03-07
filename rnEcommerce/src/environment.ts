import {
  Environment,
  Network,
  RecordSource,
  RequestParameters,
  Store,
  UploadableMap,
  Variables,
  CacheConfig,
  GraphQLResponse,
} from 'relay-runtime';
import Config from 'react-native-config';
import {Platform} from 'react-native';

const getRequestBodyWithUploadables = (
  _request: RequestParameters,
  _variables: Variables,
  uploadables: UploadableMap,
) => {
  const formData = new FormData();
  Object.keys(uploadables).forEach(key => {
    if (Object.prototype.hasOwnProperty.call(uploadables, key)) {
      formData.append(key, uploadables[key]);
    }
  });
  return formData;
};

const getRequestBodyWithoutUplodables = (
  request: RequestParameters,
  variables: Variables,
) =>
  JSON.stringify({
    query: request.text,
    variables,
  });

const getRequestBody = (
  request: RequestParameters,
  variables: Variables,
  uploadables: UploadableMap | null | undefined,
) => {
  if (uploadables) {
    return getRequestBodyWithUploadables(request, variables, uploadables);
  }
  return getRequestBodyWithoutUplodables(request, variables);
};

const fetchGraphQL = async (
  request: RequestParameters,
  variables: Variables,
  _: CacheConfig,
  uploadables?: UploadableMap | null | undefined,
): Promise<GraphQLResponse> => {
  const url =
    process.env.NODE_ENV === 'development'
      ? Platform.OS === 'android'
        ? Config.ANDROID_LOCAL_URL
        : 'http://localhost:3001/graphql'
      : '';
  console.log('url: ', url);
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      // Content-Type: "multipart/form-data"
      'Content-type': 'application/json',
      Accept: uploadables ? '*/*' : 'application/json',
    },
    body: getRequestBody(request, variables, uploadables),
  });

  const json = await response.json();

  if (Array.isArray(json.errors)) {
    console.log(json.errors);
    throw new Error(
      `Error fetching GraphQL query '${
        variables.name
      }' with variables '${JSON.stringify(variables)}': ${JSON.stringify(
        json.errors,
      )}`,
    );
  }

  return json;
};

export default new Environment({
  network: Network.create(fetchGraphQL),
  store: new Store(new RecordSource(), {
    gcReleaseBufferSize: 10,
  }),
});
