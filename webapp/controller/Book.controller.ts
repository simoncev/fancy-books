import ListReport from "sap/fe/test/ListReport";
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
import EventProvider from "sap/ui/base/EventProvider";
import ComponentContainer from "sap/ui/core/ComponentContainer";
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
import CreateBook from "./CreateBook.controller";
import jQuery from "sap/ui/thirdparty/jquery";




/**
 * @namespace com.spaiens.fancybook.controller
 */
export default class Book extends Controller {
      
    updateDialog: Dialog | undefined

    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {
        var oView: View = this.getView() as View;
        let data = {
            ui: {
                download: true, order: 0,
                currentBookName: "", currentEdition: 1, currentAuthor: "", currentLink: "", bookCount: 0
            }
        } //download link, order undefined
        let guiModel = new JSONModel(data)
        oView.setModel(guiModel, "bookModel")
        
    }
    public onSearch(): void {
        var oView: any = this.getView() as View;
        let inpField: SearchField = oView.byId("searchField") as SearchField;
        let value: string = inpField?.getValue();

        let oFilter: Filter = new Filter("Name", FilterOperator.Contains, value);
        let table: Table = oView?.byId("idBooksTable") as Table
        let _items = table.getBinding("items") as any

        _items.filter(oFilter, FilterType.Application);
    }
    public onSort(): void {
        var oView: any = this.getView() as View;
        let aStates = [undefined, "asc", "desc"]
        var iOrder = oView.getModel("bookModel")?.getProperty("/ui/order")
        iOrder = (iOrder + 1) % aStates.length; // cycling order
        var sOrder = aStates[iOrder];
        oView.getModel("bookModel")?.setProperty("/ui/order", iOrder)

        let sorter: Sorter = new Sorter("Name", sOrder === "desc")

        let table: Table = oView?.byId("idBooksTable") as Table
        let _items = table.getBinding("items") as any
        _items?.sort(sOrder && sorter)


    }
    public onCreate(): void {
        var r = UIComponent.getRouterFor(this)
        r.navTo('RouteCreateBook')

    }
    public onCreateSmart(): void {
        var r = UIComponent.getRouterFor(this)
        r.navTo('RouteCreateBookSmart')

    }
    public onEdit(): void {
        if (this.updateDialog !== undefined ) {
            MessageBox.show("Dialog is already created ");
            return;
        }
        // get value for model
        var oView: View = this.getView() as View;
        var name = oView.getModel("bookModel")?.getProperty("/ui/currentBookName");
        var link = oView.getModel("bookModel")?.getProperty("/ui/currentLink");
        var author = oView.getModel("bookModel")?.getProperty("/ui/currentAuthor");
        var edition = oView.getModel("bookModel")?.getProperty("/ui/currentEdition");
        let idLink = oView.createId("idBookLinkInput") ;

        // button-like structure
        let buttonSettings: $ButtonSettings = {
            text: "OK",
            press: function (event: any) {
                var modelOData: ODataModel = oView.getModel("books") as ODataModel;
                var _textControlAuthor: any = oView.byId("idAuthorInput");
                let _author = _textControlAuthor?.getValue()
                let updateBook = {
                    Link: link,
                    Author: _author
                }
                let oDataQuery = encodeURI("/ZBOOKS1Set(Name='" + name + "',Edition=" + edition + ")")

                modelOData.update(oDataQuery, updateBook, {
                    success: function () {
                        MessageToast.show("success");
                    }, error: function () {
                        MessageToast.show("error");
                    }
                });
                modelOData.refresh(true)
            }
        }

        let buttonOK: Button = new Button(buttonSettings) // button object

        let dialogSettings: $DialogSettings = {
            title: `Update Dialog for : ${name}`,
            draggable: true,
            buttons: [buttonOK],
            afterClose:()=>{
                this.updateDialog?.destroy()
                this.updateDialog = undefined
            }
        }
        this.updateDialog = new Dialog(dialogSettings);
        let panel = new Panel();

        let comboSetting: $ComboBoxSettings = this.createComboSettings(author, oView)

        panel.addContent(new Label({ text: "Link" }))
        panel.addContent(new Input({ id: idLink, value: link }))
        panel.addContent(new Label({ text: "Author" }))
        panel.addContent(new ComboBox(comboSetting))
        panel.addContent(new Label({ text: "Edition" }))
        panel.addContent(new Input({ value: edition, editable: false }))

        this.updateDialog.addContent(panel);
        this.updateDialog.open();

    }
    private createComboSettings(author: any, oView: View): $ComboBoxSettings {
        let idAutor = oView.createId("idAuthorInput");
        let _items: Item[] = [
            new Item({ text: "Кнут Хамсун" }),
            new Item({ text: "Сент Егзипери" }),
            new Item({ text: "Иво Андриќ" }),
            new Item({ text: "Вуди Ален" }),
            new Item({ text: "Меша Селимовиќ" }),
            new Item({ text: "Чарлс Буковски" }),
            new Item({ text: "Хорхе Луис Борхес" }),
            new Item({ text: "Исак Башевис Сингер" }),
            new Item({ text: "Едуард Лимонов" }),
            new Item({ text: "Умберто Еко" }),
            new Item({ text: "Халил Џибран" }),
            new Item({ text: "Роберт Фулгам" }),
            new Item({ text: "Херман Хесе" }),
            new Item({ text: "Реј Бредбери" }),
            new Item({ text: "Отец Пасиј" }),
            new Item({ text: "Милан Кундера" }),
            new Item({ text: "Евгениј Замјатин" }),
            new Item({ text: "Људмила Улицка" }),
            new Item({ text: "Гете" }),
            new Item({ text: "Нина Берберова" }),
            new Item({ text: "Ромен Гари" }),
            new Item({ text: "Бенжамин Констан" }),
            new Item({ text: "Роберт Кувер" }),
            new Item({ text: "Иштван Еркељ" }),
            new Item({ text: "Арни Мишо" }),
            new Item({ text: "Ричард Бах" }),
            new Item({ text: "Денис Геџ" }),
            new Item({ text: "Петер Хандке" }),
            new Item({ text: "Габриел Гарсија Маркес" }),
            new Item({ text: "Алан Лајтман" }),
            new Item({ text: "Руми" }),
            new Item({ text: "Стефан Санџакоски" }),
            new Item({ text: "Филип Дик" }),
            new Item({ text: "Итало Калвино" }),
            new Item({ text: "Рејмонд Чендлер" }),
            new Item({ text: "Томас Бернхард" }),
            new Item({ text: "Георги Господинов" }),
            new Item({ text: "Џејмс Балард" }),
            new Item({ text: "Владимир Набоков" }),
            new Item({ text: "Даглас Адамс" }),
            new Item({ text: "Александар Сољжењицин" }),
            new Item({ text: "Горан Стефановски" }),
            new Item({ text: "Ведрана Рудан" }),
            new Item({ text: "Панаит Истрати" }),
            new Item({ text: "Владимир Арсениевиќ" }),
            new Item({ text: "Виктор Иго" }),
        ].sort((obj1: Item, obj2: Item) => {
            if (obj1.getText() > obj2.getText()) {
                return 1;
            }
            if (obj1.getText() < obj2.getText()) {
                return -1;
            }
            return 0;
        });

        return {
            id: idAutor,
            value: author,
            width: "100%",
            items: _items
        };
    }

