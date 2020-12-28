module.exports = ({render}) => ({data} = {}) => (template, molinoData) =>
  render(template, {...molinoData, ...data});
