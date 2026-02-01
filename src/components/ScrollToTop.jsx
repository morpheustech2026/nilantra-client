import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const action = useNavigationType(); // ഇത് വഴി നമുക്ക് മനസ്സിലാക്കാം User പുതിയ ലിങ്ക് ക്ലിക്ക് ചെയ്തതാണോ അതോ Back അടിച്ചതാണോ എന്ന്.

  useEffect(() => {
    // "POP" എന്ന് പറഞ്ഞാൽ Back ബട്ടൺ അമർത്തി എന്നാണ് അർത്ഥം.
    // Back അടിച്ചാൽ (POP) നമ്മൾ ഒന്നും ചെയ്യേണ്ട, ബ്രൗസർ തന്നെ പഴയ സ്ഥലത്ത് എത്തിക്കും.
    // അല്ലാതെ പുതിയ ലിങ്ക് വഴി വന്നതാണെങ്കിൽ (PUSH) മാത്രം മുകളിലേക്ക് സ്ക്രോൾ ചെയ്യിക്കുക.
    
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  return null;
}