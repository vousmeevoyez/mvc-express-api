/* eslint-disable */
import {
  loginSchema,
  resetPasswordSchema,
  validateResetPasswordSchema,
} from "../../schemas/authSchema.mjs";

describe("Validation Schemas", () => {
  describe("loginSchema", () => {
    it("should validate a valid email and password", () => {
      const result = loginSchema.validate({
        email: "test@example.com",
        password: "validPassword123",
      });
      expect(result.error).toBeUndefined();
    });

    it("should fail if email is missing", () => {
      const result = loginSchema.validate({ password: "validPassword123" });
      expect(result.error).toBeDefined();
    });

    it("should fail if password is missing", () => {
      const result = loginSchema.validate({ email: "test@example.com" });
      expect(result.error).toBeDefined();
    });

    it("should fail if password is less than 6 characters", () => {
      const result = loginSchema.validate({
        email: "test@example.com",
        password: "short",
      });
      expect(result.error).toBeDefined();
    });

    it("should fail if email is invalid", () => {
      const result = loginSchema.validate({
        email: "invalid-email",
        password: "validPassword123",
      });
      expect(result.error).toBeDefined();
    });
  });

  describe("resetPasswordSchema", () => {
    it("should validate a valid email", () => {
      const result = resetPasswordSchema.validate({
        email: "test@example.com",
      });
      expect(result.error).toBeUndefined();
    });

    it("should fail if email is missing", () => {
      const result = resetPasswordSchema.validate({});
      expect(result.error).toBeDefined();
    });

    it("should fail if email is invalid", () => {
      const result = resetPasswordSchema.validate({
        email: "invalid-email",
      });
      expect(result.error).toBeDefined();
    });
  });

  describe("validateResetPasswordSchema", () => {
    it("should validate a valid token, password, and confirmPassword", () => {
      const result = validateResetPasswordSchema.validate({
        token: "valid.token.string",
        password: "validPassword123!",
        confirmPassword: "validPassword123!",
      });
      expect(result.error).toBeUndefined();
    });

    it("should fail if token is invalid", () => {
      const result = validateResetPasswordSchema.validate({
        token: "invalid-token",
        password: "validPassword123",
        confirmPassword: "validPassword123",
      });
      expect(result.error).toBeDefined();
    });

    it("should fail if password and confirmPassword do not match", () => {
      const result = validateResetPasswordSchema.validate({
        token: "valid.token.string",
        password: "validPassword123!",
        confirmPassword: "validPassword123!!",
      });
      expect(result.error).toBeDefined();
      expect(result.error.details[0].message).toBe(
        '"confirmPassword" does not match',
      );
    });

    it("should fail if password does not meet the requirements of the custom schema", () => {
      const result = validateResetPasswordSchema.validate({
        token: "valid.token.string",
        password: "123", // Assuming the custom password schema requires more complex passwords
        confirmPassword: "123",
      });
      expect(result.error).toBeDefined();
    });
  });
});
