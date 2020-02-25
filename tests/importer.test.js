const fs = require('fs-extra')
const path = require('path');

const importer = require('../importer.js')
const { DEFAULT_CONFIG } = require('../config.js');
const TEST_INPUT_FILE = 'test2.xml';

describe('Test importer functionality\n', () => {
  test('Should be able to', async () => {
    const inputFile = fs.readFileSync(path.join(__dirname, TEST_INPUT_FILE), 'utf8')
    const posts = await importer.importPosts(inputFile, DEFAULT_CONFIG)
    // expect(OldCar).toBeDefined();
    // const buick = new OldCar('Buick');
    // expect(buick).toHaveProperty('make', 'Buick');
    // expect(buick).toHaveProperty('currentSpeed');
    expect(posts).toBeDefined();
  });
});