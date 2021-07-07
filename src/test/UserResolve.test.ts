import {PlatformTest} from "@tsed/common";
import {ApolloService} from "@tsed/apollo";
import "@tsed/platform-express";
import {ApolloServerTestClient, createTestClient} from "apollo-server-testing";
import {expect} from "chai";
import gql from "graphql-tag";
import {Server} from "../Server";

const registartionUser = gql`
  mutation {
    registartionUser(data: {email: "dix3@gmail.com", name: "dix3", password: "test12"}) {
      token
      tokenExp
      refreshToken
      refreshTokenExp
    }
  }
`;

describe("User", () => {
  let request: ApolloServerTestClient;
  beforeAll(PlatformTest.bootstrap(Server));
  beforeAll(() => {
    //const server = PlatformTest.get<ApolloService>(ApolloService).get("default")!;
    const server = PlatformTest.get<ApolloService>(ApolloService).get("typegraphql-default")!;
    
    request = createTestClient(server);
  });
  afterAll(PlatformTest.reset);

  it("should get recipes", async () => {
    const response = await request.mutate({
      mutation: registartionUser,
      variables: {}
    });

    console.log(response);

    // expect(response.data).equal({
    //   "loginUser": [
    //     {
    //         token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImV4cCI6MTYyNTY2ODg3MjI1OCwiaWF0IjoxNjI1NjY4NzY0MjU4fQ.uwvmlYkqxIH_Igz1ndx_a-Szht9ssJc1DDPldAYCgbY"
    //     }
    //   ]
    // });
  });
});
