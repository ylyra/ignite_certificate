import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "../utils/dynamodbClient";

interface IUserCertificate {
  name: string;
  id: string;
  created_at: string;
  grade: string;
}

export const handler: APIGatewayProxyHandler = async (event) => {
  const { id } = event.pathParameters;

  const response = await document
    .query({
      TableName: "users_certificate",
      KeyConditionExpression: "id = :id",
      ExpressionAttributeValues: {
        ":id": id,
      },
    })
    .promise();

  if (response.Items.length > 0) {
    const userCertificate = response.Items[0] as IUserCertificate;

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Certificado valido.",
        name: userCertificate.name,
        url: `${process.env.S3_BUCKET_URL}/${id}.pdf`,
      }),
    };
  }

  return {
    statusCode: 400,
    body: JSON.stringify({
      message: "Certificado invalido.",
    }),
  };
};
