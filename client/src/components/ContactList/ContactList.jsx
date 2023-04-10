import './contactlist.css';

export default function ContactList(props) {

    const {contacts, setSelectedChat} = props;

    const image_url = 'https://avatars.mds.yandex.net/i?id=5d8db0440aae4c3265492d1b3f8de64dddf64453-8342484-images-thumbs&n=13'
    return (
        <>
            <div className="contact-list">
                {contacts.length ?
                    <div className="contact-list-content">
                        {contacts.map((contact) => (
                            <div key={contact._id} className="contact-preview">
                                <img src={image_url} alt={contact.name} className="contact-image" />

                                <div className="contact-info" onClick={() =>
                                {
                                    setSelectedChat(contact.chat_id);
                                }}>
                                    <h3 className="contact-name">{contact.name}</h3>
                                </div>
                            </div>
                        ))}
                    </div>

                    :
                    <div className="no-user-contacts">
                        <p>No contacts yet.</p>
                    </div>
                }
            </div>
        </>
    );
}

