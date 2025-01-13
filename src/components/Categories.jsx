import React from "react";
import { useContext } from "react";
import { CategContext } from "../context/CategContext";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

export const Categories = ({ selCateg, setSelCateg }) => {
    const { categories } = useContext(CategContext)

    const handleChange = (event) => {
        const { value, checked } = event.target
        setSelCateg(prev => checked ? [...prev, value] : prev.filter(categ => categ != value))
        
    }

    return (
        <div style={{display:"flex", justifyContent:"center", margin:"10px", flexWrap:"wrap"}}>
            {categories && categories.map(obj =>
                <FormGroup key={obj.name} style={{margin:"3px", border:"3px solid var(--color1)", borderRadius:"50px", padding:"5px", color:"var(--color1)", backgroundColor:"var(--bgColor)" }}>
                    <FormControlLabel control={<Checkbox onChange={handleChange} value={obj.name} checked={selCateg.includes(obj.name)} style={{color:"var(--color1)"}} />} label={obj.name} />
                </FormGroup>
            )}
        </div>
    );
};
