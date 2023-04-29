import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import { Button, Icon, Popup, Grid, Image, List } from 'semantic-ui-react'

function Group(props){
    return <List.Item 
            active={props.active} 
            onClick={() => {props.handleGroupClick(props.name)}}
            style={{paddingRight: "0"}}
        >
            <List.Content verticalAlign="middle">{props.name}</List.Content>
            <List.Icon verticalAlign="middle" name='group' size='large' style={{overflow: "hidden"}}/>
        </List.Item>
}

function Messager(props){

    var idx = 0;
    const [group, setGroup] = React.useState([]);

    React.useEffect(() => {
        console.log("Use effect");
        setGroup(props.group);
    }, [props.group])

    return <>
        <Grid verticalAlign="middle">
            <Grid.Column width={4} style={{textAlign: "center",}} >
                <Image avatar src={props.imgURL} size='big' verticalAlign='middle' />
            </Grid.Column>
            <Grid.Column width={7} style={{textAlign: "center",}} verticalAlign="middle">
                <List divided>
                    <List.Item style={{textAlign: "center", justifyContent: "center",}}>
                        <List.Content verticalAlign="middle" >
                            <List.Description style={{color: "#fff", overflow: "hidden"}}>{props.username}</List.Description>
                        </List.Content>
                    </List.Item>
                </List>
            </Grid.Column>
            <Grid.Column verticalAlign="middle" width={5} style={{textAlign: "left", paddingRight: "0", justifyContent: "left", }}>
                <Popup trigger={<Button icon="add" />} on='click'>
                    <Grid divided columns='equal'>
                    <Grid.Column>
                        <Button content='Add new room' onClick={() => {props.addGroup()}} fluid />
                    </Grid.Column>
                    <Grid.Column>
                        <Button content='Add new person' onClick={() => {props.addPerson()}} fluid />
                    </Grid.Column>
                    </Grid>
                </Popup>
            </Grid.Column>
        </Grid>
        <br/>
        <Grid columns={1}>
            <Grid.Column width={16}>
                <List divided selection inverted animated id="Lissss">
                {
                    group && group.map((group_) => {
                            return <Group
                                key={idx++}
                                name={group_.name}
                                handleGroupClick={props.handleGroupClick}
                                active={props.currentGroup == group_.name}
                            />
                    })
                    // messages && messages.map((message) => {
                    //     return <Message_ key={idx++} message={message.data}/>
                    // })
                }
                </List>
            </Grid.Column>
        </Grid>
    </>
    
}

export default Messager;