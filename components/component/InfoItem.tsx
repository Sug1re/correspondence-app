import React from "react";
import "./InfoItem.css";

interface InfoItemProps {
  text: string;
}

const InfoItem: React.FC<InfoItemProps> = (props) => {
  return <div className="info_item">{props.text}</div>;
};

export default InfoItem;
