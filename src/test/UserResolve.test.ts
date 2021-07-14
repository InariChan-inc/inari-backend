import {Inject, PlatformApplication, PlatformTest} from "@tsed/common";
import {ApolloService} from "@tsed/apollo";
import "@tsed/platform-express";
import {ApolloServerTestClient, createTestClient} from "apollo-server-testing";
import gql from "graphql-tag";
import {Server} from "../Server";
import {DEFAULT_CONNECTION} from "@root/services/connections/DefaultConnection";
import {User} from "@root/entity/User/User";
import {getServers} from "dns";
import {JWTMidlleware} from "../midlleware/JWTMidlleware";
const express = require("express");

const registartionUser = gql`
  mutation {
    registartionUser(data: {email: "dix3@gmail.com", name: "dix3", password: "test12"}) {
      tokenData {
        token
        tokenExp
        refreshToken
        refreshTokenExp
      }
      userData {
        id
        name
        email
      }
    }
  }
`;

const loginUser = gql`
  mutation {
    loginUser(data: {email: "dix3@gmail.com", password: "test12"}) {
      tokenData {
        token
        tokenExp
        refreshToken
        refreshTokenExp
      }
      userData {
        id
        name
        email
      }
    }
  }
`;

const userProfile = gql`
  query {
    userProfile {
      id
      email
    }
  }
`;

const changeUserTheme = gql`
  mutation {
    changeUserTheme(data: {theme: LIGHT_THEME})
  }
`;

function getGraphqlClient(user?: User) {
  let server = PlatformTest.get<ApolloService>(ApolloService).get("typegraphql-default")!;

  if (user) {
    server.requestOptions.context = {
      user: user
    };
  }

  return createTestClient(server);
}

describe("User", () => {
  beforeAll(PlatformTest.bootstrap(Server));
  afterAll(PlatformTest.reset);

  beforeEach(async () => {
    const SUser = PlatformTest.get<DEFAULT_CONNECTION>(DEFAULT_CONNECTION);
    await SUser.manager.delete(User, {});
  });

  it("registartionUser", async () => {
    const response = await getGraphqlClient().mutate({
      mutation: registartionUser,
      variables: {}
    });

    expect(response.data).toEqual({
      registartionUser: {
        tokenData: {
          token: expect.any(String),
          refreshToken: expect.any(String),
          tokenExp: expect.any(Number),
          refreshTokenExp: expect.any(Number)
        },
        userData: {
          id: expect.any(String),
          name: expect.any(String),
          email: expect.any(String)
        }
      }
    });
  });

  it("loginUser", async () => {
    const responseR = await getGraphqlClient().mutate({
      mutation: registartionUser,
      variables: {}
    });

    expect(responseR.data).toEqual({
      registartionUser: {
        tokenData: {
          token: expect.any(String),
          refreshToken: expect.any(String),
          tokenExp: expect.any(Number),
          refreshTokenExp: expect.any(Number)
        },
        userData: {
          id: expect.any(String),
          name: expect.any(String),
          email: expect.any(String)
        }
      }
    });

    const response = await getGraphqlClient().mutate({
      mutation: loginUser,
      variables: {}
    });

    expect(response.data).toEqual({
      loginUser: {
        tokenData: {
          token: expect.any(String),
          refreshToken: expect.any(String),
          tokenExp: expect.any(Number),
          refreshTokenExp: expect.any(Number)
        },
        userData: {
          id: expect.any(String),
          name: expect.any(String),
          email: expect.any(String)
        }
      }
    });
  });

  it("userProfile", async () => {
    const responseR = await getGraphqlClient().mutate({
      mutation: registartionUser,
      variables: {}
    });

    expect(responseR.data).toEqual({
      registartionUser: {
        tokenData: {
          token: expect.any(String),
          refreshToken: expect.any(String),
          tokenExp: expect.any(Number),
          refreshTokenExp: expect.any(Number)
        },
        userData: {
          id: expect.any(String),
          name: expect.any(String),
          email: expect.any(String)
        }
      }
    });

    const response = await getGraphqlClient().mutate({
      mutation: loginUser,
      variables: {}
    });

    expect(response.data).toEqual({
      loginUser: {
        tokenData: {
          token: expect.any(String),
          refreshToken: expect.any(String),
          tokenExp: expect.any(Number),
          refreshTokenExp: expect.any(Number)
        },
        userData: {
          id: expect.any(String),
          name: expect.any(String),
          email: expect.any(String)
        }
      }
    });

    const responseUser = await getGraphqlClient(response.data.loginUser.userData).query({
      query: userProfile
    });

    expect(responseUser.data).toEqual({
      userProfile: {
        id: expect.any(String),
        email: "dix3@gmail.com"
      }
    });
  });

  it("changeUserTheme", async () => {
    const responseR = await getGraphqlClient().mutate({
      mutation: registartionUser,
      variables: {}
    });

    expect(responseR.data).toEqual({
      registartionUser: {
        tokenData: {
          token: expect.any(String),
          refreshToken: expect.any(String),
          tokenExp: expect.any(Number),
          refreshTokenExp: expect.any(Number)
        },
        userData: {
          id: expect.any(String),
          name: expect.any(String),
          email: expect.any(String)
        }
      }
    });

    const responseUser = await getGraphqlClient(responseR.data.registartionUser.userData).mutate({
      mutation: changeUserTheme
    });

    expect(responseUser.data).toEqual({
      changeUserTheme: true
    });
  });

  it("refsreshToken", async () => {
    const responseR = await getGraphqlClient().mutate({
      mutation: registartionUser,
      variables: {}
    });

    expect(responseR.data).toEqual({
      registartionUser: {
        tokenData: {
          token: expect.any(String),
          refreshToken: expect.any(String),
          tokenExp: expect.any(Number),
          refreshTokenExp: expect.any(Number)
        },
        userData: {
          id: expect.any(String),
          name: expect.any(String),
          email: expect.any(String)
        }
      }
    });

    const refreshToken = gql`
      mutation ($tokenR: String!) {
        refreshToken(tokenRefresh: $tokenR) {
          token
          refreshToken
          tokenExp
          refreshTokenExp
        }
      }
    `;

    const responseRefresh = await getGraphqlClient().mutate({
      mutation: refreshToken,
      variables: {tokenR: responseR.data.registartionUser.tokenData.refreshToken}
    });

    expect(responseRefresh.data).toEqual({
      refreshToken: {
        token: expect.any(String),
        refreshToken: expect.any(String),
        tokenExp: expect.any(Number),
        refreshTokenExp: expect.any(Number)
      }
    });
  });
});
