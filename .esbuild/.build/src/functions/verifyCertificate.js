var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// src/functions/verifyCertificate.ts
var verifyCertificate_exports = {};
__export(verifyCertificate_exports, {
  handler: () => handler
});

// src/utils/dynamodbClient.ts
var import_aws_sdk = require("aws-sdk");
var options = {
  region: "localhost",
  endpoint: "http://localhost:8000/",
  accessKeyId: "x",
  secretAccessKey: "x"
};
var isOffline = () => {
  return process.env.IS_OFFLINE;
};
var document = isOffline() ? new import_aws_sdk.DynamoDB.DocumentClient(options) : new import_aws_sdk.DynamoDB.DocumentClient();

// src/functions/verifyCertificate.ts
var handler = async (event) => {
  const { id } = event.pathParameters;
  const response = await document.query({
    TableName: "users_certificate",
    KeyConditionExpression: "id = :id",
    ExpressionAttributeValues: {
      ":id": id
    }
  }).promise();
  const userCertificate = response.Items[0];
  if (userCertificate) {
    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "Certificado v\xE1lido",
        name: userCertificate.name,
        url: `https://certificateignite-yan.s3.sa-east-1.amazonaws.com/${id}.pdf`
      })
    };
  }
  return {
    statusCode: 400,
    body: JSON.stringify({
      message: "Certificado inv\xE1lido"
    })
  };
};
module.exports = __toCommonJS(verifyCertificate_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=verifyCertificate.js.map
