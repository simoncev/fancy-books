import MessageBox from "sap/m/MessageBox";
import SmartField from "sap/ui/comp/smartfield/SmartField";
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
        let formData = {ui: {name:"", link:"", edition:1, author:"", price:"0", currency:"MKD"}} //book name, link to book, edition and author
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
        var edition = oView.getModel("bookModel")?.getProperty("/ui/edition")
        var author = oView.getModel("bookModel")?.getProperty("/ui/author")
        var price = oView.getModel("bookModel")?.getProperty("/ui/price")
        var currency = oView.getModel("bookModel")?.getProperty("/ui/currency")
        let newBook = {
            Name: name,
            Link: link,
            Edition: edition,
            Author: author,
            Book_price: price,
            Book_currency: currency

        };
      
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