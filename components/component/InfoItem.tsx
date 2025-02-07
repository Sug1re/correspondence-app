import "./InfoItem.css";

const InfoItem = (props) => {
    return (
            <div className="info_item">
                { props.text }
            </div>
    )
}

export default InfoItem