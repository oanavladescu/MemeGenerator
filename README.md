# MemeGenerator
A meme generating web app, developed using React library, JSX and CSS.

## Application's UI: 

![meme](https://user-images.githubusercontent.com/48363793/200413738-c0368016-eefa-4f17-9a0d-8c69829a06b9.JPG)

You can either get a random image using a fetch call to ImgFlip API, or upload your own image. Text will be inserted automatically as you type in. 

In order to make the "save" functionality, I used html2canvas library. For this to work you'll have to install it and its typings using the following commands:

* npm install --save html2canvas
* npm install --save @types/html2canvas
