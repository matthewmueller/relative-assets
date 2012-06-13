var path = require('path'),
    dirname = path.dirname,
    relative = path.relative,
    join = path.join,
    cheerio = require('cheerio');

// Tags
var assets = exports.assets = ['script[src]', 'link', 'img'];

exports = module.exports = function($, source, root) {
  $ = ($.cheerio) ? $ : cheerio.load($);

  $(assets.join(',')).each(function() {
    var attr = (this.name === 'link') ? 'href' : 'src',
        $this = $(this);

    path = convert($this.attr(attr), source, root);

    $this.attr(attr, path);
  });
  
  return $;
};

var convert = exports.convert = function(path, source, root) {
  var directory = dirname(source);
  if(!path || path[0] === '/' || ~path.indexOf('http'))
    return path;
  
  // Full path from source directory
  path = join(directory, path);
  
  // Make relative to root
  path = relative(root, path);
  
  // Prepend '/'
  path = join('/', path);
  
  return path;
};