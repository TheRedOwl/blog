import React from "react";
import { useContext } from "react";

import { useForm } from "react-hook-form";
import { UserContext } from "../context/UserContext";
import { useState } from "react";
import { delPhoto, uploadFile } from "../utility/uploadFile";
import { BarLoader } from "react-spinners";
import { Toastify } from "../components/Toastify";
import { useEffect } from "react";
import { extractUrlAndId } from "../utility/utils";
import { useConfirm } from "material-ui-confirm"
import { useNavigate } from "react-router-dom";

export const MyProfile = () => {
    const { user, updateUser, msg, deleteAccount, logoutUser } = useContext(UserContext);
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const confirm=useConfirm()
    const navigate=useNavigate()

    useEffect(()=>{
      !user && navigate("/")
    },[user])

    useEffect(() => {
        user?.photoURL && setAvatar(extractUrlAndId(user.photoURL).url);
    }, [user]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            displayName: user?.displayName || "",
        },
    });

    const onSubmit = async (data) => {
        console.log(data.displayName);
        setLoading(true);
        try {
            const file = data?.file ? data?.file[0] : null;
            const { url, id } = file ? await uploadFile(file) : null;
            updateUser(data.displayName, url + "/" + id);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () =>{
      try {
        await confirm({
          description:"Ez a művelet nem vonható vissza!",
          confirmationText:"Igen",
          cancellationText:"Mégsem",
          title:"Biztos ki szeretnéd törölni a fiókod?"
      })

      await deleteAccount()
      logoutUser()
      delPhoto(user.photoURL.split("/").pop())
      console.log(user);
      
      navigate("/")

      } catch (error) {
        console.log(error);
        
      }
    }

    return (
        <div className="page">
            <div style={{display:"flex", flexDirection:"column", justifyContent:"space-around"}}>
                <h1 style={{ fontWeight:"bolder", color:"var(--color1)"}}>Felhasználói fiók beállitás</h1>
                <form onSubmit={handleSubmit(onSubmit)} style={{display:"flex", alignItems:"center", flexDirection:"column"}}>
                    <div style={{fontSize:"20px", fontWeight:"bolder", color:"var(--color1)", display:"flex", justifyContent:"space-between !important", alignItems:"center"}}>
                        <label >Felhasználónév:</label>
                        <input
                            style={{borderRadius:"15px", padding:"10px", margin:"20px"}}
                            {...register("displayName")}
                            placeholder="felhasználónév"
                            type="text"
                        />
                    </div>
                    <div>
                        <label style={{fontSize:"20px", fontWeight:"bolder", color:"var(--color1)"}}>Avatar picture: </label>
                        <input
                            style={{fontSize:"20px", color:"var(--color1)"}}
                            {...register("file", {
                                validate: (value) => {
                                    if (!value[0]) return true;
                                    const acceptedFormats = ["jpg", "png"];
                                    console.log(value[0]);
                                    const fileExtension = value[0].name
                                        .split(".")
                                        .pop()
                                        .toLowerCase();
                                    if (
                                        !acceptedFormats.includes(fileExtension)
                                    )
                                        return "Invalid file format";
                                    if (value[0].size > 1 * 1000 * 1024)
                                        return "Az engedélyezett máximális file méret 1MB";
                                    return true;
                                },
                            })}
                            type="file"
                            onChange={(e) =>
                                setAvatar(
                                    URL.createObjectURL(e.target.files[0])
                                )
                            }
                        />
                        <p className="text-danger">{errors?.file?.message}</p>
                    </div>
                    <input type="submit" style={{maxWidth:"100px", borderRadius:"30px", padding:"20px", color:"var(--bgColor)", fontWeight:"bolder"}}/>
                </form>

                {loading && <BarLoader />}
                {msg && <Toastify {...msg} />}
                {avatar && <img className="img-fluid" src={avatar} />}
            </div>
            <div>
                <button className="btn m-5" style={{backgroundColor:"var(--bgColor)", color:"var(--color1)", position:"absolute", bottom:"2px",right:"2px", boxShadow:"black 2px 5px 15px 5px"}} onClick={handleDelete}>Fiók törlése</button>
            </div>
        </div>
    );
};
