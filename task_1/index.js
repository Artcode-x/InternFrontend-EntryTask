import { encoded, translations } from "./data.js"

const decodeFields = (encodedData, translations) => {
  return encodedData.map((item) => {
    const decodedItem = { ...item }
    for (const key in decodedItem) {
      if (
        key.endsWith("Id") &&
        key !== "groupId" &&
        key !== "service" &&
        key !== "formatSize" &&
        key !== "ca"
      ) {
        const id = decodedItem[key]

        if (translations[id]) {
          decodedItem[key.slice(0, -2)] = translations[id]
          delete decodedItem[key]
        }
      }
    }
    return decodedItem
  })
}

console.log("Let's rock")

console.log(decodeFields(encoded, translations))
