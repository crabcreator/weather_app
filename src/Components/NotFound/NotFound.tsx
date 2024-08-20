import { Link } from "react-router-dom";
import './NotFound.css'
import LinkArrow from "../LinkArrow/LinkArrow";

export default function NotFound() {

    return (
        <div className="not-found">
            <div className="not-found-container">
                <div className="top">
                    <img src="../img/cloud.png" className="cloud" alt="sad-cloud" />
                    <span className="text">Упс... Здається, такої сторінки не існує</span>
                </div>
                <div className="bottom">
                    <span className="number">404</span>
                    <Link to='/' className="return">Повернутись на головну <LinkArrow size='10px' borderWidth='2.5px' /></Link>
                </div>
            </div>
        </div>
    )
}