const categorical = {
  name: 'categorical',
  identifier: 'C',
  syntax: /([a-zA-Z\_\-]+[0-9A-Za-z\_\-\$]*)*\s*=\s*(c|C)\{([^\}]+)\}/
}

module.exports = categorical;
