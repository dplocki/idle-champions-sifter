import fs = require('fs');

function multipleOption(input: string): string[] {
  return input
    .replace('<br>', ' ')
    .split(' / ');
}

function cleanLink(intput: string): string {
  return intput.substring(2, intput.length - 2);
}

const chunkSize: number = 25;
const allLines: [string] = fs.readFileSync('source.txt', 'utf8')
  .split('\r\n')
  .filter((line:string) => line.startsWith('|'))
  .map((line:string) => line.substr(1));

const chunks = Array(Math.ceil(allLines.length/chunkSize))
  .fill(null)
  .map((_: string, i: number) => allLines.slice(i * chunkSize, i * chunkSize + chunkSize));

const result = chunks.map(chunk => ({
    name: cleanLink(chunk[4]),
    race: chunk[10],
    affilation: multipleOption(chunk[23]).map((n:string) => cleanLink(n)),
    age: Number(chunk[6]),
    roles: multipleOption(chunk[9]),
    classes: multipleOption(chunk[11]),
    damage_type: multipleOption(chunk[12]),
    slot: Number(chunk[1]),
    cost: Number(chunk[2]),
    al_lc: chunk[7],
    al_gb: chunk[8],
    base_attack_cooldown: Number(chunk[13]),
    str: Number(chunk[14]),
    dex: Number(chunk[15]),
    con: Number(chunk[16]),
    int: Number(chunk[17]),
    wis: Number(chunk[18]),
    cha: Number(chunk[19]),
    overwhelm: parseInt(chunk[24])
  }));


fs.writeFileSync('database.json', JSON.stringify(result, null, 2));
