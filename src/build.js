import fs from "fs";
import { compressToEncodedURIComponent } from "lz-string";

const app = fs.readFileSync("src/app.html", "utf8");

// minifique ANTES
const minified = app
    .replace(/\n+/g, "")
    .replace(/\s{2,}/g, " ");

const compressed = compressToEncodedURIComponent(minified);

let loader = fs.readFileSync("src/loader.html", "utf8");
loader = loader.replace("__PAYLOAD__", compressed);

fs.writeFileSync("dist/index.html", loader);

console.log("✔ Build concluído");
console.log("Payload size:", compressed.length, "bytes");