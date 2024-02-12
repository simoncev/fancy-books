import SearchField from "sap/m/SearchField";
import Table from "sap/m/Table";
import TextField from "sap/ui/commons/TextField";
import Controller from "sap/ui/core/mvc/Controller";
import View from "sap/ui/core/mvc/View";
import Binding from "sap/ui/model/Binding";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import FilterType from "sap/ui/model/FilterType";
import JSONModel from "sap/ui/model/json/JSONModel";




/**
 * @namespace com.spaiens.fancybook.controller
 */
export default class Book extends Controller {

    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {
        var oView: View  = this.getView() as View;
        let data = {ui: {download:true}}
        let guiModel = new JSONModel(data)
        oView.setModel(guiModel,"bookModel")


    }
    public onSearch():void{
        var oView: View  = this.getView() as View;
        let inpField: SearchField  = oView.byId("searchField") as SearchField;
        let value:string = inpField?.getValue(); 
				
		let oFilter:Filter = new Filter("Name", FilterOperator.Contains, value);
        let table: Table = oView?.byId("bookList") as Table
        let bind = table.getBinding("items") as any

		bind.filter(oFilter, FilterType.Application);
    }
    public checkDownload(event: any):void {
        var bSelected = event.getParameter('selected');
        var oView: View  = this.getView() as View;
       
        oView.getModel()?.getProperty("ui/download").set(bSelected)
    }
}