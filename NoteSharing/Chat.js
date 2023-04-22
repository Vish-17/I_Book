const Chat = () => {
    const history = useHistory();
    const { username, room } = useParams(); //these are added when      user registers
    const [message, setMessage] = useState('');
    const { users, messages, sendMessage } = ClientSocket({
        username,
        room
    });
    const onSubmitHandler = event => {
        event.preventDefault();
        if (message) sendMessage(message);
        setMessage('');
    };
    const renderActiveUsers = () => {
        return users.map(user => {
            return (
                <p key={user.id} >
                    <i className="fa fa-circle"></i> {user.name}
                </p>
            );
        });
    };
    return (
        <div className="container-fluid d-flex">
            <div className="col-lg-6">
                <ul>
                    <h6>Messages</h6>
                    {messages.text}
                </ul>
                <form onSubmit={onSubmitHandler}>
                    <input
                        autoComplete="off"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        type="text"
                        name="message"
                    />
                    <button type="submit"> Send </button>
                </form>
            </div>
            <div className="col-lg-6 border-left ml-2">
                {renderActiveUsers()}
            </div>
        </div>
    )
};
export default Chat;
