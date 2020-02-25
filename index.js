#!/usr/bin/env node
const fs = require('fs-extra')
const args = require('minimist')(process.argv.slice(2))

const importer = require('./importer.js')
const exporter = require('./exporter.js')
const DEFAULT_CONFIG = require('./config.js').DEFAULT_CONFIG

const runner = async () => {
    if (args._.length < 2) {
        console.error('Expects at least input file as first parameter, and export directory as second.')
        process.exit()
    }
    let config = DEFAULT_CONFIG;
    // if we decide to offer an overwritable .config
    // if (fs.existsSync(CONFIG_FILE_NAME)) {
    //     config = fs.readFileSync(CONFIG_FILE_NAME, 'utf8')
    // }
    const inputFilePath = args._[0]
    const outputDir = args._[1]
    const inputFile = fs.readFileSync(inputFilePath, 'utf8')
    const posts = await importer.importPosts(inputFile, config)
    await exporter.exportPosts(posts, outputDir)
}

runner()

module.exports.DEFAULT_CONFIG = DEFAULT_CONFIG;