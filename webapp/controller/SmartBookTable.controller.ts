import Button from "sap/m/Button";
import ListItemBase from "sap/m/ListItemBase";
import MessageBox from "sap/m/MessageBox";
import Table from "sap/m/Table";
import Event from "sap/ui/base/Event";
import SmartFilterBar from "sap/ui/comp/smartfilterbar/SmartFilterBar";
import SmartTable from "sap/ui/comp/smarttable/SmartTable";
import Controller from "sap/ui/core/mvc/Controller";
import Context from "sap/ui/model/Context";





/**
 * @namespace com.spaiens.fancybook.controller
 */
export default class SmartBookTable extends Controller {
    smartFilterBar: SmartFilterBar
    smartTable: SmartTable

    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {
        this.smartFilterBar = this.byId("smartFilterBar") as SmartFilterBar;
        this.smartTable = this.byId("smartTable_ResponsiveTable") as SmartTable;
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
    public onSort(): void {
        var oSmartTable = this.smartTable;
        if (oSmartTable) {
            oSmartTable.openPersonalisationDialog("Sort");
        }
    }

    public onFilter():void {
        var oSmartTable = this.smartTable;
        if (oSmartTable) {
            oSmartTable.openPersonalisationDialog("Filter");
        }
    }
    public onDeleteSelectedRows():void{
        var oSmartTable: SmartTable = this.smartTable as SmartTable;
        var table: Table = oSmartTable.getTable() as Table 
        let items: Context[] =  table.getSelectedContexts()
      for (var i=items.length -1; i>=0; i--) {
            MessageBox.show(items[i].toString())  
       
      }
    
      
    }

}