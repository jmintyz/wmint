import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faFingerprint } from "@fortawesome/free-solid-svg-icons";

export const Logo = () => {
    return ( <div className="text-5xl text-center py-4 font-heading">
        j Mint    <FontAwesomeIcon icon={faFingerprint} className="text-3xl text-argent-400"/>
    </div>
    );
};