import React, { Component } from "react";
import html2canvas from "html2canvas";

class Meme extends Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      randomImg: "http://i.imgflip.com/1bij.jpg",
      allMemeImgs: [],
    };
    // this methods gets and displays meme text
    this.handleChange = this.handleChange.bind(this);
    // this method displays random images from API
    this.handleRandomGet = this.handleRandomGet.bind(this);
    // this method is for upload input
    this.handleUpload = this.handleUpload.bind(this);
    // this is for custom button for upload
    this.handleClick = this.handleClick.bind(this);
    // this is pretty obvious
    this.saveMeme = this.saveMeme.bind(this);
  }

  // API call to get all images and save them in an array
  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) => {
        const { memes } = response.data;
        this.setState({ allMemeImgs: memes });
      });
  }

  // Text handler method
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  // Generator handler method for getting random images
  handleRandomGet(event) {
    event.preventDefault(); // won't refresh the page
    const nr = Math.floor(Math.random() * this.state.allMemeImgs.length);
    const randomMemeImg = this.state.allMemeImgs[nr].url;
    this.setState({ randomImg: randomMemeImg });
  }

  // Upload method handler for input
  handleUpload(event) {
    if (event.target.files.length !== 0) {
      this.setState({
        randomImg: URL.createObjectURL(event.target.files[0]),
      });
    }
  }

  // Method for custom upload button
  handleClick(event) {
    event.preventDefault();
    document.getElementById("selectFile").click();
  }

  // Save meme method
  saveMeme() {
    const divToDisplay = document.getElementById("meme");
    html2canvas(divToDisplay, {
      allowTaint: true,
      useCORS: true,
      scrollY: -window.scrollY,
      scrollX: -window.scrollX,
    }).then(function (canvas) {
      var url = canvas.toDataURL("image/png");
      var link = document.createElement("a");
      link.download = "meme.png";
      link.href = url;
      link.click();
      console.log("end of saveMeme");
    });
  }

  render() {
    return (
      <main>
        {/* Text and Buttons form */}
        <form className="form">
          {/* top text */}
          <input
            type="text"
            name="topText"
            placeholder="Top text..."
            value={this.state.topText}
            onChange={this.handleChange}
            className="form-input"
          />
          {/* bottom text */}
          <input
            type="text"
            name="bottomText"
            placeholder="Bottom text..."
            value={this.state.bottomText}
            onChange={this.handleChange}
            className="form-input"
          />
          {/* upload button */}
          <button className="form-btn upload-btn" onClick={this.handleClick}>
            Upload an Image
          </button>
          {/* invisible input element for upload button */}
          <input
            type="file"
            accept="image/*"
            id="selectFile"
            onChange={this.handleUpload}
            style={{ display: "none" }} // invisible
          />

          {/* random image button */}
          <button className="form-btn" onClick={this.handleRandomGet}>
            Get Random Image
          </button>
        </form>

        {/* Meme Image div */}
        <div id="meme" className="meme">
          <img src={this.state.randomImg} alt="meme" className="meme-img" />
          <h2 className="top meme-text">{this.state.topText}</h2>
          <h2 className="bottom meme-text">{this.state.bottomText}</h2>
        </div>

        <button className="form-btn download-btn" onClick={this.saveMeme}>
          Save Me!
        </button>
      </main>
    );
  }
}

export default Meme;
