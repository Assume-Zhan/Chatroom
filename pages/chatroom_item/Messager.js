import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import { Button, Icon, Input } from 'semantic-ui-react'

function Group(props){
    return <div style={{backgroundColor: "red", margin: 5}}>
        <Button 
            animated='vertical' 
            style={{width: "55%", }}
            onClick={() => {props.handleGroupClick(props.name)}}
        >
            <Button.Content hidden>{props.name}</Button.Content>
            <Button.Content visible>
                <Icon name='shop' />
            </Button.Content>
        </Button>
    </div>
}

function Messager(props){

    var idx = 0;
    const [group, setGroup] = React.useState([]);

    React.useEffect(() => {
        console.log("Use effect");
        setGroup(props.group)
    }, [props.group])

    return <>
        <Button animated='vertical' style={{width: "55%", margin: 5}}
            onClick={() => {props.addGroup()}}
        >
            <Button.Content hidden>Add new room</Button.Content>
            <Button.Content visible>
                <Icon name='shop' />
            </Button.Content>
        </Button>
        <Button animated='vertical' style={{width: "55%", margin: 5}}
            onClick={() => {props.addPerson()}}
        >
            <Button.Content hidden>Add new member</Button.Content>
            <Button.Content visible>
                <Icon name='shop' />
            </Button.Content>
        </Button>
        {
            group && group.map((group_) => {
                    return <Group
                        key={idx++}
                        name={group_.name}
                        handleGroupClick={props.handleGroupClick}
                    />
            })
            // messages && messages.map((message) => {
            //     return <Message_ key={idx++} message={message.data}/>
            // })
        }
    </>
    
}

export default Messager;