import MessageBox from "sap/m/MessageBox";
import Controller from "sap/ui/core/mvc/Controller";
import View from "sap/ui/core/mvc/View";
import Context from "sap/ui/model/Context";
import JSONModel from "sap/ui/model/json/JSONModel";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import Core from "sap/ui/core/Core" //all core functions are deprecated
import SmartField from "sap/ui/comp/smartfield/SmartField";
import Binding from "sap/ui/model/Binding";



/**
 * @namespace com.spaiens.fancybook.controller
 */
export default class CreateBookSmart extends Controller {
    bookName: string = ""
    bookEdition: int = 0
    oContext: Context | undefined
    modelOData: ODataModel | undefined
    onInit(): void {
        var oView: View = this.getView() as View;
        let formData = { ui: { name: "", link: "", edition: 1, author: "", price: "0", currency: "MKD" } } //book name, link to book, edition and author
        let guiModel = new JSONModel(formData)
        oView.setModel(guiModel, "bookModel")
        this._onVirtualNewBook()
        
    }

    _onVirtualNewBook(): void {
        var oView: any = this.getView() as View;
        this.modelOData= this.getOwnerComponent()?.getModel() as ODataModel;
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
        _fun.bind(this);

       
        // the value is valid and pending model changes can be submitted to the back-end system
        this.oContext= this.modelOData?.createEntry('/ZBOOKS1Set', {
            properties: newBook,
            success: _fun
        }
        );

        var oSmartForm = this.getView()?.byId("idSmartForm");
        if (this.oContext !== undefined) {
            oSmartForm?.setBindingContext(this.oContext);
        }
        

       
    }
    public onCreateBook() {
        
        let _validateFun = (sPropertyName:any)=>{
            let f = (this.byId(sPropertyName) as SmartField).checkValuesValidity();
            f.then(() => {
                //MessageBox.show("Value is valid:"+sPropertyName)
            }).catch(function() {
                MessageBox.show("Value is invalid: "+sPropertyName)
                
            });
        };
        _validateFun.bind(this);

        ["idName", "idEdition", "idLink"].forEach((sPropertyName) => _validateFun(sPropertyName));

        this.modelOData?.submitChanges({success:() =>{
            MessageBox.show("Submit OK")
            this.modelOData?.refresh(true)
        }, error: () =>{
            MessageBox.show("Submit FAILURE")
        }})

        
       

    }
    public onBookNameError() {
        MessageBox.show("Error in Book name!!!")
    }
}

