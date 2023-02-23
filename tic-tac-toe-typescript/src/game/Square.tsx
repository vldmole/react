import React from "react";

export default
class Square extends React.Component<any, any>
{
    render()
    {
        return (
            <button className="square" onClick={ this.props.onClick }>
                {
                    this.props.value
                }
            </button>
        );
    }
}