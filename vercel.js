{
  "rewrites": [
    {
      "source": "/((?!api/.*).*)",
      "destination": "/index.html"
    }
  ],
  "routes": [
    {
      "src": "/[^.]+",
      "dest": "/"
    }
  ]
}