/* eslint-disable */
import {
  userProfileSchema,
  editUserProfileSchema,
} from "../../schemas/userProfileSchema.mjs";

describe("User Profile Schema Validation", () => {
  describe("userProfileSchema", () => {
    it("should validate a valid bio", () => {
      const result = userProfileSchema.validate({ bio: "This is a valid bio" });
      expect(result.error).toBeUndefined(); // No validation error
    });

    it("should fail if bio is missing", () => {
      const result = userProfileSchema.validate({});
      expect(result.error).toBeDefined(); // Validation error
    });

    it("should fail if bio is an empty string", () => {
      const result = userProfileSchema.validate({ bio: "" });
      expect(result.error).toBeDefined(); // Validation error
    });

    it("should fail if bio is not a string", () => {
      const result = userProfileSchema.validate({ bio: 123 });
      expect(result.error).toBeDefined(); // Validation error
    });
  });

  describe("editUserProfileSchema", () => {
    it("should validate a valid bio", () => {
      const result = editUserProfileSchema.validate({
        bio: "This is a valid bio",
      });
      expect(result.error).toBeUndefined(); // No validation error
    });

    it("should pass validation if bio is not provided (optional)", () => {
      const result = editUserProfileSchema.validate({});
      expect(result.error).toBeUndefined(); // No validation error
    });

    it("should fail if bio is an empty string", () => {
      const result = editUserProfileSchema.validate({ bio: "" });
      expect(result.error).toBeDefined(); // Validation error
    });

    it("should fail if bio is not a string", () => {
      const result = editUserProfileSchema.validate({ bio: 123 });
      expect(result.error).toBeDefined(); // Validation error
    });
  });
});
