import { resolveNumber } from './roman-math.util';

export async function parseFile(file) {
  return new Promise((resolve, reject) => {
    file.text().then(text => {
      const fileData = parseText(text);
      resolve(fileData);
    });
  });
}

function parseText(text) {
  let lines = asLines(text);

  const aliasesLines = getAliasesLines(lines);
  const aliases = defineAliases(aliasesLines);

  const priceLines = getFixedPriceLines(lines, aliases);
  const questionsLines = getFixedQuestionLines(lines, aliases);

  const prices = definePrices(priceLines);
  const questions = defineQuestions(questionsLines);

  /*
    handle invalid lines
  */

  return { aliases, prices, questions, questionsText: getQuestionLines(lines) };
}

function defineQuestions(lines) {
  const questions = [];

  lines.reduce((acc, line) => {
    let type, qty, material;

    const lineAsArray = line.split(' ');

    if (line.startsWith('quanto vale ')) {
      type = 'qty';
      qty = lineAsArray.slice(2, -1);
    } else if (line.startsWith('quantos créditos são ')) {
      type = 'price';
      qty = lineAsArray.slice(3, -2);
      material = lineAsArray.slice(-2, -1);
    }

    acc.push({ type, qty, material });
    return acc;
  }, questions);

  return questions;
}

function isPriceLine(line) {
  return line.endsWith('créditos');
}

function isQuestionLine(line) {
  return line.endsWith(' ?');
}

function isAliasLine(line) {
  const romanNumbers = process.env.VUE_APP_ROMAN_NUMBERS.split(',');

  return romanNumbers.some(romanNumber =>
    line.endsWith(`representa ${romanNumber}`)
  );
}

function getAliasesLines(lines) {
  return lines.filter(line => isAliasLine(line));
}

function getFixedPriceLines(lines, aliases) {
  lines = lines.map(line => line.toLowerCase());
  const priceLines = lines.filter(line => isPriceLine(line));
  return linesToRomanNumerals(priceLines, aliases);
}

function getQuestionLines(lines) {
  return lines.filter(line => isQuestionLine(line));
}

function getFixedQuestionLines(lines, aliases) {
  lines = lines.map(line => line.toLowerCase());
  const questionLines = lines.filter(line => isQuestionLine(line));
  return linesToRomanNumerals(questionLines, aliases);
}

function defineAliases(lines) {
  const aliases = {};

  lines.reduce((acc, line) => {
    const splitted = line.split(' representa ');
    const aliasObj = {
      alias: splitted[0],
      value: splitted[1],
    };

    acc[aliasObj.alias] = aliasObj.value;

    return acc;
  }, aliases);

  return aliases;
}

function definePrices(lines) {
  const prices = {};

  lines.reduce((acc, line) => {
    const lineAsArray = line.split(' ');
    lineAsArray.pop(); // removes 'créditos'
    const cost = Number(lineAsArray.pop());
    lineAsArray.pop(); // removes 'valem'
    const metal = lineAsArray.pop();
    const base = lineAsArray;

    acc[metal] = { cost, base };

    return acc;
  }, prices);

  return prices;
}


function linesToRomanNumerals(lines, aliases) {
  const aliasesAsArray = Object.entries(aliases);

  aliasesAsArray.forEach(alias => {
    const find = new RegExp(alias[0], 'g');
    lines = lines.map(line => line.replace(find, alias[1]));
  });

  return lines;
}

function asLines(text) {
  const readLines = text.split(/\n/);
  const noEmptyLines = readLines.filter(line => !!line);

  return noEmptyLines;
}
