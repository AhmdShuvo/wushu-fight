import InnerBanner from "../components/InnerBanner";
import MasterDetails from "../components/MasterDetails";
import MoreMasters from "../components/MoreMasters";
import ScrollToTop from "../components/ScrollToTop";

export default function MasterDetailsPage() {
    return (
        <>
            <InnerBanner
                title="MASTER"
                subtitle="SINGLE"
                bgImage="/assets/images/bg/bg-12.png"
                activePage="Master Single"
            />
            <MasterDetails />
            <MoreMasters />
            <ScrollToTop />
        </>
    );
}
