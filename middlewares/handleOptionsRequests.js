const handleOptionsRequests = (req, res, next) => {
  //const origin = req.headers.origin
  // Allow requests from any origin that is allowed by cors
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Allow the specific methods requested
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  // Allow the specific headers requested
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  // Handle the OPTIONS preflight request
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Handle the OPTIONS preflight request
    res.sendStatus(200);
};

module.exports = handleOptionsRequests