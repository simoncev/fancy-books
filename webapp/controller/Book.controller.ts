import MessageBox from "sap/m/MessageBox";
import SearchField from "sap/m/SearchField";
import Table from "sap/m/Table";
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
export default class Book extends Controller {

    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {
        var oView: View  = this.getView() as View;
        let data = {ui: {download:true, order:0, currentBookName:""}} //download link, order undefined
        let guiModel = new JSONModel(data) 
        oView.setModel(guiModel,"bookModel")


    }
    public onSearch():void{
        var oView: View  = this.getView() as View;
        let inpField: SearchField  = oView.byId("searchField") as SearchField;
        let value:string = inpField?.getValue(); 
				
		let oFilter:Filter = new Filter("Name", FilterOperator.Contains, value);
        let table: Table = oView?.byId("idBooksTable") as Table
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

        let table: Table = oView?.byId("idBooksTable") as Table
        let bind = table.getBinding("items") as any 
        bind?.sort(sOrder && sorter)

    }
    public onCreate():void {
        var r = UIComponent.getRouterFor(this)
		r.navTo('RouteCreateBook')
        
    }
    public onEdit():void {

    }
    public onDelete():void {
        var oView: any  = this.getView() as View;
        var modelOData:ODataModel = oView.getModel("books");
        var name = oView.getModel("bookModel")?.getProperty("/ui/currentBookName");
        let oDataQuery = "/ZBOOKS_DETAILSSet(" +" Mandt=010, "+ "Name='"+name+"')";
        //let oDataQuery = "/ZBOOKS_DETAILSSet("+ "Name='"+name+"')";
        alert (oDataQuery)
        modelOData.remove(oDataQuery, {
            success: function(){
                MessageBox.alert("success")
            }, error: function(){
                MessageBox.alert("error")
            }
        });
       modelOData.refresh(true)
        
    }
    public checkDownload(event: any):void {
        var bSelected = event.getParameter('selected');
        var oView: any  = this.getView() as View;
       
        oView.getModel("bookModel")?.setProperty("/ui/download",bSelected)
    }
    public onSelectionChange(event:any) {
        var oView: any  = this.getView() as View;
        var oSelectedItem = event.getParameter("listItem");
        var oModel = oSelectedItem.getBindingContext("books").getObject();
        let title = oModel.Name;
        oView.getModel("bookModel")?.setProperty("/ui/currentBookName",title)
    }
}