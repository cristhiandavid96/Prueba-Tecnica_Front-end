// jest.config.js
module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    maxWorkers: 1, 
    transform: {
      "^.+\\.(ts|tsx)$": "ts-jest", // Usar ts-jest para archivos TypeScript
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  };
  