import fs from "fs";
import path from "path";
import glob from "glob";

async function parseAssets() {
    const inputDir = path.resolve("source/attrib");
    const outputDir = path.resolve("data");
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

    const files = glob.sync("**/*.json", { cwd: inputDir });
    const units = files.map(f => {
        const raw = JSON.parse(fs.readFileSync(path.join(inputDir, f), "utf-8"));
        return {
            id: raw.template_id,
            name: raw.fields.ui_name_key,
            hp: raw.fields.hitpoints,
            attack: raw.fields.attack_damage,
            armor: raw.fields.armor,
            speed: raw.fields.move_speed
        };
    });

    fs.writeFileSync(`${outputDir}/units.json`, JSON.stringify(units, null, 2));
    console.log(`Parsed ${units.length} units.`);
}

parseAssets().catch(console.error);
