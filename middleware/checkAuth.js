const checkAuth = (req, res, next) => {
  console.log('From checkAuth.js')

  next()
}

export default checkAuth