module.exports = (req, res) => {
  res.status(200).json({ status: 'ok', service: 'Webify & Co API', timestamp: new Date().toISOString() });
};
