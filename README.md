# Blog Migrator from Wordpress Export to Gatsby
Migrate your Wordpress blog to Gatsby. This tool takes a Wordpress export, and produces a local folder structure with the content and images.

* Creates folders and files match post structure
* Converts contents to Markdown and stores in a local folder structure
* Fetches and saves images locally, updating image links in the content
* Supports link posts with a `passthrough_url`

## How to use

Install `npm i wordpress-gatsby-migrator -g`

Run `wordpress-gatsby-migrator INPUT_FILE OUTPUT_DIRECTORY`.

(Example `wordpress-gatsby-migrator input.xml blog`)

---
<p align="center">
  <b>By Weiran Zhang</b><br>
  <a href="https://weiran.co">Website</a> |
  <a href="https://twitter.com/weiran">Twitter</a> |
  <a href="https://github.com/weiran">GitHub</a>
</p>

## Configuration
config.js has the default configurations.