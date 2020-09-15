import {translate} from './translator';

describe("Utils: Translator", () => {
  it("Words that start with a consonant have their first letter moved to the end of the word and the letters “ay” added to the end.", () => {
    const result = translate("Hello");
    expect(result).toEqual("Ellohay");
  });

  it("Words that start with a vowel have the letters “way” added to the end.", () => {
    const result = translate("apple");
    expect(result).toEqual("appleway");
  });

  it("Words that end in “way” are not modified.", () => {
    const result = translate("stairway");
    expect(result).toEqual("stairway");
  });

  it("Punctuation must remain in the same relative place from the end of the word.", () => {
    const result1 = translate("can’t");
    const result2 = translate("end.");

    expect(result1).toEqual("antca’y");
    expect(result2).toEqual("endway.");
  });

  it("Hyphens are treated as two words.", () => {
    const result = translate("this-thing");
    expect(result).toEqual("histay-hingtay");
  });

  it("Capitalization must remain in the same place.", () => {
    const result1 = translate("Beach");
    const result2 = translate("McCloud");

    expect(result1).toEqual("Eachbay");
    expect(result2).toEqual("CcLoudmay");
  });

  it("Works with a whole sentence", () => {
    const testText =
      "Hello apple stairway can't end. this-thing-apple Beach McCloud";

    const result = translate(testText);
    expect(result).toEqual(
      "Ellohay appleway stairway antca'y endway. histay-hingtay-appleway Eachbay CcLoudmay"
    );
  });
});
