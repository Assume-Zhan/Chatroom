import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import { Button, Icon, Popup, Grid, Image, List } from 'semantic-ui-react'

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
        <Grid verticalAlign="center">
            <Grid.Column width={4} style={{textAlign: "center",}} >
                <Image avatar src={props.imgURL} size='big' verticalAlign='middle' />
            </Grid.Column>
            <Grid.Column width={8} style={{textAlign: "center",}} verticalAlign="middle">
                <List divided>
                    <List.Item style={{textAlign: "center", justifyContent: "center",}}>
                        <List.Content center verticalAlign="middle" >
                            <List.Description style={{color: "#fff"}}>{props.username}</List.Description>
                        </List.Content>
                    </List.Item>
                </List>
            </Grid.Column>
            <Grid.Column verticalAlign="middle" center width={4} style={{textAlign: "left", paddingRight: "0", justifyContent: "left", }}>
                <Popup trigger={<Button icon="add" />} on='click'>
                    <Grid divided columns='equal'>
                    <Grid.Column>
                        <Button color='white' content='Add new room' onClick={() => {props.addGroup()}} fluid />
                    </Grid.Column>
                    <Grid.Column>
                        <Button color='red' content='Add new person' onClick={() => {props.addPerson()}} fluid />
                    </Grid.Column>
                    </Grid>
                </Popup>
            </Grid.Column>
        </Grid>
        <br/>
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