import { useState } from "react";

function useNoteHook() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    return [title, setTitle, content, setContent, category, setCategory]
}
function useRegisterState() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [pic, setPic] = useState('https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [picMessage, setPicMessage] = useState(null);
    return [email, setEmail,
        name, setName,
        pic, setPic,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        message, setMessage,
        picMessage, setPicMessage]
}

export { useNoteHook, useRegisterState }