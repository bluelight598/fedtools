import React, { Component } from 'react';

class TopBar extends Component {
    
    render() {
        return (
        <div className="list-group">
            {this.props.content.items.map((text, index) =>
                <div key={text+index}>{text}</div>
            )}
        </div>
        
        )
    }
    
}


export default TopBar;