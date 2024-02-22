const axrio = require('@geshan/axrio');

async function getContents(url) {
  try {
    const timeoutInMs = 2000;
    const $ = await axrio.getPage(url, timeoutInMs);

    const bodyContents = $('body').contents().toArray()
      .map(element => element.type === 'tag' ? $(element).text().trim() + ' ' : '')
      .join(' ');

    return bodyContents;
  } catch (e) {
    console.log('Error ', e);
    return '';
  }
}

module.exports = {
  getContents
}
