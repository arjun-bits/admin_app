import React, { Component } from 'react';
import {Collapsible,CollapsibleItem,Row,Input} from 'react-materialize';
import './component.css'

class SearchFilter extends Component {
    render() {
        return (
            <Collapsible style = {{"marginLeft" : "25%", "width" :"72%"}}>
            <CollapsibleItem header='Search Filters' icon='search' style = {{"lineHeight" : "0px"}}>
                <Row>
                    <Input s={12} type='select' label="City Filter" defaultValue='2'>
                        <option value='1'>Option 1</option>
                        <option value='2'>Option 2</option>
                        <option value='3'>Option 3</option>
                    </Input>
                </Row>
            </CollapsibleItem>
          </Collapsible>
        )
    }
}

export default SearchFilter;