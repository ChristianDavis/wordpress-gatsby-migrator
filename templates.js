const postTemplate = (title, date, passthroughUrl, content, slug) => {
  const post = passthroughUrl
    ? `---
title: "${title}"
date: "${date}"
path: "${slug}"
templateKey: "BlogPost"
passthroughUrl: "${passthroughUrl}"
---

${content}
`
    : `---
title: "${title}"
date: "${date}"
path: "${slug}"
templateKey: "BlogPost"
---

${content}
`;
  return post;
};

module.exports = { post: postTemplate };
