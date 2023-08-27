const handleOptionsRequests = (req, res, next) => {
  const origin = req.headers.origin
  // Allow requests from any origin that is allowed by cors
  res.setHeader('Access-Control-Allow-Origin', origin);
  // Allow the specific methods requested
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  // Allow the specific headers requested
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  // Handle the OPTIONS preflight request
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Handle the OPTIONS preflight request
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
  	next()
  }
};

module.exports = handleOptionsRequests