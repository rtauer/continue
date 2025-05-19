import * as PCL from "system/pcl";// include 3PQ Configuration Library
import * as utils from "utils"; // include Utility script

// called on configuration change until fixed point is found
globalThis.OnChangeConfiguration = () => {
//Free table: CUSTOMER ID. Depending on the country and membership type, the customer gets a different discount
    let countryID = PCL.GetSelectedValue("A_COUNTRY_ID");
    let membership = PCL.GetSelectedValue("A_MEMBERSHIP");
  
    let sqlQuery = "select "+membership+" from FT_CUSTOMER_ID where A_COUNTRY_ID = ?";
    let sqlArgs = [countryID];
    let dbDiscount = PCL.DatabaseExecuteQuery("EXTERNAL_DATA", sqlQuery, sqlArgs);
    let DiscountObject = dbDiscount.Rows[0]
    let DiscountValue = DiscountObject[membership]
  
    PCL.SetAttributeActive("A_DISCOUNT", true);
    PCL.SetValueSelected("A_DISCOUNT", DiscountValue, true);
    PCL.SetAttributeAllowed("A_DISCOUNT", false);

}