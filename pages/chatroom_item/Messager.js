import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import { Button, Icon, Input } from 'semantic-ui-react'

function Group(props){
    return <div style={{backgroundColor: "red", margin: 5}}>
        <Button animated='vertical' style={{height: "55%", width: "55%", }}>
            <Button.Content hidden>{props.name}</Button.Content>
            <Button.Content visible>
                <Icon name='shop' />
            </Button.Content>
        </Button>
    </div>
}

function Messager(props){

    // var group = props.group == null ? [] : props.group;
    var group = ["Name1", "Name2", "Name3"];

    return <>
        <Input type="text" icon="users" placeholder="Add..." onChange={() => {props.handleAddGroup()}}/>
        {group.map((name) => (
                <Group
                    name={name}
                />
        ))}
    </>
    
}

export default Messager;