import React, { Component } from 'react';
import DlgAbout from './DlgAbout';
import  data from "./Data";
const path=window.require("path");
const fs=window.require("fs");
const electron = window.require('electron');
const { ipcRenderer } =window.require("electron");//
const fontSize = 16;
const toolbar_h=80;
class HtmlEditor extends Component {
  constructor() {
    super();
    data.getconfig();
    ipcRenderer.on("request_close",()=>{
          data.saveconfig();
          ipcRenderer.send("close");
    })
    ipcRenderer.on("save", ()=>{
      this.save_click();
    });
    ipcRenderer.on("new",()=>{
      this.newfile();
    })
    ipcRenderer.on("open",()=>{
      this.open_click();
    })
    ipcRenderer.on("about",()=>{
          this.setState({show_about:true});
    })
    ipcRenderer.on("goback",()=>{
        // this.setState({show_about:true});
        this.w.history.back();
    })
    this.state = {
      show_about:false,
      filename_input:"http://www.baidu.com",
      filename:"http://www.baidu.com",
    };
  }
  componentDidMount() {
    var iframe = document.getElementById("preview");
    var iwindow = iframe.contentWindow;
    this.w=iwindow;
  }
  componentWillUnmount() {}
  filename_change=(e)=>{
    this.setState({filename_input:e.target.value})
  }
  about_click=()=>{
    this.setState({show_about:true});
  }
  go_click=()=>{
    this.setState({filename:this.state.filename_input});
  }
  render() {
    return (
      <div>
        <DlgAbout showModal={this.state.show_about} closeModal={()=>{
            this.setState({show_about:false});
          }} />
        <input onChange={this.filename_change} value={this.state.filename_input}></input>
        <button onClick={this.go_click}>go</button>
        <button onClick={()=>{
          this.w.history.back();
        }}>back</button>
        <button onClick={()=>{
          this.w.history.forward();
        }}>forward</button>
        <button onClick={this.about_click}>about</button>
        <iframe id="preview" src={this.state.filename} style={{width:"100%",height:"100%"}}></iframe>
        <style jsx="true">{`
          body {
            margin: 0 0 0 0;
            padding: 0 0 0 0;
          }
        `}</style>
      </div>
    );
  }
}

export default HtmlEditor;
