import React from 'react';

const Avatars = ({ content, onDelete }) => (
    <div>
        <p style={{textAlign : "center", marginTop:'0', padding:'0'}}>{content.name}</p>
        <img style={{ width: '15vw', height: "15vw", margin:'auto', display : "block" }} src={content.avatar} onClick={() => onDelete(content.id)} />
    </div>

)
export default Avatars