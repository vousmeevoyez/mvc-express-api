/* eslint-disable */
import request from "supertest";

export async function getAuthToken({ app, email, password }) {
  const { body: data } = await request(app)
    .post(`/api/auth/login/`)
    .send({ email, password });
  return data.token;
}
