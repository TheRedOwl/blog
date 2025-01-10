import React from "react";
import { useContext } from "react";
import { CategContext } from "../context/CategContext";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

export const Categories = ({selCateg,setSelCateg}) => {
    const {categories} = useContext(CategContext)

    const handleChange = (event) => {
        const {value,checked} = event.target
        setSelCateg(prev=> checked ? [...prev,value] : prev.filter(categ=>categ!=value))
    }
    
    return (
        <div>
            
                {categories && categories.map(obj=>
                    <FormGroup key={obj.name}>
                        <FormControlLabel control={<Checkbox onChange={handleChange} value={obj.name} checked={selCateg.includes(obj.name)}  />} label={obj.name} />
                    </FormGroup>
                )}
            
        </div>
    );
};
