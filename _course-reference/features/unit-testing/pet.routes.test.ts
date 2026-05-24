import { describe, it, expect, beforeEach } from "@jest/globals";
import request from "supertest";
import app from "../../app";
import { AppDataSource } from "../../data-source";
import { Pet } from "../../entity/Pet";

describe("Pet Routes", () => {
  beforeEach(async () => {
    // Clear the pets table before each test
    const petRepository = AppDataSource.getRepository(Pet);
    await petRepository.clear();
  });

  describe("GET /api/pet", () => {
    it("should return an empty array when no pets exist", async () => {
      const response = await request(app).get("/api/pet");
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it("should return all pets when pets exist", async () => {
      // Create a test pet
      const petRepository = AppDataSource.getRepository(Pet);
      const pet = new Pet();
      pet.name = "Test Pet";
      await petRepository.save(pet);

      const response = await request(app).get("/api/pet");
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].name).toBe("Test Pet");
    });
  });

  describe("POST /api/pet", () => {
    it("should create a new pet", async () => {
      const newPet = {
        name: "New Pet",
      };

      const response = await request(app).post("/api/pet").send(newPet);

      expect(response.status).toBe(201);
      expect(response.body.name).toBe(newPet.name);
    });

    it("should return 400 when required fields are missing", async () => {
      const invalidPet = {
        name: "",
        // missing age and breed
      };

      const response = await request(app).post("/api/pet").send(invalidPet);

      expect(response.status).toBe(400);
    });
  });

  describe("GET /api/pet/:pet_id", () => {
    it("should return a specific pet", async () => {
      // Create a test pet
      const petRepository = AppDataSource.getRepository(Pet);
      const pet = new Pet();
      pet.name = "Test Pet";
      const savedPet = await petRepository.save(pet);

      const response = await request(app).get(`/api/pet/${savedPet.pet_id}`);
      expect(response.status).toBe(200);
      expect(response.body.name).toBe("Test Pet");
    });

    it("should return 404 when pet does not exist", async () => {
      const response = await request(app).get("/api/pet/999");
      expect(response.status).toBe(404);
    });
  });
});
