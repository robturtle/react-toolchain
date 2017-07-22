class ParameterError extends Error {}

function makeResponse(status, message, data) {
  return { status, data, message };
}

function makeError(err) {
  return makeResponse('error', err.message);
}

function makeData(data) {
  return makeResponse('success', '', data);
}

function extractAttributes(fields) {
  function extract(obj) {
    const extracted = {};
    for (let field of fields) {
      extracted[field] = obj[field];
    }
    return extracted;
  }
  return extract;
}

const extractUser = extractAttributes([
  'email',
  'name',
  'company',
  'location',
  'website',
]);

const extractSnippet = extractAttributes([
  'author',
  'scope',
  'name',
  'type',
  'keyword',
  'substitution',
]);

export {
  ParameterError,
  makeResponse,
  makeError,
  makeData,
  extractAttributes,
  extractUser,
  extractSnippet,
};
