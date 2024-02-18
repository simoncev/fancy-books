import MessageBox from "sap/m/MessageBox";
import Controller from "sap/ui/core/mvc/Controller";
import View from "sap/ui/core/mvc/View";
import JSONModel from "sap/ui/model/json/JSONModel";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";



/**
 * @namespace com.spaiens.fancybook.controller
 */
export default class CreateBook extends Controller{
    onInit(): void {
        var oView: View  = this.getView() as View;
        let formData = {ui: {name:"", link:""}} //book name, link to book
        let guiModel = new JSONModel(formData) 
        oView.setModel(guiModel,"bookModel")
    }
    /**
     * Create new Book
     */
    onNewBook(): void{
        var oView: any  = this.getView() as View;
        var modelOData:ODataModel = oView.getModel("books");
        var name = oView.getModel("bookModel")?.getProperty("/ui/name");
        var link = oView.getModel("bookModel")?.getProperty("/ui/link")
        let newBook = {
            Name: name,
            Link: link,
            Edition: 1
        }
        modelOData.create('/ZBOOKS1Set', newBook,  {
            success: function(){
                MessageBox.alert("success")
            }, error: function(){
                MessageBox.alert("error")
            }
        });
       modelOData.refresh(true)
    }
}