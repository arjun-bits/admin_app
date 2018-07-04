import React , {Component} from 'react';

class Table extends Component{
    constructor(props){
        super(props);
        if (props){
            this.state ={
                data: this.props.data
            }
        }    
    }
     TableHeaders = () => {
        // var pg = tp;
        
        const  data   =this.props.data;
        console.log(data);
        if (data.length === 0) {
            return;
        }
        else {
            var cols = Object.keys(data[0]);  // [{key, label}]
            // console.log(pg, pg.props);
            // generate our header (th) cell components
            return cols.map(function(colData) {
                return <th key={colData}> {colData} </th>;
            });
        }
    }

     TableRows = () => {
        const data   =this.props.data;
        if (data.length === 0) {
            return;
        }
        else {
            var cols = Object.keys(data[0]);  // [{key, label}]
            return data.map(function (item) {
                // handle the column data within each row
                var cells = cols.map(function (colData) {

                    // colData.key might be "firstName"
                    return <td> {item[colData]} </td>;
                });
                return <tr key={item.id}> {cells} </tr>;
            });
        }
    }
    
    
    render(){
        return(
            <table style ={{"marginLeft" : "30%", "width" : "70%","marginTop": "2%"}}>
                {console.log(this.state.data)}
                {this.TableHeaders()}
                {this.TableRows()}
            </table>
        );
    }
}

export default Table;