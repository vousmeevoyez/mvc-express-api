export default function jsonErrorMiddleware(err, req, res, next) {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON" });
  }
  next(); // Pass to the next middleware if not a JSON error
  return res;
}
