import Button, { $ButtonSettings } from "sap/m/Button";
import ComboBox, { $ComboBoxSettings } from "sap/m/ComboBox";
import ComboBoxTextField from "sap/m/ComboBoxTextField";
import Dialog, { $DialogSettings } from "sap/m/Dialog";
import Input from "sap/m/Input";
import Label from "sap/m/Label";
import MessageBox from "sap/m/MessageBox";
import MessageToast from "sap/m/MessageToast";
import Panel from "sap/m/Panel";
import SearchField from "sap/m/SearchField";
import Table from "sap/m/Table";
import Event from "sap/ui/base/Event";
import EventProvider from "sap/ui/base/EventProvider";
import SmartFilterBar from "sap/ui/comp/smartfilterbar/SmartFilterBar";
import Item from "sap/ui/core/Item";
import UIComponent from "sap/ui/core/UIComponent";
import Controller from "sap/ui/core/mvc/Controller";
import View from "sap/ui/core/mvc/View";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import FilterType from "sap/ui/model/FilterType";
import Model from "sap/ui/model/Model";
import Sorter from "sap/ui/model/Sorter";
import JSONModel from "sap/ui/model/json/JSONModel";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";




/**
 * @namespace com.spaiens.fancybook.controller
 */
export default class SmartBookTable extends Controller {
    smartFilterBar: SmartFilterBar

    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {
        this.smartFilterBar = this.byId("smartFilterBar") as SmartFilterBar;
    }
    public onSelectionChange(event: Event): void {
        //MessageBox.show(event.getSource().toString())
    }
    public toggleLiveMode(): void {
        var oButton: Button = this.byId("toggleLiveMode") as Button,
            bLiveMode = this.smartFilterBar?.getLiveMode();

        if (bLiveMode) {
            oButton.setText("Change to 'LiveMode'");
        } else {
            oButton.setText("Change to 'ManualMode'");
        }

        this.smartFilterBar.setLiveMode(!bLiveMode);
    }

}