import React, { Component } from 'react';

class ProgrammeTable extends Component {
    constructor(props){
        super(props)

        this.state = {
            programmes: []
        }
    }

    componentDidMount(){
        const url= "https://rest-api.elisaviihde.fi/rest/epg/schedule/live";

        fetch(url, {
            method:"GET"
        }).then(response)
    }


    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default ProgrammeTable;