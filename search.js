const express = require("express");
const bp = require("body-parser");
const app = express();
const AppTitle =  "PokeSearch"
const search = require('google-it')

app.use(bp.json())
app.use(bp.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get("/", (req, res) => {
  res.render(process.cwd() + "/public/index.ejs", { title: AppTitle })
})

app.get("/search", (req, res) => {
  search({'query': `${req.query.query}`}).then(results => {
  res.render(process.cwd() + "/public/search.ejs", { results: results,title: AppTitle,search: req.query.query  })
    }).catch(e => {
  console.log(e)
})
})

app.get("/links", (req, res) => {
  const url = req.query.url
  res.redirect(req.query.url + "?utm=pokesearch")
})

app.listen(3000, () => {
  console.log("hi internet")
})
