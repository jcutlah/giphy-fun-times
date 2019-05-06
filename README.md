# giphy-fun-times

Giphy Fun Times is a mobile-responsive web app that allows you to search for .gif images from Giphy.com. If you like what you find, you will have the option to save and/or download the images. This is made possible through [Giphy's API](https://developers.giphy.com/docs/)

A short list of pre-defined search terms are provided as clickable buttons. If you would like to choose your own search terms, you can do so by typing the search term into the text field on the page, and clicking 'Add Search Button'. This will add a clickable button to the existing series of buttons.

Clicking a button will search the Giphy database and add 10 results to the page (as long as the search comes up with at least 10 results.) The preview images in these results will be a 'downsampled' version of the original gif, allowing them to be displayed much faster. These results will be formatted as a slider module, which utilizes the jQuery library, [slick.js](https://kenwheeler.github.io/slick/).

When you click one of the search results, a lightbox container will feature the original gif image. On the lightbox, you will see options to 'add to favorites' or 'download' the image. 

Clicking 'download' will prompt a download of the .gif image.

Clicking 'add to favorites' will utilize the browser's local storage on the user's device. As long as the local storage is not deleted, the saved images will persist across different browser sessions (of the same browser) on that device.