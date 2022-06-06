import { Button, TextInput } from '@mantine/core';
import { invoke } from '@tauri-apps/api/tauri';
import { FormEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CreateIssue = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const { projectId } = useParams();

    async function handleSubmit(e: FormEvent){
        e.preventDefault();
        try{
            await invoke('create_issue', {
                title,
                description,
                projectId
            });
            navigate(`/project/${projectId}`, { replace: true });
        }catch(error){
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextInput
                label="Title:"
                onChange={e => {
                    setTitle(e.target.value);
                }}
            />
            <TextInput
                label="Description:"
                onChange={e => {
                    setDescription(e.target.value);
                }}
            />
            <Button type="submit">Create</Button>
        </form>
    );
};

export default CreateIssue;