import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity
} from "react-native";
class Request extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data || [],
            //store unwatch lists
            add: []
        };
    }
    acceptRequest(pet) {
        fetch("https://thousanday.com/panels/acceptRequest", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "petId": pet,
                "userToken": this.props.userToken,
                "userId": this.props.userId
            })
        })
        .then((response) => response.json())
        .then((result) => {
            switch (result) {
                case 0:
                    alert("Can't get data, please try later");
                    break;
                case 1:
                    this.state.add.push(pet)
                    this.setState({add: this.state.add});
                    this.props.emptyUser();
                    break;
                case 2:
                    alert("Please login again");
                    break;
                case 3:
                    alert("The pet already got a relative");
                    break;
            }
        });
    }
    deleteRequest(pet, index) {
        fetch("https://thousanday.com/panels/deleteRequest", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "petId": pet,
                "userToken": this.props.userToken,
                "userId": this.props.userId
            })
        })
        .then((response) => response.json())
        .then((result) => {
            switch (result) {
                case 0:
                    alert("Can't get data, please try later");
                    break;
                case 1:
                    this.state.data.splice(index, 1);
                    this.setState({data: this.state.data});
                    break;
                case 2:
                    alert("Please login again");
                    break;
            }
        });
    }
    render() {
        let requests = this.state.data.map((request, index) =>
            <View key={"request" + index} style={(this.state.add.indexOf(request.pet_id) === -1)?styles.rootContainer:styles.rootHolder}>
                <View style={styles.rootRow}>
                    <Image
                        style={styles.rowImage}
                        source={{uri: "https://thousanday.com/img/user/" + request.sender_id + ".jpg"}}
                    />
                    <Text style ={styles.rowWant}>
                        wants to add you as
                    </Text>
                    <Image
                        style={styles.rowPet}
                        source={{uri: "https://thousanday.com/img/pet/" + request.pet_id + "/cover/0.png"}}
                    />
                    <Text style ={styles.rowWant}>
                        {"'s relative"}
                    </Text>
                </View>
                {
                    (this.state.add.indexOf(request.pet_id) === -1)?(
                        <View style={styles.rootAction}>
                            <TouchableOpacity onPress={this.acceptRequest.bind(this, request.pet_id)}>
                                <Text style={styles.actionAccept}>
                                    Accept
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.deleteRequest.bind(this, request.pet_id, index)}>
                                <Text style={styles.actionDelete}>
                                    Delete
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ):(
                        <View style={styles.rootAction}>
                            <Text style={styles.actionAccept}>
                                Accepted
                            </Text>
                        </View>
                    )
                }
            </View>
        )
        return (
            <ScrollView contentContainerStyle={styles.root}>
                {
                    (this.state.data.length === 0)? (
                        <Text>
                            You have no message now.
                        </Text>
                    ):null
                }
                {requests}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        marginHorizontal: 20,
        marginTop: 20
    },
    rootContainer: {
        backgroundColor: "#f7d7b4",
        marginBottom: 30,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5
    },
    rootHolder: {
        backgroundColor: "#abaeb2",
        marginBottom: 30,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5
    },
    rootRow: {
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center"
    },
    rowImage: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    rowWant: {
        marginHorizontal: 5,
        fontSize: 14
    },
    rowPet: {
        width: 50,
        height: 50,
        borderRadius: 5
    },
    rootAction: {
        flexDirection: "row",
        borderTopWidth: 1,
        marginTop: 20
    },
    actionAccept: {
        fontSize: 12,
        backgroundColor: "#052456",
        color: "white",
        marginTop: 10,
        borderRadius: 3,
        paddingHorizontal: 6,
        paddingVertical: 3,
        marginRight: 50
    },
    actionDelete: {
        fontSize: 12,
        backgroundColor: "#9b0f0f",
        color: "white",
        marginTop: 10,
        borderRadius: 3,
        paddingHorizontal: 6,
        paddingVertical: 3
    }
});

export default Request;
