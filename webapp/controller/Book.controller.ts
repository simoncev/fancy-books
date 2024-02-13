import SearchField from "sap/m/SearchField";
import Table from "sap/m/Table";
import Controller from "sap/ui/core/mvc/Controller";
import View from "sap/ui/core/mvc/View";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import FilterType from "sap/ui/model/FilterType";
import Sorter from "sap/ui/model/Sorter";
import JSONModel from "sap/ui/model/json/JSONModel";




/**
 * @namespace com.spaiens.fancybook.controller
 */
export default class Book extends Controller {

    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {
        var oView: View  = this.getView() as View;
        let data = {ui: {download:true, order:0}} //download link, order undefined
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
    public onSort():void{
        var oView: any  = this.getView() as View;
        let aStates = [undefined, "asc", "desc"]
        var iOrder = oView.getModel("bookModel")?.getProperty("/ui/order")
        iOrder = (iOrder + 1) % aStates.length; // cycling order
        var sOrder = aStates[iOrder];
        oView.getModel("bookModel")?.setProperty("/ui/order",iOrder)

        let sorter:Sorter = new Sorter("Name",sOrder === "desc")

        let table: Table = oView?.byId("bookList") as Table
        let bind = table.getBinding("items") as any 
        bind?.sort(sOrder && sorter)

    }
    public checkDownload(event: any):void {
        var bSelected = event.getParameter('selected');
        var oView: any  = this.getView() as View;
       
        oView.getModel("bookModel")?.setProperty("/ui/download",bSelected)
    }
}