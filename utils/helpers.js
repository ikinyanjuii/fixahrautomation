class Helpers {
  static generateRandomEmail() {
    return `test${Math.random().toString(36).substring(2, 11)}@example.com`;
  }

  static generateRandomString(length = 8) {
    return Math.random().toString(36).substring(2, length + 2);
  }

  static async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static getCurrentTimestamp() {
    return new Date().toISOString().replace(/[:.]/g, '-');
  }
}

module.exports = Helpers;