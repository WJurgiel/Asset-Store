import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Button, Fieldset, FileButton, Group, Text, TextInput, Radio, Textarea, NumberInput} from "@mantine/core";
import {IconPhoto} from "@tabler/icons-react";
import styles from "./AddAssetPage.module.css"

export const AddAssetPage = () => {
    const [filePhoto, setfilePhoto] = useState<File | null>(null);
    const [userID, setUserID] = useState<string | null>(null);
    const [assetName, setAssetName] = useState<string | null>(null);
    const [assetDescription, setAssetDescription] = useState<string | null>(null);
    const [assetType, setAssetType] = useState<string | null>(null);
    const [assetPrice, setAssetPrice] = useState<string | number>("");
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:3000/api/user/me', {withCredentials: true})
            .then(response => {
                console.log(response)
                const userID = response.data.ID;
                setUserID(userID.toString());
            })
            .catch(error => {
                console.log(error);
                navigate("/login")
            });
    }, [navigate])

    const handleUpload = async () => {
        if (!assetName || !assetDescription || !assetType || !assetPrice) {
            alert("Please fill the form");
        }
        if (!filePhoto || !userID) {
            alert("Please upload file");
        }
        const formData = new FormData();
        formData.append('file', filePhoto as File);
        formData.append('userID', userID as string);
        formData.append('name', assetName as string);
        formData.append('assetDescription', assetDescription as string);
        formData.append('assetType', assetType as string);
        formData.append('assetPrice', assetPrice as string);
        try {
            const response = await axios.post("http://localhost:3000/api/assets/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    withCredentials: true,
                });
            console.log("upload successful: ", response.data);
            navigate("/home");
        } catch (error) {
            console.error("Upload failed:", error);
        }
    }

    return (
        <div className={styles.bg}>
            <h1>Create asset</h1>
            <Fieldset className={styles.customFieldset}>
                <TextInput label="Asset name" placeholder="asset name" withAsterisk
                           onChange={(e) => setAssetName(e.target.value)}/>
                <Textarea
                    placeholder="description"
                    label="Asset description"
                    autosize
                    minRows={2}
                    onChange={(e) => setAssetDescription(e.target.value)}
                    withAsterisk
                />
                <Radio.Group
                    name="favoriteFramework"
                    label="Asset type"
                    withAsterisk
                >
                    <Group mt="xs">
                        <Radio value="2d" label="2D" onChange={() => setAssetType("twoD")}/>
                        <Radio value="3d" label="3D" onChange={() => setAssetType("threeD")}/>
                        <Radio value="sfx" label="SFX" onChange={() => setAssetType("SFX")}/>
                    </Group>
                </Radio.Group>
                <NumberInput
                    label="Name your price"
                    placeholder="Price"
                    prefix="€"
                    defaultValue={0}
                    mb="md"
                    value={assetPrice}
                    min={0}
                    max={100}
                    withAsterisk
                    onChange={setAssetPrice}
                />
                <Group justify="left">
                    <FileButton className={styles.fileButton} onChange={setfilePhoto} accept="image/png">
                        {(props) => <Button {...props} rightSection={<IconPhoto size={14}/>}>Upload image</Button>}
                    </FileButton>
                    {/*<FileButton onChange={setFile} accept="image/png,image/jpeg">*/}
                    {/*    {(props) => <Button {...props} rightSection={<IconCube size={14}/>}>Upload asset file</Button>}*/}
                    {/*</FileButton>*/}

                </Group>
                {filePhoto && (
                    <Text size="sm" ta="center" mt="sm">
                        Picked file: {filePhoto.name}
                    </Text>
                )}
                <Button className={styles.uploadButton} fullWidth onClick={handleUpload}>Add asset!</Button>
            </Fieldset>

        </div>
    )
}