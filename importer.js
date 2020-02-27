const feedRead = require('davefeedread');
const TurndownService = require('turndown');

// const turndownService = new TurndownService({
//     headingStyle: 'atx',
//     codeBlockStyle: 'fenced'
// })
const cheerio = require('cheerio');
const url = require('url');
const path = require('path');

const importPosts = async (file, options) => {
  const feed = await parseFeed(file);

  const { turndownOptions, additionalFields } = options;
  const turndownService = new TurndownService(turndownOptions);

  const isPost = item => item['wp:post_type']['#'] === 'post';
  const isPublished = item => item['wp:status']['#'] === 'publish';
  // const parseContent = item =>
  // Filter for only blog posts
  var items = feed.items.filter(isPost).filter(isPublished);

  // Map to new object type
  items = items.map(item => {
    if (!isPost(item)) {
      return;
    }
    const mappedItem = {
      title: item.title,
      date: item.date,
      content: item['content:encoded']['#'],
      categories: item.categories,
      author: item.author,
      slug: item['wp:post_name']['#']
    };

    // Add passthroughUrl if exists
    const postMeta = item['wp:postmeta'];
    if (postMeta) {
      const metaKey = postMeta['wp:meta_key'];
      if (metaKey) {
        const metaKeyValue = metaKey['#'];
        if (metaKeyValue == 'passthrough_url') {
          mappedItem.passthroughUrl = postMeta['wp:meta_value']['#'];
        }
      }
    }

    // Add images array
    const images = parseImages(mappedItem.content);
    images.forEach(image => {
      mappedItem.content = mappedItem.content.replace(
        image.url,
        image.fileName
      );
    });
    mappedItem.images = images;

    // Strip out Squarespace content tags
    mappedItem.content = removeSquarespaceCaptions(mappedItem.content);

    // Add Markdown conversion
    mappedItem.markdownContent = turndownService.turndown(mappedItem.content);

    return mappedItem;
  });

  return items;
};

const parseFeed = file => {
  return new Promise((resolve, reject) => {
    feedRead.parseString(file, undefined, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const parseImages = content => {
  const postElements = cheerio.load(content);
  const imagesElements = postElements('img');
  const images = imagesElements
    .map((index, item) => {
      const imageUrl = item.attribs['src'];
      console.log(url.parse(imageUrl));
      const imageExtension = path.extname(url.parse(imageUrl).pathname);
      const originalImageName = path.basename(
        url.parse(imageUrl).pathname,
        imageExtension
      );
      return {
        url: imageUrl,
        fileName: `${originalImageName}${imageExtension}`
      };
    })
    .toArray();
  return images;
};

const removeSquarespaceCaptions = post => {
  // remove the caption crap that gets put in by squarespace
  post = post.replace(/(\[caption.*"])(<.*>)(.*\[\/caption])/g, '$2');
  return post;
};

module.exports = { importPosts: importPosts };
