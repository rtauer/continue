import * as PCL from "system/pcl";// include 3PQ Configuration Library
import * as utils from "utils"; // include Utility script

// called on configuration change until fixed point is found
globalThis.OnChangeConfiguration = () => {
    let quantity = PCL.GetSelectedValue("A_QUANTITY");
    let quantity2 = quantity * 2
    let test= 2
    let test2= 3


}