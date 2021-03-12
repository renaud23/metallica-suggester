import tokenizer from "string-tokenizer";
import removeAccents from "remove-accents";
import prepareStringIndexation from "./prepare-string-indexation";
import getStemmer from "./get-stemmer";
import defaultStopWords from "./stop-words";

function defaultTokenizeIt(string) {
  return [prepareStringIndexation(string)];
}

export function tokensToArray(tokenized) {
  return Object.entries(tokenized).reduce(function (a, [k, values]) {
    if (k.startsWith("pattern")) {
      if (typeof values === "string") {
        return [...a, values];
      }
      return [...a, ...values];
    }
    return a;
  }, []);
}

function filterLength(tokens, min = 2) {
  return tokens.filter(function (token) {
    return token.length >= min;
  });
}

function filterStemmer(tokens, language) {
  const stemmer = getStemmer(language);
  return tokens.map(function (token) {
    return stemmer(token);
  });
}

function filterStopWords(tokens, stops = defaultStopWords) {
  const mapSW = stops.reduce(function (a, w) {
    return { ...a, [w]: undefined };
  }, {});
  return tokens.reduce(function (a, t) {
    if (t in mapSW) {
      return a;
    }
    return [...a, t];
  }, []);
}

function createTokenizer(fields = []) {
  const FIELDS_TOKENIZER_MAP = fields.reduce(function (a, f) {
    const { name, rules = [], min, language = "French", stopWords } = f;
    if (rules.length) {
      const tokenRules = rules.reduce(function (a, pattern, index) {
        return { ...a, [`pattern${name}${index}`]: pattern };
      }, {});
      return {
        ...a,
        [name]: function (string) {
          const what = tokenizer().input(string).tokens(tokenRules).resolve();
          const words = filterStopWords(
            filterStemmer(filterLength(tokensToArray(what), min), language),
            stopWords
          );

          return words;
        },
      };
    }
    return { ...a, [name]: defaultTokenizeIt };
  }, {});

  return function (field, entity) {
    const { name } = field;
    const tokenizeIt = FIELDS_TOKENIZER_MAP[name];
    const value = `${entity[name]}`;
    return tokenizeIt(removeAccents(`${value}`).toLowerCase());
  };
}

function createEntityTokenizer(fields) {
  const tokenizer = createTokenizer(fields);
  return function (entity) {
    return fields.reduce(function (a, field) {
      return [...a, ...tokenizer(field, entity)];
    }, []);
  };
}

export default createEntityTokenizer;
