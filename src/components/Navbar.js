import React, { Component } from 'react'
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import Logo from "../marine.svg";
import'./Header.css';

class Navbar extends Component {

  render() {
    return (
        <div className="header_wrapper">

            <div className="header_logo">
                <img src={Logo} width={50} alt={"Allegory,The Defi Bank"} />
            </div>

            <div className="header_search">

                <div className="header_searchContainer">
                    <SearchOutlined />
                    <input placeholder="The Allegory Defi Bank" type="text"/>

                </div>

            </div>

            <div className="header_menuItems">

                <a  href="#">Allegory Stocks</a>
                <a   href="#">LiteraTi Portfolio</a>
                <a   href="#">Cash Rules</a>
                <a   href="#">Allegory Alerts!</a>
                <a   href="#">Allegory Account</a>

            </div>

        </div>
    );

  }
}

export default Navbar;
