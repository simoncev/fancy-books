import MessageBox from "sap/m/MessageBox";
import Controller from "sap/ui/core/mvc/Controller";
import View from "sap/ui/core/mvc/View";
import Context from "sap/ui/model/Context";
import JSONModel from "sap/ui/model/json/JSONModel";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";



/**
 * @namespace com.spaiens.fancybook.controller
 */
export default class CreateBookSmart extends Controller {
    bookName: string = ""
    bookEdition: int = 0
    onInit(): void {
        var oView: View = this.getView() as View;
        let formData = { ui: { name: "", link: "", edition: 1, author: "", price: "0", currency: "MKD" } } //book name, link to book, edition and author
        let guiModel = new JSONModel(formData)
        oView.setModel(guiModel, "bookModel")
        this._onVirtualNewBook()
    }
    _onVirtualNewBook(): void {
        var oView: any = this.getView() as View;
        var modelOData: ODataModel | undefined = this.getOwnerComponent()?.getModel() as ODataModel;
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

        }
        let _fun: Function = (oData: any) => {
            this.bookName = oData.Name
            this.bookEdition = oData.Edition
        }
        _fun.bind(this)

        var oContext: Context | undefined = modelOData.createEntry('/ZBOOKS1Set', {
            groupId: "idGroupSmart",
            properties: newBook,
            success: _fun
        }
        );

        var oSmartForm = this.getView()?.byId("idSmartForm");
        if (oContext !== undefined) {
            oSmartForm?.setBindingContext(oContext);
        }
    }
}

