import { Divider } from '@mui/material';
import React, { useState } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

export const CategDropdown = ({categories,selCateg,setSelCateg}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <div className="d-flex" style={{}}>
      <Dropdown isOpen={dropdownOpen} toggle={toggle} >
        <DropdownToggle style={{backgroundColor:"var(--greyColor)", color:"var(--bgColor)", fontWeight:"bolder", width:"200px"}} caret>
            {selCateg? selCateg : "Categories"}
        </DropdownToggle>
        <DropdownMenu style={{width:"200px", textAlign:"center", backgroundColor:"var(--bgColor)"}}>
            {categories ? categories.map(obj=>
                <DropdownItem key={obj.name} onClick={()=>setSelCateg(obj.name)} style={{backgroundColor:"var(--bgColor)", color:"var(--color1)", fontWeight:"bolder"}}>
                    {obj.name}
                    <Divider style={{backgroundColor:"var(--color1)", height:"3px"}}></Divider>
                </DropdownItem>
            )
            :
            <DropdownItem disabled>Nincs elérhető kategória</DropdownItem>

            }
          
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}