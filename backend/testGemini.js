const {
  GoogleGenerativeAI,
} = require("@google/generative-ai");

const genAI =
  new GoogleGenerativeAI(
    "AIzaSyBDxypoFZW1fFOijG_SEF6tJNQ16L9RHqA"
  );

async function test() {

  try {

    const model =
      genAI.getGenerativeModel({
        model: "gemini-1.5-pro",
      });

    const result =
      await model.generateContent(
        "Say hello"
      );

    console.log(
      result.response.text()
    );

  } catch (error) {

    console.log(error);
  }
}

test();