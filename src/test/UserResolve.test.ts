import {Inject, PlatformTest} from "@tsed/common";
import {ApolloService} from "@tsed/apollo";
import "@tsed/platform-express";
import {ApolloServerTestClient, createTestClient} from "apollo-server-testing";
import gql from "graphql-tag";
import {Server} from "../Server";
import {DEFAULT_CONNECTION} from "@root/services/connections/DefaultConnection";
import {User} from "@root/entity/User/User";

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

const loginUser = gql`
  mutation {
    loginUser(data: {email: "dix3@gmail.com", password: "test12"}) {
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
    const server = PlatformTest.get<ApolloService>(ApolloService).get("typegraphql-default")!;

    request = createTestClient(server);
  });
  afterAll(PlatformTest.reset);

  beforeEach(async () => {
    const SUser = PlatformTest.get<DEFAULT_CONNECTION>(DEFAULT_CONNECTION);
    await SUser.manager.delete(User, {});
  });

  it("registartionUser", async () => {
    const response = await request.mutate({
      mutation: registartionUser,
      variables: {}
    });

    expect(response.data).toEqual({
      registartionUser: {
        token: expect.any(String),
        refreshToken: expect.any(String),
        tokenExp: expect.any(Number),
        refreshTokenExp: expect.any(Number)
      }
    });
  });

  it("loginUser", async () => {
    const responseR = await request.mutate({
      mutation: registartionUser,
      variables: {}
    });

    console.log(responseR.errors);

    expect(responseR.data).toEqual({
      registartionUser: {
        token: expect.any(String),
        refreshToken: expect.any(String),
        tokenExp: expect.any(Number),
        refreshTokenExp: expect.any(Number)
      }
    });

    const response = await request.mutate({
      mutation: loginUser,
      variables: {}
    });

    expect(response.data).toEqual({
      loginUser: {
        token: expect.any(String),
        refreshToken: expect.any(String),
        tokenExp: expect.any(Number),
        refreshTokenExp: expect.any(Number)
      }
    });
  });
});
