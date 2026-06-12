const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const dir = path.join(__dirname, '../public/project3');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));

async function compress() {
  for (const file of files) {
    const input = path.join(dir, file);
    const outName = file.replace('.png', '.jpg');
    const output = path.join(dir, outName);

    await sharp(input)
      .resize({ width: 2000, withoutEnlargement: true })
      .jpeg({ quality: 82, progressive: true })
      .toFile(output);

    const before = (fs.statSync(input).size / 1024 / 1024).toFixed(2);
    const after = (fs.statSync(output).size / 1024 / 1024).toFixed(2);
    console.log(`${file} → ${outName}: ${before}MB → ${after}MB`);

    fs.unlinkSync(input);
    console.log(`  deleted ${file}`);
  }
}

compress().catch(console.error);
