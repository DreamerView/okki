/*jshint esversion: 6 */
import { useRouter } from "next/router";

const useTranslateText = () => {
    const router = useRouter();
    const {locale} = router;
    return locale;
};

export default useTranslateText;