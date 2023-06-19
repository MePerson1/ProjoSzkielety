const Info = (props) => {
    const user = props.info
   return(<>
   <table>
    <tbody>
        <tr>
            <td>Imie i nazwisko:</td>
            <td>{user.firstName} {user.lastName}</td>
        </tr>
        <tr>
            <td>Email:</td>
            <td>{user.email}</td>
        </tr>
    </tbody>
   </table>
   </>)
}
export default Info