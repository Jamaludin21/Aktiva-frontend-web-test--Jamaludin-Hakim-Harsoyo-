const express = require("express");
const axios = require("axios");
const corsAnywhere = require("cors-anywhere");
const path = require("path");

const app = express();
const host = "127.0.0.1";
const port = 5000;

const API_KEY =
  "q84UyfKL8ZFoo-gbZU4Ghbx2mL2ZYOlD7ThIdddAZ-ew1IHUC3tATJ_o_gfF29RgPTOWFeYTgEZyj2FEQSjUZ8vWY9K0S7uVYzCd0XQbmc5etaoHN2YJUvv5atCXZHYx";
const API_LIST_URL =
  "https://api.yelp.com/v3/businesses/search?location=NYC&sort_by=best_match&limit=10";
const API_DETAIL_URL = "https://api.yelp.com/v3/businesses/";

app.use(express.json());
app.use(express.static("public"));
app.use(express.static("src"));
app.use(express.static(path.join(__dirname, "..", "build")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.get("/", (req, res) => {
 res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/businesses", async (req, res) => {
  try {
    await axios
      .get(API_LIST_URL, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        mode: "cors",
      })
      .then((result) => {
        res.status(200).json(result.data);
        console.log("====================================");
        console.log(result.data);
        console.log("====================================");
      })
      .catch((err) => {
        res.status(500).json(err);
        console.log("====================================");
        console.log(err);
        console.log("====================================");
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

app.get("/businesses/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await axios
      .get(`${API_DETAIL_URL}${id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        mode: "cors",
      })
      .then((result) => {
        res.status(200).json(result.data);
        console.log("====================================");
        console.log(result.data);
        console.log("====================================");
      })
      .catch((err) => {
        res.status(500).json(err);
        console.log("====================================");
        console.log(err);
        console.log("====================================");
      });
    // }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

corsAnywhere.createServer({
  originWhitelist: [], // Mengizinkan permintaan dari semua origin
});
app.listen(port, () => {
  console.log(`Server running on port http://${host}:${port}`);
});
