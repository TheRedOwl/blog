import React from "react";
import { Button, Card, CardBody, CardText, CardTitle } from "reactstrap";
import { useState } from "react";
import { useEffect } from "react";
import { readPosts } from "../utility/crudUtility";
import { sanitizeHTML } from "../utility/utils";
import { Categories } from "../components/Categories";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SearchBox } from "../components/SearchBox";
import { Truncate } from "@re-dev/react-truncate";

export const Posts = () => {
    const [searchParams] = useSearchParams()
    const [posts, setPosts] = useState([]);
    const [selCateg, setSelCateg] = useState(searchParams.get("ctg") ? [searchParams.get("ctg")] : [])

    const navigate = useNavigate()

    console.log(selCateg);

    useEffect(() => {
        readPosts(setPosts, selCateg);
    }, [selCateg]);

    posts.length > 0 && console.log(posts);

    return (
        <div className="page">
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems:"center", width: "100%", gap:"50px" }}>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", width: "100%", paddingBottom: "20px", gap: "30px" }}>
                    <Categories selCateg={selCateg} setSelCateg={setSelCateg} />
                    {posts && <SearchBox items={posts.map(obj => ({ id: obj.id, name: obj.title }))} />}
                </div>
                <div style={{display:"flex", justifyContent:"center"}} >
                    <div style={{display:"flex", flexWrap:"wrap", justifyContent:"center"}}>
                    {posts?.length > 0 &&
                        posts.map(obj => (
                            <Card
                                key={obj.id}
                                style={{
                                    maxHeight: "530px",
                                    width: "350px",
                                    borderRadius:"15px",
                                    margin:"10px",
                                    border:"3px solid var(--color1)",
                                    backgroundColor:"var(--bgColor)",
                                    cursor:"pointer",
                                    userSelect:"none"
                                }}
                                onClick={() => navigate('/detail/' + obj.id)}
                            >
                                <div style={{display:"flex", justifyContent:"center", margin:"15px"}}>
                                    <img alt="Sample" src={obj.photo.url} className="img-fluid" style={{borderRadius:"15px", maxHeight:"300px", objectFit:"contain"}}/>
                                </div>
                                <CardBody style={{textAlign:"center", display:"flex", flexDirection:"column"}}>
                                    <CardTitle tag="h3" style={{display:"flex", alignItems:"flex-end", justifyContent:"center", height:"100%", color:"var(--color1)"}}>
                                        <Truncate>
                                            {obj.title}
                                        </Truncate> 
                                    </CardTitle>
                                    <CardText style={{color:"var(--greyColor)"}}>
                                        <Truncate>
                                            {sanitizeHTML(obj.story)}
                                        </Truncate> 
                                    </CardText>
                                    <div style={{display:"flex", alignItems:"flex-end", justifyContent:"center", }}>
                                        <h5 className="sign">{obj.category}</h5>
                                    </div>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                    
                </div>
            </div>
        </div>
    );
};
