import React from "react";
import GlobalNavbar from "./components/GlobalNavBar";

class AboutPage extends React.Component {
  render() {
    return (
      <div>
        <GlobalNavbar />

        {/* About Heading*/}
        <h1
          style={{
            fontFamily: "velvetica",
            paddingLeft: "20px",
            paddingTop: "10px"
          }}
        >
          ABOUT
        </h1>

        {/* Small description of this page */}
        <p
          style={{
            fontSize: "20px",
            fontFamily: "velvetica",
            paddingLeft: "20px"
          }}
        >
          This page will talk about our website and contributors
        </p>

        <br></br>

        {/* What is LineDriveBetting Heading*/}
        <h2
          style={{
            fontFamily: "velvetica",
            paddingLeft: "20px"
          }}
        >
          What is LineDriveBetting
        </h2>

        {/* Small summary of our project */}
        <p
          style={{
            fontSize: "20px",
            fontFamily: "velvetica",
            paddingLeft: "20px"
          }}
        >
          Some description
        </p>

        <br></br>

        {/* Purpose Heading*/}
        <h2
          style={{
            fontFamily: "velvetica",
            paddingLeft: "20px"
          }}
        >
          Purpose
        </h2>

        {/* Small description of purpose */}
        <p
          style={{
            fontSize: "20px",
            fontFamily: "velvetica",
            paddingLeft: "20px"
          }}
        >
          Some description
        </p>

        <br></br>

        {/* Intended Users Heading*/}
        <h2
          style={{
            fontFamily: "velvetica",
            paddingLeft: "20px"
          }}
        >
          Intended Users
        </h2>

        {/* Small description of our users */}
        <p
          style={{
            fontSize: "20px",
            fontFamily: "velvetica",
            paddingLeft: "20px"
          }}
        >
          Some description
        </p>

        <br></br>

        {/* Contributors Heading*/}
        <h2
          style={{
            fontFamily: "velvetica",
            paddingLeft: "20px"
          }}
        >
          Contributors
        </h2>

        {/* Group Name */}
        <p
          style={{
            fontSize: "20px",
            fontFamily: "velvetica",
            paddingLeft: "20px"
          }}
        >
          Group - Vermillion
        </p>

        {/* List of members */}
        <p
          style={{
            fontSize: "20px",
            fontFamily: "velvetica",
            paddingLeft: "20px"
          }}
        >
          Members
        </p>

        <p
          style={{
            fontSize: "15px",
            fontFamily: "velvetica",
            paddingLeft: "50px"
          }}
        >
          Each member: name, photo, bio, major, responsibilities, number of
          commits, number of issues, number of unit tests
        </p>

        <br></br>

        {/* Stats heading */}
        <h2
          style={{
            fontFamily: "velvetica",
            paddingLeft: "20px"
          }}
        >
          Stats
        </h2>

        {/* Number of commits, unit tests and issues */}
        <p
          style={{
            fontSize: "20px",
            fontFamily: "velvetica",
            paddingLeft: "20px"
          }}
        >
          Number of Commits:
        </p>
        <p
          style={{
            fontSize: "20px",
            fontFamily: "velvetica",
            paddingLeft: "20px",
            display: "inline-block"
          }}
        >
          Number of Unit Tests: Not Applicable for Phase 1
        </p>
        <p
          style={{
            fontSize: "20px",
            fontFamily: "velvetica",
            paddingLeft: "20px"
          }}
        >
          Number of Issues: 5
        </p>

        <br></br>

        {/* Data heading */}
        <h2
          style={{
            fontFamily: "velvetica",
            paddingLeft: "20px"
          }}
        >
          Data
        </h2>

        {/* Small description of each data sources with links provided */}
        <p
          style={{
            fontSize: "20px",
            fontFamily: "velvetica",
            paddingLeft: "20px"
          }}
        >
          Data sources w/ links and description of how each was scraped:
        </p>

        <br></br>

        {/* Tools heading */}
        <h2
          style={{
            fontFamily: "velvetica",
            paddingLeft: "20px"
          }}
        >
          Tools
        </h2>

        {/* Description of tools */}
        <p
          style={{
            fontSize: "20px",
            fontFamily: "velvetica",
            paddingLeft: "20px"
          }}
        >
          Name of tools and description of their uses:
        </p>

        <br></br>

        {/* Github repo */}
        <h2
          style={{
            fontFamily: "velvetica",
            paddingLeft: "20px",
            paddingBottom: "20px"
          }}
        >
          GitHub Repository:{" "}
          <a href="https://github.com/garzarobm/Vermillion_LineDriveBetting.git">
            LineDriveBetting
          </a>
        </h2>
      </div>
    );
  }
}

export default AboutPage;
