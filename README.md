# React API Data Table
##### `Minimum package size`

[![npm][npm-image]][npm-url]

[npm-image]: https://i.imgur.com/2n8bJpY.png
[npm-url]: https://www.npmjs.com/package/custom-react-data-table

React API Data Table is a simple and custom table with the logical features. You can easily manage your data table by search operation, pagination, page size change, sorting column and render your custom column with your own style. We are made with a core style but you can change everything with your own styles even you can change the icon of the pagination, sorting, changeable position of the pagination/page size with the visible and hide feature, and text renders with different-2 languages. Overall it's flexible with any website, cms, mis etc.

![Sample data table](https://i.imgur.com/hpAOD5T.png)

#### `Click below link for react simple data table`
[custom-simple-data-table](https://www.npmjs.com/package/custom-simple-data-table)

### Installation

React data table requires [ReactJS] v16+ to run.

Install the dependencies 
```sh
 npm install --save custom-react-data-table
```

Just import these components...
```sh
import DatatableWithApi from "custom-react-data-table";
import 'custom-react-data-table/datatable.corestyle.css';
```
Either you can import a given style or you can make your own style for this data table.
## Usage & Demo code
#### Just copy paste this code to check all features  
```jsx
import React, { Component } from 'react';

import 'custom-react-data-table/datatable.corestyle.css';
import DatatableWithApi from "custom-react-data-table";

export default class App extends Component {
    state = {
        data: null,
        orgData: null,
        count: 0,
        limit: 10,
        offset: 0,
    }
    componentDidMount() {
        this.fetchMyAPI();
    }

    fetchMyAPI = async (limit = this.state.limit, offset = this.state.offset) => {
        let urlobj = { url: `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}` }
        await fetch(urlobj.url)
            .then((res) => res.json())
            .then((data) => {
                if (data["count"]) {
                    this.setState({ data: data.results, orgData: data.results, count: data.count });
                }
            });
    }

    pageChangeCallback = (page, limit) => {
        let offset = limit * (page - 1);
        this.setState({ limit, offset });
        this.fetchMyAPI(limit, offset);
    }
    filterTableCallback = (searchText) => {
        let sortData = this.state.orgData.filter(el => {
            let searchString = el && el.name ? el.name : "";
            searchString += el && el.url ? "," + el.url : "";
            if (searchString.indexOf(searchText) !== -1) {
                return true;
            }
            return false;
        });
        this.setState({ data: sortData });
    }
    pageSizeCallback = (value) => {
        let limit = value;
        this.setState({ limit });
        this.fetchMyAPI(limit, 0);
    }
    fieldSortingCallback = (field, order) => {
        let SortData = this.state.orgData;
        if (order === "up") {
            SortData.sort((a, b) => {
                if (a[field] > b[field]) {
                    return 1;
                }
                return -1;
            });
        } else {
            SortData.sort((a, b) => {
                if (a[field] > b[field]) {
                    return -1;
                }
                return 1;
            });
        }
        this.setState({ data: SortData });
    }

    render() {

        let tableHeadArray = [
            { title: "S.no.", serial: true, thClass: "firstTH" },
            { title: "Name", field: "name", sorting: true, thClass: "secondTH" },
            {
                title: "Url",
                field: "url",
                sorting: true,
                tdStyle: (obj) => {
                    let style = {};
                    if (obj.url.indexOf("1") !== -1) {
                        style = { background: "#ffe047" };
                    }
                    return style;
                },
                return: (obj) => {
                    return <a href={`${obj.url}`} target="_blank" rel="noopener noreferrer">{obj.url}</a>;
                },
            },
            {
                title: "Action",
                return: (obj) => {
                    return (
                        <>
                            <button
                                onClick={() => console.log("edit obj =", obj)}
                            >
                                Edit
                        </button>
                            <button onClick={() => console.log("Delete obj ", obj)}>
                                Delete
                        </button>
                        </>
                    );
                },
            },
        ];

        return (
            <div>
                {<DatatableWithApi
                    header={tableHeadArray}
                    dataArr={this.state.data}
                    pageChangeCallback={this.pageChangeCallback}
                    fieldSortingCallback={this.fieldSortingCallback}
                    filterTableCallback={this.filterTableCallback}
                    pageSizeCallback={this.pageSizeCallback}
                    showPageSize={{
                        title: "पृष्ठ संख्या: ",
                        defaultValue: this.state.limit,
                        pageSizeArr: [10, 20, 50, 100, 250],
                        top: true, bottom: true
                    }}
                    showPagination={{
                        top: true, bottom: true,
                        doubleLeftImg: "", leftImg: "",
                        rightImg: "", doubleRightImg: "",
                        dleft_tooltip: "first page",
                        left_tooltip: "prev. page",
                        right_tooltip: "next page",
                        dright_tooltip: "last page"
                    }}
                    showTotalRecord={{ top: true, bottom: true, value: this.state.count }}
                    tableClass={"table"}
                    tableHeadClass={"table head"}
                    tableHeadRowClass={"table rowhead"}
                    tableBodyClass={"table body"}
                    norecordsfound={{ align: "center", title: "no records"}}
                />}
            </div>
        );
    }
}
```

### Props

| Props | Object Keys |Type | Details | e.g.| 
| ------ | ------ | ------ | ------ | ------ |
| dataArr (mandatory) | | Array | An array of the table data | |
| header (mandatory) | | Array | An array of the table head object | |
| | title (mandatory) | String | Custom table column title | "S.No." |
| | serial (optional) | Boolean | If true show the serial number of the record | |
| | field (mandatory) | String | Data array object keys | if data array is [{name:"abc"}{name:"def"}] then field is 'name' |
| | sorting (optional) | Boolean | If true show the sorting option to related field ||
| | thClass (optional) | String | for th tag class | |
| | tdStyle (optional) | Callback Function | This function is return special case style and record object is an attribute of this function | tdStyle: (obj) => { let style = {}; if (obj.url.indexOf("1") !== -1) { style = { background: "#ffe047" }; } return style; } |
| | return (optional) | Callback Function | This function is return custom design data for a cell and record object is an attribute of this function | e.g.1: return: (obj) => {return <a href={`${obj.url}`}>{obj.url}</a>; } e.g.2: return: (obj) => { return ( <> <button onClick={() => console.log("edit obj =", obj)}>Edit</button></button></>);} |
| pageChangeCallback (mandatory) | | Function | Page change callback | |
| fieldSortingCallback (optional) | | Function | Sorting column callback | |
| filterTableCallback (optional) | | Function | On search filter table callback | |
| pageSizeCallback | | Function | On page size change callback | |
| showPageSize (optional) | | Object | Page size data object | |
| | title (optional) | String | Custom page size title | |
| | defaultValue (optional) | Integer | Page size default value | |
| | pageSizeArr (optional) | Integer Array | Page size array for select page size | [10,20,50] |
| | top (optional) | Boolean | page size on top if true |
| | bottom (optional) | Boolean | page size on bottom if true |
| showPagination (optional) | | Object | Pagination data object |
| | top (optional) | Boolean | Pagination on top if true |
| | bottom (optional) | Boolean | Pagination on bottom if true |
| | dleft_tooltip (optional) | String | Double left button tooltip title | "first page" |
| | left_tooltip (optional) | String | Left button tooltip title | "previous page" |
| | right_tooltip (optional) | String | Right button tooltip title | "next page" |
| | dright_tooltip (optional) | String | Double right button tooltip title | "last page" |
| | doubleLeftImg (optional) | String | First page button image/icon url | |
| | leftImg (optional) | String | Previous page image/icon url | |
| | rightImg (optional) | String | Right image/icon url | |
| | doubleRightImg (optional) | String | Right image/icon url | |
| showTotalRecord (mandatory) | | Object | Total record of the table object | |
| | top (optional) | Boolean | Total Records show on top if true |
| | bottom (optional) | Boolean | Total Records show on bottom if true |
| | value (mandatory) | String/Integer | Total Records value | |
| norecordsfound (optional) | | Object | show the no records title and align the text| { align: "center", title: "no records"} |
| | title (mandatory) | String | Total Records value | |
| | align (optional) | String | align of the text - center, left and right |  |
| tableClass (optional) | | String | Table tag class name |  |
| tableHeadClass (optional) | | String | Table head tag class name |  |
| tableHeadRowClass (optional) | | String | Table head row class name |  |
| tableBodyClass (optional) | | String | Table body class name |  |

License
----

MIT