    public onDelete(): void {
        var oView: any = this.getView() as View;
        var modelOData: ODataModel = oView.getModel("books");
        var name = oView.getModel("bookModel")?.getProperty("/ui/currentBookName");
        var currentEdition = oView.getModel("bookModel")?.getProperty("/ui/currentEdition");

        let oDataQuery = "/ZBOOKS1Set(Name='" + name + "',Edition=" + currentEdition + ")"

        let oDataQueryEncoded = encodeURI(oDataQuery);

        modelOData.remove(oDataQueryEncoded, {
            success: function () {
                MessageToast.show("success");
            }, error: function () {
                MessageBox.show(
                    "error"
                );
            }
        });
        modelOData.refresh(true)

    }
    public checkDownload(event: any): void {
        var bSelected = event.getParameter('selected');
        var oView: any = this.getView() as View;

        oView.getModel("bookModel")?.setProperty("/ui/download", bSelected)
    }
    public onSelectionChange(event: any) {
        var oView: any = this.getView() as View;
        var oSelectedItem = event.getParameter("listItem");
        var oModel = oSelectedItem.getBindingContext("books").getObject();
        let title = oModel.Name;
        let author = oModel.Author;
        let edition = oModel.Edition;
        let link = oModel.Link;
        oView.getModel("bookModel")?.setProperty("/ui/currentBookName", title)
        oView.getModel("bookModel")?.setProperty("/ui/currentAuthor", author)
        oView.getModel("bookModel")?.setProperty("/ui/currentLink", link)
        oView.getModel("bookModel")?.setProperty("/ui/currentEdition", edition)
    }
    public onImportBooks() {


        var oView: any = this.getView() as View;
        var modelOData: ODataModel = oView.getModel("books");
        //modelOData.setUseBatch(true);
        var localData: ODataModel = oView.getModel("bookslocal");
        let booksToImport = localData.getProperty('/books');

        if (booksToImport instanceof Array) {
            booksToImport.forEach(function (book: any, index: int) {
                console.log("Book", book)
                let newBook = {
                    Name: book.title,
                    Link: book.link,
                    Edition: 1,
                    Author: book.author
                }
                modelOData.create('/ZBOOKS1Set', newBook, {
                    success: function () {
                        MessageToast.show("success")
                    }, error: function () {
                        MessageToast.show("error")
                    }
                });

            });


        }

        //modelOData.submitChanges(); 
        modelOData.refresh(true)
    }
    public onSmartBooksTable() {
        var r = UIComponent.getRouterFor(this)
        r.navTo('RouteSmartBookTable')
    }
    public async onImportBooksSync() {


        var oView: any = this.getView() as View;
        var modelOData: ODataModel = oView.getModel("books");
        var localData: ODataModel = oView.getModel("bookslocal");
        let booksToImport = localData.getProperty('/books');

        if (booksToImport instanceof Array) {
            for (let book of booksToImport) {
                await this.saveBook(book, modelOData);
            }
        }

        modelOData.refresh(true)
    }

    public onGenericBooksTable(){
        var r = UIComponent.getRouterFor(this)
        r.navTo('RouteGenericBookTable')
  
       
      

    }

    private async saveBook(book: any, modelOData: ODataModel) {
        let newBook = {
            Name: book.title,
            Link: book.link,
            Edition: 2,
            Author: book.author
        };
        modelOData.create('/ZBOOKS1Set', newBook, {
            success: function () {
                MessageToast.show("success");
                return true;
            }, error: function () {
                MessageToast.show("error");
                return false;
            }
        });
    }
}