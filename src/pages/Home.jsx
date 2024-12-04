import React from "react";
import {
    Button,
    Card,
    CardBody,
    CardSubtitle,
    CardText,
    CardTitle,
} from "reactstrap";

export const Home = () => {
    return (
        <div style={{ display: "flex", gap:"5px" }}>
            <div style={{display:"flex", justifyContent:"space-between",maxHeight:"600px"}}>
                <Card
                    style={{
                        width: "200px",
                    }}
                >
                    <img alt="Sample" src="https://picsum.photos/300/200" />
                    <CardBody>
                        <CardTitle tag="h5">Card title</CardTitle>
                        <CardSubtitle className="mb-2 text-muted" tag="h6">
                            Card subtitle
                        </CardSubtitle>
                        <CardText>
                            Some quick example text to build on the card title
                            and make up the bulk of the card‘s content.
                        </CardText>
                        <Button>Button</Button>
                    </CardBody>
                </Card>
                <Card
                    style={{
                        width: "200px",
                    }}
                >
                    <img alt="Sample" src="https://picsum.photos/300/200" />
                    <CardBody>
                        <CardTitle tag="h5">Card title</CardTitle>
                        <CardSubtitle className="mb-2 text-muted" tag="h6">
                            Card subtitle
                        </CardSubtitle>
                        <CardText>
                            Some quick example text to build on the card title
                            and make up the bulk of the card‘s content.
                        </CardText>
                        <Button>Button</Button>
                    </CardBody>
                </Card>
                <Card
                    style={{
                        width: "200px",
                    }}
                >
                    <img alt="Sample" src="https://picsum.photos/300/200" />
                    <CardBody>
                        <CardTitle tag="h5">Card title</CardTitle>
                        <CardSubtitle className="mb-2 text-muted" tag="h6">
                            Card subtitle
                        </CardSubtitle>
                        <CardText>
                            Some quick example text to build on the card title
                            and make up the bulk of the card‘s content.
                        </CardText>
                        <Button>Button</Button>
                    </CardBody>
                </Card>
                <Card
                    style={{
                        width: "200px",
                    }}
                >
                    <img alt="Sample" src="https://picsum.photos/300/200" />
                    <CardBody>
                        <CardTitle tag="h5">Card title</CardTitle>
                        <CardSubtitle className="mb-2 text-muted" tag="h6">
                            Card subtitle
                        </CardSubtitle>
                        <CardText>
                            Some quick example text to build on the card title
                            and make up the bulk of the card‘s content.
                        </CardText>
                        <Button>Button</Button>
                    </CardBody>
                </Card>
            </div>
            <div style={{height:"100vh"}}>
                <Card
                    style={{
                        width: "300px",
                        height:"100%"
                    }}
                >
                    <img alt="Sample" src="https://picsum.photos/300/200" />
                    <CardBody>
                        <CardTitle tag="h5">Card title</CardTitle>
                        <CardSubtitle className="mb-2 text-muted" tag="h6">
                            Card subtitle
                        </CardSubtitle>
                        <CardText>
                            Some quick example text to build on the card title
                            and make up the bulk of the card‘s content.
                        </CardText>
                        <Button>Button</Button>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};
