import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import { Button, Icon } from 'semantic-ui-react'

function Group(props){
    return <div>
        <Button animated='vertical'>
            <Button.Content hidden>{props.name}</Button.Content>
            <Button.Content visible>
                <Icon name='shop' />
            </Button.Content>
        </Button>
    </div>
}

function Messager(props){

    var group = props.group == null ? [] : props.group;

    return group.map((name) => (
        <Group
            name={name}
        />
    ))
    
}

export default Messager;