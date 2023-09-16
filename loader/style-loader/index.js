module.exports = function (content) {
  const script = `
    let styleEle = document.createElement('style')
    styleEle.innerHTML = ${JSON.stringify(content)};
    document.head.appendChild(styleEle);
  `;
  return script;
};
