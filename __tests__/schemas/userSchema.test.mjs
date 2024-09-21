/* eslint-disable */
import userSchema from "../../schemas/userSchema.mjs";

describe("userSchema Validation", () => {
  it("should validate a valid user object", () => {
    const result = userSchema.validate({
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "+6281234567890",
      email: "john.doe@example.com",
      password: "ValidPassword123!",
    });
    expect(result.error).toBeUndefined(); // Should be valid
  });

  it("should fail if firstName is too short", () => {
    const result = userSchema.validate({
      firstName: "Jo",
      lastName: "Doe",
      phoneNumber: "+6281234567890",
      email: "john.doe@example.com",
      password: "ValidPassword123!",
    });
    expect(result.error).toBeDefined();
  });

  it("should fail if firstName contains non-alphabetic characters", () => {
    const result = userSchema.validate({
      firstName: "John123",
      lastName: "Doe",
      phoneNumber: "+6281234567890",
      email: "john.doe@example.com",
      password: "ValidPassword123!",
    });
    expect(result.error).toBeDefined();
  });

  it("should fail if phoneNumber is in an invalid format", () => {
    const result = userSchema.validate({
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "1234567890", // Invalid format
      email: "john.doe@example.com",
      password: "ValidPassword123!",
    });
    expect(result.error).toBeDefined();
  });

  it("should fail if phoneNumber is less than 10 digits", () => {
    const result = userSchema.validate({
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "+62812345", // Too short
      email: "john.doe@example.com",
      password: "ValidPassword123!",
    });
    expect(result.error).toBeDefined();
  });

  it("should fail if email is invalid", () => {
    const result = userSchema.validate({
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "+6281234567890",
      email: "invalid-email",
      password: "ValidPassword123!",
    });
    expect(result.error).toBeDefined();
  });

  it("should fail if password does not meet the custom schema requirements", () => {
    const result = userSchema.validate({
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "+6281234567890",
      email: "john.doe@example.com",
      password: "123", // Invalid password
    });
    expect(result.error).toBeDefined();
  });

  it("should pass validation if lastName is missing", () => {
    const result = userSchema.validate({
      firstName: "John",
      phoneNumber: "+6281234567890",
      email: "john.doe@example.com",
      password: "ValidPassword123!",
    });
    expect(result.error).toBeUndefined(); // lastName is optional
  });
});
