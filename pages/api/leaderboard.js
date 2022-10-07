import csv from 'csvtojson'

const bubbleSort = arr => {
  console.log(arr)
  for (var i = 0; i < arr.length; i++) {
    // Last i elements are already in place
    for (var j = 0; j < arr.length - i - 1; j++) {
      // Checking if the item at present iteration
      // is greater than the next iteration
      if (parseInt(arr[j].score) < parseInt(arr[j + 1].score)) {
        // If the condition is true then swap them
        var temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }
  // Print the sorted array
  console.log(arr)
}

export default async function handler (req, res) {
  if (req.method === 'GET') {
    const jsonArray = await csv().fromFile('appdata.csv')

    console.log(jsonArray)

    bubbleSort(jsonArray)
    res.status(200).json(jsonArray)
  }
}
