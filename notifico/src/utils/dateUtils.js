import { format } from 'date-fns';
import { it } from 'date-fns/locale';

export function formatDate(date) {
    console.log('Recived date: ', date)
    return format(date, "dd/MM/yyyy", { locale: it });
}