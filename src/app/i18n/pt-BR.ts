import { MatDatepickerIntl } from "@angular/material/datepicker";

export function getPortugueseDatepickerIntl(): MatDatepickerIntl {
  const intl = new MatDatepickerIntl();
  intl.calendarLabel = 'Calendário';
  intl.closeCalendarLabel = 'Fechar calendário';
  intl.comparisonDateLabel = 'Período de comparação';
  intl.nextMonthLabel = 'Próximo mês';
  intl.nextMultiYearLabel = 'Próximos 24 anos';
  intl.nextYearLabel = 'Próximo ano';
  intl.openCalendarLabel = 'Abrir calendário';
  intl.prevMonthLabel = 'Mês anterior';
  intl.prevMultiYearLabel = '24 anos anteriores';
  intl.prevYearLabel = 'Ano anterior';
  intl.switchToMonthViewLabel = 'Escolher data';
  intl.switchToMultiYearViewLabel = 'Escolher mês e ano';
  return intl;
}
