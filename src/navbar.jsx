import React from "react";
import { Button } from "antd";
class Navbar extends React.Component {
  render() {
    return (
      //   <nav>
      //     <div class="col-md-12">
      //       <section id="breadcrumbs" class="breadcrumbs">
      //         <div class="container">
      //           <div class="d-flex justify-content-between align-items-center">
      //             <a href="/">List Business</a>
      //           </div>
      //         </div>
      //       </section>
      //     </div>
      //     </nav>
      <ul class="navbar">
        <Button href="/">List Business</Button>
        {/* <a href="/">List Business</a> */}
      </ul>
    );
  }
}

export default Navbar;
