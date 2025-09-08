import {redirect} from 'next/navigation';
import {headers} from 'next/headers';

// Evaluate per request to read Accept-Language
export const dynamic = 'force-dynamic';

export default function CustomerAgentPage() {
  const accept = headers().get('accept-language') || '';
  const isTr = /(^|,|;|\s)tr(\-|;|,|\s|$)/i.test(accept);
  redirect(isTr ? '/tr/customer-agent' : '/en/customer-agent');
}